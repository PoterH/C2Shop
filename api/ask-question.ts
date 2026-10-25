import { getResendApiKey, getResendFromEmail } from './_email.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, phone, productName, question } = req.body || {};

  if (!name || !email || !question) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  const apiKey = getResendApiKey();
  const fromEmail = getResendFromEmail();

  if (!apiKey) {
    return res.status(200).json({
      success: true,
      fallbackMailto: true,
      message: 'API Key não configurada localmente; usando mailto fallback.'
    });
  }

  try {
    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 20px auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px;">
        <h2 style="margin-top: 0; color: #0f172a;">Nova Pergunta no Site (C2Tech)</h2>
        <p style="font-size: 14px; color: #475569;">Um visitante enviou uma dúvida na página do produto <strong>${productName || 'Software'}</strong>:</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p style="margin: 4px 0; font-size: 14px;"><strong>Nome:</strong> ${name}</p>
          <p style="margin: 4px 0; font-size: 14px;"><strong>E-mail:</strong> ${email}</p>
          ${phone ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Telefone/WhatsApp:</strong> ${phone}</p>` : ''}
          <p style="margin: 4px 0; font-size: 14px;"><strong>Produto:</strong> ${productName || 'Geral'}</p>
        </div>
        <h3 style="font-size: 15px; color: #0f172a; margin-bottom: 8px;">Pergunta do Cliente:</h3>
        <div style="background: #f1f5f9; border-left: 4px solid #0284c7; padding: 14px; border-radius: 6px; font-size: 14px; color: #1e293b; white-space: pre-line;">${question}</div>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: ['c2tech2025@gmail.com'],
        reply_to: email,
        subject: `[Dúvida no Site] ${productName || 'Software'} - ${name}`,
        html: htmlContent
      })
    });

    if (!response.ok) {
      const errData = await response.text();
      console.error('Erro ao enviar pergunta via Resend:', errData);
      return res.status(500).json({ success: false, error: 'Erro ao enviar pergunta.' });
    }

    return res.status(200).json({ success: true, message: 'Pergunta enviada com sucesso!' });
  } catch (err: any) {
    console.error('Exceção ao enviar pergunta:', err);
    return res.status(500).json({ success: false, error: err.message || 'Erro interno' });
  }
}
