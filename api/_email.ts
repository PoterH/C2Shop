import fs from 'fs';
import path from 'path';
import { deliveryItems, extractionPassword, getDownloadLink, isActivationKey } from './_downloads.js';


export function getResendApiKey() {
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('RESEND_API_KEY=')) {
          const val = trimmed.substring('RESEND_API_KEY='.length);
          if (val) {
            const cleanVal = val.replace(/^['"]|['"]$/g, '').trim();
            if (cleanVal) return cleanVal;
          }
        }
      }
    }
  } catch (err) {
    console.error('Erro ao ler arquivo .env local:', err);
  }
  return process.env.RESEND_API_KEY || '';
}

export function getResendFromEmail() {
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const lines = envContent.split(/\r?\n/);
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('RESEND_FROM_EMAIL=')) {
          const val = trimmed.substring('RESEND_FROM_EMAIL='.length);
          if (val) {
            const cleanVal = val.replace(/^['"]|['"]$/g, '').trim();
            if (cleanVal) return cleanVal;
          }
        }
      }
    }
  } catch (err) {
    // ignorar
  }
  return process.env.RESEND_FROM_EMAIL || 'C2Tech <onboarding@resend.dev>';
}

export async function sendConfirmationEmail({
  buyerName,
  buyerEmail,
  productSlug,
  productName,
  productPrice,
  products: items,
  orderId,
  paymentMethod
}: {
  buyerName: string;
  buyerEmail: string;
  productSlug?: string;
  productName?: string;
  productPrice?: number;
  products?: Array<{ slug: string; name: string; price: number }>;
  orderId: string;
  paymentMethod: 'pix' | 'credit_card' | 'boleto';
}) {
  const apiKey = getResendApiKey();
  const fromEmail = getResendFromEmail();

  if (!apiKey) {
    console.error('Resend API key não configurada.');
    return { success: false, error: 'Chave API do Resend não configurada.' };
  }

  // Normalize products list for single product compatibility
  let checkoutProducts: Array<{ slug: string; name: string; price: number }> = [];
  if (items && Array.isArray(items)) {
    checkoutProducts = items;
  } else if (productSlug && productName && productPrice !== undefined) {
    checkoutProducts = [{ slug: productSlug, name: productName, price: productPrice }];
  }

  if (checkoutProducts.length === 0) {
    return { success: false, error: 'Nenhum produto fornecido para o e-mail de confirmação.' };
  }

  const paymentMethodLabel = paymentMethod === 'pix' ? 'Pix' : (paymentMethod === 'boleto' ? 'Boleto bancário' : 'Cartão de crédito');
  const totalPaid = checkoutProducts.reduce((sum, p) => sum + p.price, 0);
  const formattedTotalPrice = totalPaid.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const esc = (value: string) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
  const brl = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const firstName = esc((buyerName || '').trim().split(/\s+/)[0] || 'cliente');
  const orderDate = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: 'long', year: 'numeric' });
  const supportUrl = `https://wa.me/5581997349300?text=${encodeURIComponent(`Olá! Preciso de ajuda com o pedido ${orderId}.`)}`;
  const font = "font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;";

  // Order summary rows
  const productsTableRows = checkoutProducts.map(p => `
    <tr>
      <td style="${font} padding: 10px 0; font-size: 14px; color: #1e293b; border-bottom: 1px solid #eef2f7;">${esc(p.name)}</td>
      <td align="right" style="${font} padding: 10px 0; font-size: 14px; color: #1e293b; border-bottom: 1px solid #eef2f7; white-space: nowrap;">${brl(p.price)}</td>
    </tr>`).join('');

  // One card per product with its download or activation button
  // A combo delivers one card for each product it contains.
  const deliveries = checkoutProducts.flatMap(p => deliveryItems(p.slug, p.name));
  const downloadButtonsSection = deliveries.map(p => {
    const downloadUrl = getDownloadLink(p.slug);
    const isWhatsApp = downloadUrl.includes('wa.me');
    const isKey = isActivationKey(p.slug);
    const buttonText = isKey ? 'Pedir a chave no WhatsApp' : isWhatsApp ? 'Ativar pelo WhatsApp' : 'Baixar no Google Drive &rarr;';
    const buttonBg = isWhatsApp ? '#16a34a' : '#0066ff';
    const tag = isKey ? 'Chave de 25 dígitos' : isWhatsApp ? 'Ativação da conta' : 'Pronto para download';
    const tagColor = isWhatsApp ? '#15803d' : '#0052cc';
    const tagBg = isWhatsApp ? '#dcfce7' : '#e8f0ff';
    return `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 12px 0; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <tr>
          <td style="padding: 18px 20px;">
            <span style="${font} display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.4px; text-transform: uppercase; color: ${tagColor}; background-color: ${tagBg}; border-radius: 999px; padding: 4px 10px;">${tag}</span>
            <p style="${font} margin: 10px 0 14px 0; font-size: 16px; font-weight: 700; color: #0f172a; line-height: 1.35;">${esc(p.name)}</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="${buttonBg}" style="border-radius: 10px;">
              <a href="${downloadUrl}" target="_blank" style="${font} display: inline-block; padding: 13px 24px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 10px;">${buttonText}</a>
            </td></tr></table>
          </td>
        </tr>
      </table>`;
  }).join('');

  // Shown whenever the order has a file download (account activations via WhatsApp have no files).
  const fileDeliveries = deliveries.filter(p => !getDownloadLink(p.slug).includes('wa.me'));
  const hasFileDownload = fileDeliveries.length > 0;
  // Office for Windows uses its own password, so a mixed order lists the password of each product.
  const passwords = [...new Set(fileDeliveries.map(p => extractionPassword(p.slug)))];
  const passwordBox = (password: string) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color: #ffffff; border: 2px dashed #f59e0b; border-radius: 10px; padding: 10px 20px;">
              <span style="font-family: Consolas, 'SF Mono', 'Courier New', monospace; font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: 0.5px;">${password}</span>
            </td></tr></table>`;
  const passwordContent = passwords.length === 1
    ? `<p style="${font} margin: 0 0 12px 0; font-size: 13px; color: #78350f; line-height: 1.5;">Use esta senha ao descompactar os arquivos baixados:</p>
            ${passwordBox(passwords[0])}`
    : fileDeliveries.map(p => `<p style="${font} margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #78350f; line-height: 1.4;">${esc(p.name)}</p>
            <div style="margin: 0 0 14px 0;">${passwordBox(extractionPassword(p.slug))}</div>`).join("");
  const extractionPasswordSection = hasFileDownload ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 8px 0 0 0; background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 12px;">
        <tr>
          <td style="padding: 18px 20px;">
            <p style="${font} margin: 0 0 4px 0; font-size: 12px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #92400e;">&#128273; ${passwords.length === 1 ? "Senha para extrair os arquivos" : "Senhas para extrair os arquivos"}</p>
            ${passwordContent}
            <p style="${font} margin: 12px 0 0 0; font-size: 12px; color: #92400e; line-height: 1.5;">Digite exatamente como está: com o <strong>@</strong> no início e tudo em letras minúsculas.</p>
          </td>
        </tr>
      </table>` : '';

  const hasSubscription = checkoutProducts.some(p => p.slug === 'capcut-pro-mensal' || p.slug === 'canva-pro-mensal' || p.slug === 'autodesk-all-apps');
  const emailIntroText = hasSubscription
    ? 'Seu pagamento foi confirmado. Abaixo estão as instruções e os links para ativar sua assinatura e acessar os recursos de cada produto.'
    : 'Seu pagamento foi confirmado. Abaixo estão os links seguros do Google Drive com os arquivos de instalação e o tutorial em vídeo de cada produto.';

  const steps = hasFileDownload
    ? [
        ['Baixe os arquivos', 'Clique em <strong>Baixar no Google Drive</strong> e baixe a pasta do seu software.'],
        ['Extraia com a senha', passwords.length === 1
          ? `Descompacte os arquivos usando a senha <strong style="color: #0f172a;">${passwords[0]}</strong>.`
          : 'Descompacte os arquivos de cada produto usando a senha indicada abaixo.'],
        ['Siga o vídeo e ative', 'Assista ao tutorial incluído na pasta e siga o passo a passo para instalar e ativar.'],
      ]
    : [
        ['Abra o link', 'Clique no botão do seu produto para receber as instruções de acesso.'],
        ['Siga as orientações', 'Nossa equipe envia o passo a passo para ativar a sua conta.'],
        ['Comece a usar', 'Pronto! Seu acesso fica liberado conforme o plano escolhido.'],
      ];
  const stepsRows = steps.map(([title, text], i) => `
    <tr>
      <td width="40" valign="top" style="padding: 0 0 16px 0;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="28" height="28" align="center" bgcolor="#0a0f1d" style="${font} border-radius: 999px; font-size: 13px; font-weight: 700; color: #ffffff; line-height: 28px;">${i + 1}</td></tr></table>
      </td>
      <td valign="top" style="padding: 2px 0 16px 0;">
        <p style="${font} margin: 0 0 2px 0; font-size: 14px; font-weight: 700; color: #0f172a;">${title}</p>
        <p style="${font} margin: 0; font-size: 13px; color: #475569; line-height: 1.55;">${text}</p>
      </td>
    </tr>`).join('');

  const sectionTitle = (text: string) => `<p style="${font} margin: 0 0 14px 0; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #64748b;">${text}</p>`;

  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Seu pedido C2Tech está pronto</title>
  <style>
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .px { padding-left: 20px !important; padding-right: 20px !important; }
      .hero-title { font-size: 22px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #eef2f7;">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; color: #eef2f7;">Pagamento confirmado! Seus links de download e a senha dos arquivos estão aqui.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#eef2f7">
    <tr>
      <td align="center" style="padding: 32px 12px;">
        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; max-width: 600px;">

          <!-- Brand -->
          <tr>
            <td class="px" style="padding: 0 8px 18px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td valign="middle">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td valign="middle"><img src="https://c2tech.shop/images/logo.png" width="36" height="36" alt="C2Tech" style="display: block; border-radius: 9px; border: 0;"></td>
                    <td valign="middle" style="padding-left: 10px;">
                      <p style="${font} margin: 0; font-size: 17px; font-weight: 800; color: #0f172a; line-height: 1.1;">C2Tech</p>
                      <p style="${font} margin: 0; font-size: 11px; color: #64748b;">Licenças Digitais</p>
                    </td>
                  </tr></table>
                </td>
                <td align="right" valign="middle" style="${font} font-size: 12px; color: #64748b;">${orderDate}</td>
              </tr></table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 18px; border: 1px solid #e2e8f0; overflow: hidden;">

              <!-- Hero -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="px" bgcolor="#0052cc" style="background-color: #0052cc; background-image: linear-gradient(135deg, #1f7bff 0%, #0047b3 100%); border-radius: 18px 18px 0 0; padding: 34px 36px 30px 36px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                      <td style="${font} background-color: rgba(255,255,255,0.16); border-radius: 999px; padding: 6px 12px; font-size: 12px; font-weight: 700; color: #ffffff;">&#10003;&nbsp; Pagamento confirmado</td>
                    </tr></table>
                    <h1 class="hero-title" style="${font} margin: 16px 0 8px 0; font-size: 26px; line-height: 1.25; font-weight: 800; color: #ffffff;">Olá, ${firstName}! Seu pedido está pronto.</h1>
                    <p style="${font} margin: 0; font-size: 15px; line-height: 1.6; color: #dbe7ff;">${emailIntroText}</p>
                  </td>
                </tr>
              </table>

              <!-- Downloads -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="px" style="padding: 30px 36px 6px 36px;">
                    ${sectionTitle(hasSubscription && !hasFileDownload ? 'Seu acesso' : 'Seus downloads')}
                    ${downloadButtonsSection}
                    ${extractionPasswordSection}
                  </td>
                </tr>

                <!-- Steps -->
                <tr>
                  <td class="px" style="padding: 26px 36px 4px 36px;">
                    ${sectionTitle('Como instalar em 3 passos')}
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${stepsRows}</table>
                  </td>
                </tr>

                <!-- Order summary -->
                <tr>
                  <td class="px" style="padding: 8px 36px 6px 36px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 12px;">
                      <tr><td style="padding: 18px 20px 14px 20px;">
                        ${sectionTitle('Resumo do pedido')}
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                          ${productsTableRows}
                          <tr>
                            <td style="${font} padding: 14px 0 4px 0; font-size: 15px; font-weight: 800; color: #0f172a;">Total pago</td>
                            <td align="right" style="${font} padding: 14px 0 4px 0; font-size: 18px; font-weight: 800; color: #0052cc; white-space: nowrap;">${formattedTotalPrice}</td>
                          </tr>
                          <tr>
                            <td style="${font} padding: 6px 0 0 0; font-size: 12px; color: #64748b;">Pagamento</td>
                            <td align="right" style="${font} padding: 6px 0 0 0; font-size: 12px; color: #334155;">${paymentMethodLabel}</td>
                          </tr>
                          <tr>
                            <td style="${font} padding: 4px 0 0 0; font-size: 12px; color: #64748b;">Pedido</td>
                            <td align="right" style="padding: 4px 0 0 0; font-family: Consolas, 'Courier New', monospace; font-size: 12px; color: #334155;">${esc(orderId)}</td>
                          </tr>
                        </table>
                      </td></tr>
                    </table>
                  </td>
                </tr>

                <!-- Support -->
                <tr>
                  <td class="px" style="padding: 22px 36px 34px 36px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e2e8f0; border-radius: 12px;">
                      <tr>
                        <td style="padding: 18px 20px;">
                          <p style="${font} margin: 0 0 4px 0; font-size: 15px; font-weight: 700; color: #0f172a;">Precisa de ajuda na instalação?</p>
                          <p style="${font} margin: 0 0 14px 0; font-size: 13px; color: #475569; line-height: 1.55;">Você tem 30 dias de suporte técnico pelo WhatsApp, de segunda a domingo, das 09:00 às 20:00.</p>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#16a34a" style="border-radius: 10px;">
                            <a href="${supportUrl}" target="_blank" style="${font} display: inline-block; padding: 11px 20px; font-size: 13px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 10px;">Falar com o suporte</a>
                          </td></tr></table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" class="px" style="padding: 22px 16px 0 16px;">
              <p style="${font} margin: 0 0 6px 0; font-size: 12px; color: #64748b;">Você recebeu este e-mail porque fez uma compra na <a href="https://c2tech.shop" target="_blank" style="color: #0052cc; text-decoration: none; font-weight: 600;">C2Tech</a>.</p>
              <p style="${font} margin: 0; font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} C2Tech &middot; Licenças Digitais</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Determine email subject name
  const subjectLabel = checkoutProducts.length === 1 ? checkoutProducts[0].name : `${checkoutProducts.length} Softwares`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        ...((paymentMethod === 'boleto' || orderId.startsWith('infinitepay_')) ? { 'Idempotency-Key': `delivery-${orderId}` } : {}),
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: buyerEmail,
        subject: `Seu acesso a ${subjectLabel} está liberado! 🚀`,
        html: htmlContent
      })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Erro desconhecido ao enviar e-mail via Resend API.');
    }

    console.log(`E-mail enviado com sucesso via Resend para ${buyerEmail}. ID:`, result.id);
    return { success: true, id: result.id };
  } catch (error: any) {
    console.error('Falha ao enviar e-mail via Resend:', error);
    return { success: false, error: error.message || error };
  }
}
