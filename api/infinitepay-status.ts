import { infinitePayReady, confirmCardOrder } from './_infinitepay.js';
export default async function handler(req: any,res: any) {
  res.setHeader('Cache-Control','no-store');
  if(req.method==='GET')return res.status(200).json({enabled:infinitePayReady()});
  if(req.method!=='POST')return res.status(405).json({success:false});
  try {return res.status(200).json(await confirmCardOrder(req.body));}
  catch {return res.status(503).json({success:false,error:'A confirmação ainda não está disponível. Tente novamente ou fale com nosso suporte.'});}
}
