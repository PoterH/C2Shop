import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CircleHelp, Copy, CreditCard, FileText, Globe, Loader2, Lock, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useLanguage } from '../context/LanguageContext';
import { useText } from '../hooks/useText';
import { CartLine } from '../components/CartLine';
import { cartItemKey, itemCount, itemTotal, paymentUrl, whatsappOrderUrl } from '../utils/cart';
import { isValidCPF, isValidCNPJ } from '../utils/documents';
import type { Product } from '../data/products';
import { trackEvent } from '../utils/pixel';
type Method = 'pix' | 'card' | 'boleto' | 'international';
type Pending = { method: 'pix' | 'boleto'; id: string; code: string; qr?: string; url?: string; expires: number; items: Product[]; buyer: {name: string; email: string; phone: string}; total: number };
const inputClass = 'w-full border border-slate-300 rounded-lg px-3.5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-action-primary/25 focus:border-action-primary bg-white';
const shakeInvalidField = (fieldId: string) => {
  requestAnimationFrame(() => {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.remove('is-shaking');
    void field.offsetWidth;
    field.classList.add('is-shaking');
    field.addEventListener('animationend', () => field.classList.remove('is-shaking'), { once: true });
    const focusTarget = field.matches('input,button,select,textarea') ? field : field.querySelector<HTMLElement>('input,button,select,textarea');
    focusTarget?.focus({ preventScroll: true });
  });
};
export function CheckoutPage() {
  const {cartItems, subtotal, total, discountAmount, couponCode, clearCart} = useCart();
  const brl = (value: number) => value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const {formatPrice} = useCurrency(); const {isInternational} = useLanguage(); const text = useText();
  const [cardEnabled,setCardEnabled] = useState(false);
  useEffect(()=>{let active=true;fetch('/api/infinitepay-status').then(r=>r.ok?r.json():null).then(data=>{if(active)setCardEnabled(data?.enabled===true);}).catch(()=>{});return()=>{active=false;};},[]);
  const [step,setStep] = useState(1); const [name,setName] = useState(''); const [email,setEmail] = useState(''); const [confirmEmail,setConfirmEmail] = useState(''); const [phone,setPhone] = useState(''); const [document,setDocument] = useState(''); const [terms,setTerms] = useState(false); const [help,setHelp] = useState(false);
  const [method,setMethod] = useState<Method>(isInternational ? 'international' : 'pix'); const [error,setError] = useState(''); const [loading,setLoading] = useState(false); const [copied,setCopied] = useState(false); const [paid,setPaid] = useState(false); const [emailStatus,setEmailStatus] = useState('');
  const [address,setAddress] = useState({zipCode:'',street:'',number:'',neighborhood:'',city:'',state:'',complement:''});
  const [pending,setPending] = useState<Pending | null>(()=>{try {return JSON.parse(sessionStorage.getItem('c2tech_pending_payment') || 'null');}catch{return null;}});
  const [now,setNow] = useState<number | null>(null); const sending = useRef(false); const submitting = useRef(false);
  const clearCartRef = useRef(clearCart);
  const items = pending?.items || cartItems;
  const hasRecurring = items.some(item=>item.isSubscription && !item.selectedLicenseOption && item.selectedSubOption !== 'avulso');
  const multipleSoftware = new Set(items.map(item=>item.id)).size >= 2;
  const externalNeedsHelp = items.length !== 1 || itemCount(items[0]) !== 1;
  const externalUrl = items.length === 1 ? paymentUrl(items[0], method === 'international') : undefined;
  const pixTotal = Math.round(total * (hasRecurring ? 1 : .98) * 100) / 100;
  useEffect(()=>{if(pending) sessionStorage.setItem('c2tech_pending_payment',JSON.stringify(pending));else sessionStorage.removeItem('c2tech_pending_payment');},[pending]);
  useEffect(()=>{clearCartRef.current=clearCart;},[clearCart]);
  useEffect(()=>{if(!pending || paid)return;const initial=window.setTimeout(()=>setNow(Date.now()),0);const timer=setInterval(()=>setNow(Date.now()),1000);return()=>{clearTimeout(initial);clearInterval(timer);};},[pending,paid]);
  useEffect(()=>{
    if(!pending || paid)return;
    let alive=true; let busy=false;
    const check=async()=>{
      if(busy || sending.current || pending.expires <= Date.now())return; busy=true;
      try {
        const response=await fetch(`/api/checkout-status?${pending.method === 'boleto' ? 'chargeId' : 'txid'}=${encodeURIComponent(pending.id)}`);
        const data=await response.json();
        if(alive && response.ok && data.success && data.status === 'CONCLUIDA') {
          sending.current=true;setPaid(true);
          try {
            const receipt=await fetch('/api/send-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({txid:pending.id, paymentMethod:pending.method, products:pending.items.map(item=>({slug:item.selectedLicenseOption?.downloadSlug || item.slug,name:`${item.name} — ${item.selectedLicenseOption?.label || item.version}`,price:itemTotal(item)})),buyer:pending.buyer})});
            const result=await receipt.json();
            setEmailStatus(receipt.ok && result.success ? 'Os arquivos de acesso foram enviados para seu e-mail.' : 'Pagamento confirmado. Estamos finalizando a entrega; se precisar, fale com nosso suporte.');
          }catch{setEmailStatus('Pagamento confirmado. Estamos finalizando a entrega; se precisar, fale com nosso suporte.');}
          trackEvent('Purchase',{value:pending.total,currency:'BRL',content_ids:pending.items.map(item=>item.slug)},pending.id);
          clearCartRef.current();sessionStorage.removeItem('c2tech_pending_payment');
        }
      }catch{ /* Keep the pending payment visible during temporary connection failures. */ }
      finally{busy=false;}
    };
    const timer=setInterval(check, pending.method === 'boleto' ? 15000 : 3000);void check();return()=>{alive=false;clearInterval(timer);};
  },[pending,paid]);
  const validate=():{message:string;field:string}|null=>{
    if(name.trim().split(/\s+/).length < 2)return {message:'Informe seu nome completo.',field:'buyer-name'};
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))return {message:'Informe um e-mail válido.',field:'buyer-email'};
    if(email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase())return {message:'Os e-mails não coincidem. Confira os dois campos.',field:'buyer-confirm-email'};
    const doc=document.replace(/\D/g,'');
    if(doc && !(isValidCPF(doc) || isValidCNPJ(doc)))return {message:'Confira o CPF/CNPJ ou deixe o campo em branco.',field:'buyer-document'};
    if(phone && phone.replace(/\D/g,'').length < 8)return {message:'Confira o WhatsApp ou deixe o campo em branco.',field:'buyer-phone'};
    if(!terms)return {message:'Aceite os termos e a política de privacidade para continuar.',field:'buyer-terms'};
    return null;
  };
  const createPayment=async()=>{
    if(submitting.current)return;
    const invalid=validate();if(invalid){setError(invalid.message);setStep(1);shakeInvalidField(invalid.field);return;}
    if(method === 'boleto') {
      if(phone && ![10,11].includes(phone.replace(/\D/g,'').length)){setError('Para boleto, informe um WhatsApp com DDD ou deixe o campo em branco.');shakeInvalidField('buyer-phone');return;}
      if(!(isValidCPF(document) || isValidCNPJ(document))){setError('Informe um CPF ou CNPJ válido para emitir o boleto.');shakeInvalidField('buyer-document-boleto');return;}
      if(!/^\d{8}$/.test(address.zipCode.replace(/\D/g,'')) || !address.street.trim() || !address.number.trim() || !address.neighborhood.trim() || !address.city.trim() || !/^[A-Z]{2}$/.test(address.state)){
        const fieldId = !/^\d{8}$/.test(address.zipCode.replace(/\D/g,'')) ? 'billing-zipCode' : !address.street.trim() ? 'billing-street' : !address.number.trim() ? 'billing-number' : !address.neighborhood.trim() ? 'billing-neighborhood' : !address.city.trim() ? 'billing-city' : 'billing-state';
        setError('Preencha o endereço de cobrança completo para emitir o boleto.');shakeInvalidField(fieldId);return;
      }
    }
    submitting.current=true;setLoading(true);setError('');
    try {
      const response=await fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({products:cartItems.map(item=>({slug:item.slug,licenseQuantity:item.selectedLicenseOption?.quantity,deviceCount:itemCount(item)})),coupon:couponCode || null,subOption:'avulso',buyer:{name:name.trim(),email:email.trim().toLowerCase(),cpf:document,phone:phone.trim()},paymentMethod:method === 'card' ? 'infinitepay' : method,billingAddress:method === 'boleto' ? address : undefined})});
      const data=await response.json();if(!response.ok || !data.success)throw new Error(data.error || 'Não foi possível gerar o pagamento. Tente novamente.');
      if(method === 'card') {
        const url=new URL(data.url);
        if(url.protocol!=='https:' || !(url.hostname==='infinitepay.io' || url.hostname.endsWith('.infinitepay.io')) || !data.orderId)throw new Error('Não foi possível abrir o pagamento. Tente novamente.');
        sessionStorage.setItem('c2tech_card_order',data.orderId);
        window.location.assign(url.href);return;
      }
      if(data.mock)throw new Error('O pagamento está em modo de testes. Entre em contato com o atendimento para concluir sua compra.');
      if(method === 'pix' && (!data.txid || !data.copyPaste))throw new Error('Não foi possível obter o código Pix. Tente novamente.');
      if(method === 'boleto' && (!data.chargeId || !data.ticketUrl || !data.barcode))throw new Error('Não foi possível obter o boleto. Tente novamente.');
      setPending({method:method as 'pix'|'boleto',id:String(data.txid || data.chargeId),code:data.copyPaste || data.barcode,qr:data.qrCodeBase64,url:data.ticketUrl,expires:method === 'pix' ? Date.now()+600000 : new Date(`${data.expireAt}T23:59:59-03:00`).getTime(),items:structuredClone(cartItems),buyer:{name:name.trim(),email:email.trim().toLowerCase(),phone:phone.trim()},total:data.total ?? (method === 'pix' ? pixTotal : total)});
      trackEvent('AddPaymentInfo',{value:method === 'pix' ? pixTotal : total,currency:'BRL',content_ids:cartItems.map(item=>item.slug)});
    }catch(error){setError(error instanceof Error ? error.message : 'Falha de conexão. Tente novamente.');}
    finally{submitting.current=false;setLoading(false);}
  };
  const copy=async()=>{try{await navigator.clipboard.writeText(pending?.code || '');setCopied(true);}catch{setError('Selecione o código e copie manualmente.');}};
  if(!items.length)return <div className="max-w-4xl mx-auto px-5 pt-36 xl:pt-40 pb-24"><h1 className="text-3xl font-bold mb-4">{text('Seu carrinho está vazio.')}</h1><Link className="text-action-primary" to="/catalogo">{text('Explorar softwares')}</Link></div>;
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 xl:pt-36 pb-16">
    <Link to="/carrinho" className="inline-flex items-center gap-2 text-sm text-action-primary mb-5"><ArrowLeft size={16}/>{text('Voltar ao carrinho')}</Link><h1 className="text-3xl font-display font-bold mb-7">{text('Finalizar compra')}</h1>
    <div className="grid lg:grid-cols-[1fr_350px] gap-8 items-start">
      <section className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 p-5 bg-slate-50 border-b border-slate-200"><span className="w-9 h-9 rounded-full bg-action-primary text-white flex items-center justify-center font-bold">{step===2 || pending ? <Check size={19}/> : 1}</span><h2 className="font-bold flex-1">{text('Seus dados')}</h2>{step===2 && !pending && <button onClick={()=>{setStep(1);setError('');}} className="text-action-primary text-sm">{text('Editar')}</button>}</div>
        {error && <p role="alert" className="m-5 p-4 rounded-lg bg-red-50 text-red-700 text-sm">{text(error)}</p>}
        {!pending && step===1 && <form noValidate className="p-5 sm:p-7 space-y-5" onSubmit={e=>{e.preventDefault();const invalid=validate();setError(invalid?.message || '');if(!invalid){setStep(2);trackEvent('InitiateCheckout',{value:total,currency:'BRL',content_ids:cartItems.map(item=>item.slug)});}else shakeInvalidField(invalid.field);}}>
          <p className="text-sm text-slate-500">{text('Compre sem criar uma conta. Os arquivos serão enviados ao e-mail informado.')}</p>
          <label className="block text-sm font-semibold">{text('Nome completo')} *<input id="buyer-name" autoComplete="name" required value={name} onChange={e=>setName(e.target.value)} className={`t-input ${inputClass} mt-2`} /></label>
          <div><div className="flex items-center gap-2 text-sm font-semibold"><label htmlFor="buyer-email">{text('E-mail')} *</label><span className="relative group"><button type="button" aria-label={text('Por que pedimos seu e-mail?')} aria-expanded={help} onClick={()=>setHelp(!help)} className="text-action-primary flex"><CircleHelp size={17}/></button><span role="tooltip" className={`${help ? 'block' : 'hidden group-hover:block group-focus-within:block'} absolute z-10 top-7 -left-20 w-64 rounded-lg bg-slate-900 text-white p-3 text-xs font-normal shadow-lg`}>{text('É neste e-mail que você receberá os arquivos, links de acesso e instruções após a confirmação do pagamento. Confira com atenção.')}</span></span></div><input id="buyer-email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} className={`t-input ${inputClass} mt-2`} /></div>
          <label className="block text-sm font-semibold">{text('Confirmar e-mail')} *<input id="buyer-confirm-email" type="email" autoComplete="off" required value={confirmEmail} onChange={e=>setConfirmEmail(e.target.value)} className={`t-input ${inputClass} mt-2`} /></label>
          <div className="grid sm:grid-cols-2 gap-5"><label className="block text-sm font-semibold">{text('CPF/CNPJ (opcional)')}<input id="buyer-document" inputMode="numeric" maxLength={18} value={document} onChange={e=>setDocument(e.target.value)} className={`t-input ${inputClass} mt-2`} /></label><label className="block text-sm font-semibold">{text('WhatsApp (opcional)')}<input id="buyer-phone" type="tel" autoComplete="tel" value={phone} onChange={e=>setPhone(e.target.value)} className={`t-input ${inputClass} mt-2`} /></label></div>
          <label className="flex gap-3 items-start text-sm text-slate-600"><input id="buyer-terms" type="checkbox" checked={terms} onChange={e=>setTerms(e.target.checked)} className="t-input mt-1 shrink-0"/><span>{text('Li e aceito os')} <Link to="/termos" target="_blank" className="underline text-action-primary">{text('termos de uso')}</Link> {text('e a')} <Link to="/privacidade" target="_blank" className="underline text-action-primary">{text('política de privacidade')}</Link>.</span></label>
          <button className="specular-press w-full bg-action-primary hover:bg-action-primary-hover text-white rounded-lg py-3.5 font-bold inline-flex items-center justify-center gap-2">{text('Continuar para pagamento')}<ArrowRight size={18}/></button>
        </form>}
        <div className="flex items-center gap-3 p-5 bg-slate-50 border-t border-slate-200"><span className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${step===2 || pending ? 'bg-action-primary text-white' : 'bg-slate-200 text-slate-500'}`}>2</span><h2 className="font-bold">{text('Pagamento')}</h2></div>
        {!pending && step===2 && <div className="p-5 sm:p-7 space-y-5">
          <p className="text-sm text-slate-500 break-all">{text('Entrega para')}: <strong className="text-slate-800">{email.trim()}</strong></p>
          <fieldset className="grid grid-cols-2 gap-3"><legend className="sr-only">{text('Forma de pagamento')}</legend>{([{id:'pix',title:'Pix',icon:QrCode},{id:'card',title:'Cartão',icon:CreditCard},{id:'boleto',title:'Boleto',icon:FileText},{id:'international',title:'Pagamento Internacional',icon:Globe}] as const).map(({id,title,icon:Icon})=><label key={id} className={`rounded-lg border p-4 cursor-pointer flex items-center gap-2 text-sm font-semibold ${method===id ? 'border-action-primary bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600'}`}><input type="radio" name="payment-method" value={id} checked={method===id} onChange={()=>{setMethod(id);setError('');}}/><Icon size={19}/>{text(title)}</label>)}</fieldset>
          {method==='pix' && <div className="space-y-4"><div className="rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900"><p className="font-bold">{text('Pix com confirmação automática')}</p><p className="mt-1">{text('Pague pelo QR Code ou código copia e cola. Os arquivos chegam por e-mail após a confirmação.')}</p><p className="inline-flex rounded-md bg-emerald-600 px-3 py-1.5 font-semibold text-white mt-3">{text('2% de desconto no Pix')}</p></div>{hasRecurring ? <p className="text-sm">{text('Para esta assinatura recorrente, selecione a opção cartão.')}</p> : <button disabled={loading} onClick={createPayment} className="specular-press w-full bg-emerald-600 hover:bg-feedback-success-strong text-white rounded-lg py-3.5 font-bold disabled:opacity-60 inline-flex items-center justify-center gap-2">{loading && <Loader2 size={18} className="animate-spin"/>}{text('Fazer pedido')}</button>}</div>}
          {method==='boleto' && <div className="space-y-4"><p className="text-sm text-slate-600">{text('Os arquivos são enviados após a compensação do boleto. CPF/CNPJ e endereço são necessários somente para esta forma de pagamento.')}</p><label className="block text-sm font-semibold">CPF/CNPJ *<input id="buyer-document-boleto" inputMode="numeric" maxLength={18} value={document} onChange={e=>setDocument(e.target.value)} className={`t-input ${inputClass} mt-2`}/></label><div className="grid sm:grid-cols-2 gap-4">{([{key:'zipCode',label:'CEP'},{key:'street',label:'Rua'},{key:'number',label:'Número'},{key:'neighborhood',label:'Bairro'},{key:'city',label:'Cidade'},{key:'state',label:'UF'},{key:'complement',label:'Complemento (opcional)'}] as const).map(({key,label})=><label key={key} className="block text-sm font-semibold">{text(label)}<input id={`billing-${key}`} value={address[key]} maxLength={key==='state'?2:100} onChange={e=>setAddress({...address,[key]:key==='state'?e.target.value.toUpperCase():e.target.value})} className={`t-input ${inputClass} mt-2`}/></label>)}</div><button disabled={loading} onClick={createPayment} className="specular-press w-full bg-action-primary text-white rounded-lg py-3.5 font-bold disabled:opacity-60 inline-flex justify-center items-center gap-2">{loading && <Loader2 size={18} className="animate-spin"/>}{text('Fazer pedido')}</button></div>}
          {method==='card' && cardEnabled && !hasRecurring && <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 space-y-4 text-sm"><h3 className="font-bold text-slate-900">{text('Cartão de crédito')}</h3><p className="text-slate-600">{text('Você será redirecionado para uma página externa segura para concluir o pagamento.')}</p><button disabled={loading} onClick={createPayment} className="specular-press w-full bg-action-primary text-white rounded-lg py-3.5 font-bold disabled:opacity-60 inline-flex items-center justify-center gap-2">{loading && <Loader2 size={18} className="animate-spin"/>}{text('Fazer pedido')}</button></div>}
          {(method==='international' || (method==='card' && (!cardEnabled || hasRecurring))) && <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 space-y-4 text-sm"><h3 className="font-bold text-slate-900">{text(externalNeedsHelp ? 'Finalize com nosso atendimento' : 'Pagamento seguro')}</h3><p className="text-slate-600">{text(externalNeedsHelp ? (multipleSoftware ? 'Para pagar vários softwares juntos no cartão ou pelo exterior, fale com nosso WhatsApp e receba 10% de desconto na compra de 2 softwares ou mais.' : 'Para esta quantidade ou combinação de versões, nosso atendimento prepara o pagamento correto pelo WhatsApp.') : 'Você será redirecionado para uma página externa segura para concluir o pagamento.')}</p>{externalNeedsHelp || !externalUrl ? <a target="_blank" rel="noopener noreferrer" href={whatsappOrderUrl(items,method==='international'?'pagamento internacional':'cartão')} className="specular-press flex justify-center bg-emerald-600 text-white rounded-lg py-3 font-bold">{text('Fazer pedido')}</a> : <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="specular-press flex justify-center bg-action-primary text-white rounded-lg py-3 font-bold">{text('Fazer pedido')}</a>}{discountAmount>0 && !externalNeedsHelp && <p className="text-xs">{text('Cupons da loja não são transferidos automaticamente para a página externa. Para usar o desconto, fale com nosso atendimento.')}</p>}</div>}
        </div>}
        {pending && <div className="p-5 sm:p-7 space-y-5 text-center">{paid ? <><Check className="mx-auto text-emerald-600" size={45}/><h3 className="text-2xl font-bold">{text('Pagamento confirmado!')}</h3><p className="text-sm text-slate-600">{text(emailStatus || 'Preparando a entrega por e-mail…')}</p></> : <><h3 className="text-xl font-bold">{text(pending.method==='pix'?'Aguardando pagamento Pix':'Boleto gerado')}</h3><p className="font-bold text-2xl text-action-primary">{brl(pending.total)}</p>{pending.method==='pix' && pending.qr && <img alt="QR Code Pix" src={pending.qr.startsWith('data:')?pending.qr:`data:image/png;base64,${pending.qr}`} className="w-52 h-52 mx-auto object-contain"/>}<p className="text-sm text-slate-500">{pending.method==='pix' ? (now === null ? null : pending.expires>now ? `${text('Expira em')} ${Math.floor((pending.expires-now)/60000)}:${String(Math.floor((pending.expires-now)/1000)%60).padStart(2,'0')}` : text('Pix expirado. Gere um novo pagamento.')) : text('A entrega será liberada após a compensação do boleto.')}</p>{pending.url && <a target="_blank" rel="noopener noreferrer" href={pending.url} className="block text-action-primary underline">{text('Abrir / imprimir boleto')}</a>}<textarea aria-label={text('Código de pagamento')} readOnly value={pending.code} className={`${inputClass} text-xs h-24`}/><button onClick={copy} className="bg-action-primary text-white rounded-lg px-6 py-3 inline-flex items-center gap-2"><Copy size={16}/>{text(copied?'Copiado!':'Copiar código')}</button><p className="text-xs text-slate-500 break-all">{text('Entrega para')}: {pending.buyer.email}</p><button className="block mx-auto text-sm text-slate-500 underline" onClick={()=>{setPending(null);setStep(1);setError('');}}>{text('Voltar ao checkout')}</button></>}</div>}
      </section>
      <aside className="border border-slate-200 rounded-xl p-5 bg-white"><div className="flex justify-between items-center"><h2 className="font-bold text-lg">{text('Seu pedido')}</h2>{!pending && <Link to="/carrinho" className="text-sm text-action-primary">{text('Editar')}</Link>}</div><div className="divide-y divide-slate-100">{items.map(item=><CartLine key={cartItemKey(item)} item={item} compact editable={false}/>)}</div><div className="border-t border-slate-200 pt-4 space-y-3">{!pending && <><div className="flex justify-between text-sm"><span>{text('Subtotal')}</span><span>{formatPrice(subtotal)}</span></div>{discountAmount>0 && <div className="flex justify-between text-sm text-feedback-success-strong"><span>OFF10 (10%)</span><span>−{formatPrice(discountAmount)}</span></div>}</>}{!pending && step === 2 && method === 'pix' && <div className="flex justify-between text-sm text-feedback-success-strong"><span>{text('Desconto Pix (2%)')}</span><span>−{brl(total-pixTotal)}</span></div>}<div className="flex justify-between font-bold text-xl"><span>{text('Total')}</span><span>{pending ? brl(pending.total) : (step === 2 && method === 'pix' ? brl(pixTotal) : formatPrice(total))}</span></div><p className="flex gap-2 text-xs text-slate-500 pt-3"><Lock size={15} className="shrink-0"/>{text('Seus dados são usados para processar o pedido e enviar o acesso.')}</p></div></aside>
    </div>
  </div>;
}
