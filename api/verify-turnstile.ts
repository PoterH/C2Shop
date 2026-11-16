import type { VercelRequest, VercelResponse } from '@vercel/node';

const EXPECTED_HOSTNAMES = new Set(
  (process.env.TURNSTILE_HOSTNAMES || 'localhost,127.0.0.1,c2tech.shop')
    .split(',')
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean)
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { token, action } = req.body || {};

  if (!token || typeof token !== 'string' || token.length > 2048) {
    return res.status(400).json({ success: false, error: 'Token Turnstile ausente ou inválido' });
  }

  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) {
    // If running in development without a secret configured yet, warn and log
    console.warn('[Turnstile] TURNSTILE_SECRET não configurado nas variáveis de ambiente.');
    return res.status(500).json({
      success: false,
      error: 'Configuração do servidor pendente (TURNSTILE_SECRET não definido no .env)',
    });
  }

  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress;

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', token);
    if (clientIp) {
      formData.append('remoteip', clientIp);
    }

    const cfResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body: formData,
    });

    if (!cfResponse.ok) {
      throw new Error(`Cloudflare Siteverify HTTP ${cfResponse.status}`);
    }

    const result = (await cfResponse.json()) as {
      success: boolean;
      action?: string;
      hostname?: string;
      'error-codes'?: string[];
    };

    if (!result.success) {
      return res.status(403).json({
        success: false,
        error: 'Verificação anti-robô falhou. Por favor, tente novamente.',
        codes: result['error-codes'],
      });
    }

    // Verify action if provided
    if (action && result.action && result.action !== action) {
      return res.status(403).json({
        success: false,
        error: 'Ação do token inválida',
      });
    }

    // Verify hostname against allowed hostnames
    if (result.hostname && !EXPECTED_HOSTNAMES.has(result.hostname.toLowerCase())) {
      console.warn(`[Turnstile] Hostname mismatch: ${result.hostname}`);
      return res.status(403).json({
        success: false,
        error: 'Origem da verificação não autorizada',
      });
    }

    return res.status(200).json({ success: true, hostname: result.hostname });
  } catch (err: any) {
    console.error('[Turnstile] Erro na validação com a Cloudflare:', err);
    return res.status(502).json({
      success: false,
      error: 'Não foi possível contatar o serviço de verificação. Tente novamente.',
    });
  }
}
