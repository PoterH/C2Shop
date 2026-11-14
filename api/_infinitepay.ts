import { randomUUID } from 'node:crypto';
import { sendConfirmationEmail } from './_email.js';

const API = 'https://api.checkout.infinitepay.io';
const PREFIX = 'c2tech:infinitepay:';
export const infinitePayReady = () => process.env.INFINITEPAY_ENABLED === 'true' && Boolean(process.env.INFINITEPAY_API_KEY && process.env.INFINITEPAY_REDIS_URL && process.env.INFINITEPAY_REDIS_TOKEN);
export type CardOrder = { id: string; amount: number; buyer: {name: string; email: string}; products: Array<{slug: string; name: string; price: number}>; created: number; transaction?: string; delivered?: boolean; deliveryStarted?: number };
async function redis(...command: (string | number)[]) {
  const response = await fetch(process.env.INFINITEPAY_REDIS_URL!, { method: 'POST', headers: {Authorization: 'Bearer ' + process.env.INFINITEPAY_REDIS_TOKEN, 'Content-Type':'application/json'}, body: JSON.stringify(command), signal: AbortSignal.timeout(10000) });
  const data = await response.json();
  if (!response.ok || data.error) throw new Error('Order storage unavailable');
  return data.result;
}
async function save(order: CardOrder) {
  await redis('SET', PREFIX + order.id, JSON.stringify(order), 'EX', 2592000);
}
async function provider(endpoint: string, body: unknown) {
  const response = await fetch(API + endpoint, {method:'POST', headers:{'Content-Type':'application/json','X-Api-Key':process.env.INFINITEPAY_API_KEY!}, body:JSON.stringify(body), signal:AbortSignal.timeout(15000)});
  const data = await response.json();
  if (!response.ok) throw new Error('InfinitePay request failed');
  return data;
}
export async function createCardOrder(input: Omit<CardOrder, 'id'|'created'>) {
  if (!infinitePayReady()) throw new Error('Card checkout not configured');
  const order: CardOrder = {...input, id:randomUUID(), created:Date.now()};
  if (!Number.isSafeInteger(order.amount) || order.amount < 100) throw new Error('Invalid amount');
  // Persist before requesting a link: callbacks must always resolve a real order.
  await save(order);
  const origin = 'https://c2tech.shop';
  const data = await provider('/links', {
    handle:'c2tech-servicos', order_nsu:order.id,
    items:order.products.map(p=>({quantity:1,price:Math.round(p.price*100),description:p.name.slice(0,240)})),
    customer:order.buyer,
    redirect_url:origin + '/pagamento-cartao',
    webhook_url:origin + '/api/infinitepay-webhook',
    options:{require_delivery_address:false,single_payment:true,valid_until:new Date(Date.now()+86400000).toISOString(),payment_methods_enabled:['credit_card']}
  });
  const url = new URL(data.url);
  if (url.protocol !== 'https:' || !(url.hostname === 'infinitepay.io' || url.hostname.endsWith('.infinitepay.io'))) throw new Error('Invalid checkout URL');
  return {success:true,url:url.href,orderId:order.id,total:order.amount/100};
}
export async function confirmCardOrder(input: any) {
  if (!infinitePayReady()) throw new Error('Card checkout not configured');
  const id = input.order_nsu;
  const transaction = input.transaction_nsu;
  const slug = input.invoice_slug || input.slug;
  if (typeof id !== 'string' || !/^[a-f0-9-]{36}$/.test(id) || typeof transaction !== 'string' || !transaction || transaction.length>160 || typeof slug !== 'string' || !slug || slug.length>160) throw new Error('Invalid payment reference');
  const raw = await redis('GET', PREFIX + id);
  if (!raw) throw new Error('Unknown order');
  const order: CardOrder = typeof raw === 'string' ? JSON.parse(raw) : raw;
  if (order.transaction && order.transaction !== transaction) throw new Error('Transaction mismatch');
  // Never trust browser redirects or webhook amounts/recipients.
  const payment = await provider('/payment_check', {handle:'c2tech-servicos',order_nsu:id,transaction_nsu:transaction,slug});
  if (!payment.success || !payment.paid) return {success:true,paid:false,delivered:false};
  if (payment.capture_method !== 'credit_card' || Number(payment.amount) !== order.amount) throw new Error('Payment mismatch');
  if (order.delivered) return {success:true,paid:true,delivered:true};
  const lockKey = PREFIX + id + ':lock';
  const lock = randomUUID();
  if (await redis('SET',lockKey,lock,'NX','EX',120) !== 'OK') return {success:true,paid:true,delivered:false};
  try {
    const latest = await redis('GET', PREFIX + id);
    const current: CardOrder = typeof latest === 'string' ? JSON.parse(latest) : latest;
    if (current.delivered) return {success:true,paid:true,delivered:true};
    // Resend deduplicates for 24h. Uncertain deliveries older than that need manual reconciliation.
    if (current.deliveryStarted && Date.now()-current.deliveryStarted>23*3600000) throw new Error('Delivery requires reconciliation');
    current.transaction=transaction;
    current.deliveryStarted ||= Date.now();
    await save(current);
    const sent = await sendConfirmationEmail({buyerName:current.buyer.name,buyerEmail:current.buyer.email,products:current.products,orderId:'infinitepay_'+id,paymentMethod:'credit_card'});
    if (!sent.success) throw new Error('Delivery pending');
    current.delivered=true;
    await save(current);
    return {success:true,paid:true,delivered:true};
  } finally {
    await redis('EVAL',"if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end",1,lockKey,lock);
  }
}
