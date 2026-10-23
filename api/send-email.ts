import { products } from './_products.js';
import { getEfiInstance, isMockMode } from './_efi.js';
import { sendConfirmationEmail } from './_email.js';
import { sendFacebookCapiEvent } from './_fbCapi.js';

export default async function handler(req: any, res: any) {
  // Configuração de CORS para desenvolvimento local e chamadas de produção
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { txid, productSlug, products: items, buyer, subOption } = req.body;

  if (!txid || (!productSlug && (!items || !Array.isArray(items))) || !buyer || !buyer.email || !buyer.name) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios ausentes' });
  }

  // Backwards compatibility for single productSlug and array of products
  let emailItems: Array<{ slug: string }> = [];
  if (items && Array.isArray(items)) {
    emailItems = items;
  } else if (productSlug) {
    emailItems = [{ slug: productSlug }];
  }

  // Find all matched products
  const matchedProducts: any[] = [];
  for (const item of emailItems) {
    const matched = products.find((p: any) => p.slug === item.slug);
    if (!matched) {
      return res.status(404).json({ error: `Produto não encontrado: ${item.slug}` });
    }
    matchedProducts.push(matched);
  }

  // Validação de segurança: verifica no Efí Bank se a transação do Pix realmente foi paga (CONCLUIDA)
  const isMock = isMockMode() || txid.startsWith('mock_');
  if (!isMock) {
    try {
      const efi = getEfiInstance();
      if (!efi) {
        throw new Error('Instância Efí não inicializada');
      }

      const response = await efi.pixDetailCharge({ txid });
      if (response.status !== 'CONCLUIDA') {
        return res.status(400).json({ 
          success: false, 
          error: 'Transação do Pix não concluída ou pendente de pagamento.',
          status: response.status 
        });
      }
    } catch (err: any) {
      console.error('Erro ao verificar status do Pix no Efí Bank:', err);
      return res.status(500).json({ 
        error: 'Erro de comunicação ao verificar status de pagamento com o Efí Bank.', 
        details: err.message || err 
      });
    }
  }

  // Dispara o envio do e-mail via Resend e evento Purchase na CAPI do Facebook
  try {
    const processedProducts = matchedProducts.map((p, idx) => {
      const itemOverridePrice = items?.[idx]?.price;
      let finalPrice = itemOverridePrice || p.price;
      if (p.isSubscription && !itemOverridePrice) {
        finalPrice = subOption === 'recurrent' ? (p.recurrencePrice || p.price) : p.price;
      } else if (!p.isSubscription) {
        finalPrice = finalPrice * 0.98; // Aplica desconto do Pix (2%) para exibir o valor correto do recibo
      }
      return {
        slug: p.slug,
        name: p.name,
        price: finalPrice
      };
    });

    const totalValue = processedProducts.reduce((acc, item) => acc + item.price, 0);
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket?.remoteAddress;
    const userAgent = req.headers['user-agent'];

    // Dispara evento Purchase via API de Conversões (deduplicado com navegador via eventId = txid)
    await sendFacebookCapiEvent({
      eventName: 'Purchase',
      eventId: String(txid),
      buyer: {
        name: buyer.name,
        email: buyer.email,
        phone: buyer.phone,
        clientIp,
        userAgent,
      },
      customData: {
        value: totalValue,
        currency: 'BRL',
        contentIds: processedProducts.map(p => p.slug),
        contentName: processedProducts.map(p => p.name).join(', '),
        numItems: processedProducts.length,
        orderId: String(txid),
      },
    });

    const emailResult = await sendConfirmationEmail({
      buyerName: buyer.name,
      buyerEmail: buyer.email,
      products: processedProducts,
      orderId: txid,
      paymentMethod: 'pix'
    });

    if (!emailResult.success) {
      return res.status(500).json({ success: false, error: emailResult.error });
    }

    return res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!' });
  } catch (err: any) {
    console.error('Erro interno ao disparar e-mail de confirmação:', err);
    return res.status(500).json({ error: 'Erro interno ao disparar e-mail', details: err.message || err });
  }
}
