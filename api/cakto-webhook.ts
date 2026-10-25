import { products } from './_products.js';
import { sendConfirmationEmail } from './_email.js';
import { sendFacebookCapiEvent } from './_fbCapi.js';

export default async function handler(req: any, res: any) {
  // Configuração de CORS para desenvolvimento local
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const payload = req.body;
    console.log('--- RECEBIDO WEBHOOK DA CAKTO ---');
    
    // Verificação de Segurança (Webhook Secret)
    const expectedSecret = process.env.CAKTO_WEBHOOK_SECRET;
    if (expectedSecret) {
      const providedSecret = 
        req.headers['x-cakto-signature'] || 
        req.headers['x-cakto-token'] || 
        req.headers['authorization'] || 
        payload.secret || 
        payload.token || 
        (payload.data && payload.data.secret);
        
      if (providedSecret !== expectedSecret) {
        console.error('Falha na autenticação do webhook. Chave secreta inválida.');
        return res.status(401).json({ error: 'Não autorizado' });
      }
      console.log('Autenticação do webhook validada com sucesso.');
    } else {
      console.warn('AVISO: CAKTO_WEBHOOK_SECRET não está configurada no servidor. Webhook vulnerável.');
    }

    console.log('Payload:', JSON.stringify(payload, null, 2));

    const data = payload.data || {};

    const eventType = payload.event || payload.event_type || data.event || data.event_type || payload.status || '';
    const status = payload.status || data.status || data.order?.status || '';

    // Verifica se a transação está aprovada ou paga
    const isApproved = 
      ['approved', 'paid', 'completed', 'paid_out', 'confirmed', 'purchase_approved'].includes(status.toLowerCase()) ||
      ['sale.approved', 'order.approved', 'order.paid', 'payment.success', 'approved', 'paid', 'purchase_approved'].includes(eventType.toLowerCase()) ||
      status.toLowerCase().includes('approv') ||
      status.toLowerCase().includes('paid') ||
      eventType.toLowerCase().includes('approv') ||
      eventType.toLowerCase().includes('paid');

    console.log(`Evento: "${eventType}" | Status: "${status}" | Aprovado: ${isApproved}`);

    if (!isApproved) {
      console.log('Transação não está aprovada/paga. Ignorando processamento.');
      return res.status(200).json({ success: true, message: 'Evento ignorado (não aprovado)' });
    }

    // Extração robusta de dados do comprador
    const email = 
      payload.buyer?.email || payload.customer?.email || payload.email || payload.payer?.email ||
      data.buyer?.email || data.customer?.email || data.email || data.payer?.email;
      
    const name = 
      payload.buyer?.name || payload.customer?.name || payload.name || payload.payer?.name ||
      data.buyer?.name || data.customer?.name || data.name || data.payer?.name || 'Cliente';
    
    // Extração robusta do slug ou identificador do produto
    const itemsArray = payload.items || data.items || [];
    const productSlug = 
      payload.product?.slug || payload.product?.id || payload.product_id || payload.items?.[0]?.id || payload.offer?.product_id ||
      data.product?.slug || data.product?.id || data.product_id || data.items?.[0]?.id || data.offer?.product_id;
      
    const orderId = 
      payload.id || payload.order_id || payload.reference ||
      data.id || data.order_id || data.reference || data.order?.id ||
      'cakto_' + Math.random().toString(36).substring(2, 10).toUpperCase();

    console.log(`Dados extraídos -> Comprador: "${name}" | Email: "${email}" | Produto/Slug principal: "${productSlug}" | Pedido: "${orderId}"`);

    if (!email) {
      console.error('E-mail do comprador ausente no payload do webhook.');
      return res.status(400).json({ error: 'E-mail do comprador não encontrado no payload' });
    }

    // Helper para identificar produto ou versão específica (licenseOptions) a partir de slug/id/nome/checkoutUrl
    const findProductOrOption = (sku?: string, rawName?: string, offerUrlOrCode?: string) => {
      const skuLower = (sku || '').toLowerCase().trim();
      const nameLower = (rawName || '').toLowerCase().trim();
      const offerLower = (offerUrlOrCode || '').toLowerCase().trim();

      // 1. Tenta casar primeiro com uma opção específica de versão (licenseOptions)
      for (const p of products as any[]) {
        if (Array.isArray(p.licenseOptions)) {
          // 1a. Match exato por downloadSlug ou código do link da Cakto
          for (const opt of p.licenseOptions) {
            const optSlug = (opt.downloadSlug || '').toLowerCase();
            const optCheckout = (opt.checkoutUrl || '').toLowerCase();
            const checkoutCode = optCheckout.split('/').pop() || '';

            if (
              (skuLower && optSlug && skuLower === optSlug) ||
              (skuLower && checkoutCode && skuLower === checkoutCode) ||
              (offerLower && checkoutCode && offerLower.includes(checkoutCode))
            ) {
              return {
                slug: opt.downloadSlug || p.slug,
                name: `${p.name} (${opt.label})`,
                price: opt.price ?? p.price,
              };
            }
          }

          // 1b. Match por nome contendo o nome base do produto + ano + plataforma
          const baseName = p.name.toLowerCase().replace('autodesk ', '').trim();
          if (nameLower && (nameLower.includes(baseName) || baseName.includes(nameLower))) {
            const wantsMac = nameLower.includes('mac') || skuLower.includes('mac');
            const matchedOpt = p.licenseOptions.find((opt: any) => {
              const optYear = String(opt.year || '').toLowerCase();
              const optPlat = String(opt.platform || '').toLowerCase();
              const isMacOpt = optPlat.includes('mac');
              return optYear && nameLower.includes(optYear) && isMacOpt === wantsMac;
            });
            if (matchedOpt) {
              return {
                slug: matchedOpt.downloadSlug || p.slug,
                name: `${p.name} (${matchedOpt.label})`,
                price: matchedOpt.price ?? p.price,
              };
            }
          }
        }
      }

      // 2. Match direto no produto principal
      const matched = (products as any[]).find((p: any) => {
        const pName = p.name.toLowerCase();
        const pCheckoutCode = ((p.checkoutUrl || '').toLowerCase().split('/').pop() || '');
        return (
          (skuLower && (p.slug.toLowerCase() === skuLower || p.id.toLowerCase() === skuLower)) ||
          (skuLower && pCheckoutCode && skuLower === pCheckoutCode) ||
          (offerLower && pCheckoutCode && offerLower.includes(pCheckoutCode)) ||
          (nameLower && (pName.includes(nameLower) || nameLower.includes(pName)))
        );
      });

      return matched || null;
    };

    const offerCode =
      payload.offer?.code ||
      payload.offer?.id ||
      payload.offer?.url ||
      payload.checkout_url ||
      data.offer?.code ||
      data.offer?.id ||
      data.offer?.url ||
      data.checkout_url ||
      '';

    // Match products in local DB
    const matchedProducts: any[] = [];
    if (itemsArray.length > 0) {
      for (const item of itemsArray) {
        const sku = item.slug || item.id || item.product_id || item.offer_id;
        const matched = findProductOrOption(sku, item.name || item.title, item.checkout_url || offerCode);
        if (matched) {
          matchedProducts.push(matched);
        }
      }
    }

    // Fallback if no items matched via array
    if (matchedProducts.length === 0) {
      const rawProductName =
        payload.product?.name ||
        data.product?.name ||
        payload.offer?.name ||
        data.offer?.name ||
        '';
      const matched = findProductOrOption(productSlug, rawProductName, offerCode);
      if (matched) {
        matchedProducts.push(matched);
      }
    }

    if (matchedProducts.length === 0) {
      console.error(`Nenhum produto correspondente a "${productSlug}" encontrado em nossa base de dados.`);
      return res.status(404).json({ error: `Nenhum produto encontrado para as chaves fornecidas.` });
    }

    console.log(`Produtos encontrados no webhook da Cakto: ${matchedProducts.map(p => p.name).join(', ')}`);

    const phone =
      payload.buyer?.phone || payload.customer?.phone || payload.phone || payload.payer?.phone ||
      data.buyer?.phone || data.customer?.phone || data.phone || data.payer?.phone;

    const totalAmount =
      Number(payload.amount || payload.total || data.amount || data.total || data.order?.amount) ||
      matchedProducts.reduce((acc, p) => acc + p.price, 0);

    // Dispara evento Purchase para a API de Conversões do Facebook (CAPI)
    await sendFacebookCapiEvent({
      eventName: 'Purchase',
      eventId: String(orderId),
      buyer: {
        name,
        email,
        phone,
      },
      customData: {
        value: totalAmount,
        currency: 'BRL',
        contentIds: matchedProducts.map(p => p.slug),
        contentName: matchedProducts.map(p => p.name).join(', '),
        numItems: matchedProducts.length,
        orderId: String(orderId),
      },
    });

    // Dispara o e-mail de entrega via Resend
    const emailRes = await sendConfirmationEmail({
      buyerName: name,
      buyerEmail: email,
      products: matchedProducts.map(p => ({
        slug: p.slug,
        name: p.name,
        price: p.price
      })),
      orderId: String(orderId),
      paymentMethod: 'credit_card'
    });

    if (emailRes.success) {
      console.log(`Entrega do(s) software(s) concluída com sucesso para o e-mail: ${email}`);
      return res.status(200).json({ success: true, message: 'Entrega enviada com sucesso' });
    } else {
      console.error('Falha ao disparar o e-mail de confirmação via Resend:', emailRes.error);
      return res.status(500).json({ error: 'Falha no envio do e-mail de entrega', details: emailRes.error });
    }
  } catch (error: any) {
    console.error('Erro geral ao processar o webhook da Cakto:', error);
    return res.status(500).json({ error: 'Erro interno no processamento', details: error.message || error });
  }
}
