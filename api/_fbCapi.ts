import crypto from 'crypto';

const FB_PIXEL_ID = process.env.FB_PIXEL_ID || '2173184286781548';
const FB_CAPI_TOKEN =
  process.env.FB_CAPI_TOKEN ||
  'EAAJ8K0WT690BS3ZARR7pVcuCZCuQknb7YMYyLA6B3ZCi0izmHqTPIQbkEFiw5GJHGZBQASJa7ZArZB04ZAxpXhaUllv6Jk86vr7UxerZCGXW0NRxZB42nWikr1ViCzDKCM6cd3ZCMu5tsiEfSVDIcgZBQGE0fX8ONuE7IfULJyxGwevZCCMQMlagcZAPSpe3CgZARhqLQFNQZDZD';

function hashData(value?: string): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

function hashPhone(phone?: string): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;
  // Ensure country code 55 if Brazilian 10 or 11 digit number
  if (digits.length === 10 || digits.length === 11) {
    digits = '55' + digits;
  }
  return crypto.createHash('sha256').update(digits).digest('hex');
}

export interface CapiEventInput {
  eventName: 'Purchase' | 'InitiateCheckout' | 'AddPaymentInfo';
  eventId?: string;
  eventSourceUrl?: string;
  buyer?: {
    name?: string;
    email?: string;
    phone?: string;
    clientIp?: string;
    userAgent?: string;
  };
  customData: {
    value: number;
    currency?: string;
    contentIds?: string[];
    contentName?: string;
    numItems?: number;
    orderId?: string;
  };
}

export async function sendFacebookCapiEvent(input: CapiEventInput): Promise<void> {
  if (!FB_CAPI_TOKEN || !FB_PIXEL_ID) {
    return;
  }

  try {
    const firstName = input.buyer?.name?.trim().split(/\s+/)[0];
    const lastNameParts = input.buyer?.name?.trim().split(/\s+/).slice(1);
    const lastName = lastNameParts && lastNameParts.length > 0 ? lastNameParts.join(' ') : undefined;

    const userData: Record<string, any> = {
      country: [hashData('br')],
    };

    const em = hashData(input.buyer?.email);
    if (em) userData.em = [em];

    const ph = hashPhone(input.buyer?.phone);
    if (ph) userData.ph = [ph];

    const fn = hashData(firstName);
    if (fn) userData.fn = [fn];

    const ln = hashData(lastName);
    if (ln) userData.ln = [ln];

    if (input.buyer?.clientIp) {
      userData.client_ip_address = input.buyer.clientIp;
    }
    if (input.buyer?.userAgent) {
      userData.client_user_agent = input.buyer.userAgent;
    }

    const eventPayload: Record<string, any> = {
      event_name: input.eventName,
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: input.eventSourceUrl || 'https://c2tech.shop',
      user_data: userData,
      custom_data: {
        currency: input.customData.currency || 'BRL',
        value: Number(input.customData.value.toFixed(2)),
        content_ids: input.customData.contentIds || [],
        content_type: 'product',
        content_name: input.customData.contentName,
        num_items: input.customData.numItems || 1,
        order_id: input.customData.orderId,
      },
    };

    if (input.eventId) {
      eventPayload.event_id = input.eventId;
    }

    const url = `https://graph.facebook.com/v20.0/${FB_PIXEL_ID}/events?access_token=${FB_CAPI_TOKEN}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [eventPayload],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Erro ao enviar evento para Facebook CAPI:', errText);
    } else {
      const resJson = await response.json();
      console.log(`Evento ${input.eventName} enviado com sucesso para Facebook CAPI:`, resJson);
    }
  } catch (err) {
    console.error('Exceção ao disparar Facebook CAPI:', err);
  }
}
