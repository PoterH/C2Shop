import { getEfiChargesInstance } from './_efi.js';
import { deliverBoleto } from './_boleto.js';
export default async function handler(req: any, res: any) {
  if(req.method !== 'POST')return res.status(405).end();
  const notification = typeof req.body === 'string' ? new URLSearchParams(req.body).get('notification') : req.body?.notification;
  if(typeof notification !== 'string' || !/^[a-zA-Z0-9_-]{10,200}$/.test(notification))return res.status(400).json({error:'Notificação inválida'});
  try {
    const response = await getEfiChargesInstance().getNotification({token:notification});
    const ids = [...new Set((response.data || []).filter((event:any)=>['paid','settled'].includes(event.status?.current)).map((event:any)=>Number(event.identifiers?.charge_id)))];
    for(const id of ids){if(Number.isSafeInteger(id) && Number(id)>0)await deliverBoleto(Number(id));}
    return res.status(200).json({success:true});
  }catch{ return res.status(500).json({error:'Falha ao processar notificação Efí. Tente novamente.'}); }
}
