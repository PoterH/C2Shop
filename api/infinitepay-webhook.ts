import { confirmCardOrder } from './_infinitepay.js';
export default async function handler(req: any,res: any) {
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST')return res.status(405).json({success:false});
  try {const result=await confirmCardOrder(req.body);return res.status(!result.delivered ? 503 : 200).json(result);}
  catch {return res.status(503).json({success:false,error:'Não foi possível confirmar o pagamento. Tente novamente.'});}
}
