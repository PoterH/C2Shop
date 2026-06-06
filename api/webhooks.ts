import crypto from 'crypto';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { sendConfirmationEmail } from './_email.js';
import { products } from './_products.js';

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-signature, x-request-id');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const xSignature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];

    if (!xSignature || !xRequestId) {
      console.warn('Webhook Mercado Pago recusado: Faltando cabeçalhos de segurança (x-signature ou x-request-id).');
      return res.status(400).json({ error: 'Missing security headers' });
    }

    // A assinatura tem o formato "ts=TIMESTAMP,v1=HASH"
    const tsMatch = xSignature.match(/ts=([^,]+)/);
    const v1Match = xSignature.match(/v1=([^,]+)/);

    const ts = tsMatch ? tsMatch[1] : '';
    const v1 = v1Match ? v1Match[1] : '';

    if (!ts || !v1) {
      return res.status(400).json({ error: 'Formato de x-signature inválido' });
    }

    // O id do evento geralmente vem em req.body.data.id ou req.query['data.id']
    const dataId = req.body?.data?.id || req.query?.['data.id'] || '';

    // Monta o "manifesto" id:requestId:ts (modelo mais recente de validação)
    const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    if (!secret) {
      console.error('Webhook Mercado Pago recusado: A variável MERCADOPAGO_WEBHOOK_SECRET não está configurada no backend.');
      return res.status(500).json({ error: 'Internal Server Error - Secret missing' });
    }

    // Cria o HMAC usando a secret com o algoritmo sha256
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(manifest);
    const signature = hmac.digest('hex');

    // Validação estrita
    if (signature !== v1) {
      console.error('Webhook Mercado Pago recusado: Assinatura inválida! Possível tentativa de fraude.');
      console.log('Manifest esperado:', manifest);
      return res.status(401).json({ error: 'Assinatura inválida. Acesso negado.' });
    }

    console.log(`Webhook Mercado Pago Validado com Sucesso! (Evento ID: ${dataId})`);
    console.log('Detalhes do evento:', req.body);

    const type = req.body?.type || req.query?.topic || req.body?.action || req.query?.type || '';
    
    if (type.includes('payment') || type === 'payment') {
      const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
      if (mpAccessToken) {
        const client = new MercadoPagoConfig({ accessToken: mpAccessToken });
        const paymentClient = new Payment(client);
        
        try {
          const paymentData = await paymentClient.get({ id: dataId });
          console.log('Dados do pagamento (Mercado Pago):', paymentData.status);
          
          if (paymentData.status === 'approved' || paymentData.status === 'authorized' || paymentData.status === 'accredited') {
            const payerEmail = paymentData.payer?.email || (paymentData.additional_info?.payer as any)?.email || '';
            const description = paymentData.description || '';
            const paymentMethod = paymentData.payment_type_id === 'ticket' ? 'boleto' : 'credit_card';
            
            // Tenta identificar o produto comprado
            let matchedProduct = products.find(p => description.includes(p.name) || (paymentData.additional_info?.items && paymentData.additional_info.items.some((i: any) => i.title === p.name || i.description === p.name)));
            
            if (payerEmail) {
              await sendConfirmationEmail({
                buyerName: paymentData.payer?.first_name || 'Cliente',
                buyerEmail: payerEmail,
                products: [{ 
                  slug: matchedProduct ? matchedProduct.slug : 'generic', 
                  name: matchedProduct ? matchedProduct.name : (description || 'Sua Compra'), 
                  price: Number(paymentData.transaction_amount) || (matchedProduct ? matchedProduct.price : 0) 
                }],
                orderId: String(dataId),
                paymentMethod: paymentMethod
              });
              console.log('E-mail de confirmação enviado via Webhook para:', payerEmail);
            } else {
               console.log('Não foi possível identificar o email do payer para envio de e-mail.');
            }
          }
        } catch (mpError) {
          console.error('Erro ao buscar detalhes do pagamento no Mercado Pago:', mpError);
        }
      }
    }

    // Responder com sucesso para que o Mercado Pago saiba que recebemos
    return res.status(200).json({ success: true, message: 'Webhook recebido e autenticado com sucesso.' });
  } catch (error: any) {
    console.error('Erro no processamento do Webhook Mercado Pago:', error);
    return res.status(500).json({ error: 'Erro interno no processamento' });
  }
}
