import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useText } from '../hooks/useText';
export function CardReturnPage() {
  const [params]=useSearchParams(); const {clearCart}=useCart(); const text=useText();
  const [paid,setPaid]=useState(false);const [delivered,setDelivered]=useState(false);const [error,setError]=useState(false); const [retry,setRetry]=useState(0);
  const cleared=useRef(false); const clearCartRef=useRef(clearCart);clearCartRef.current=clearCart;
  const order=params.get('order_nsu'); const transaction=params.get('transaction_nsu'); const slug=params.get('slug');
  useEffect(()=>{
    if(!order || !transaction || !slug){setError(true);return;}
    let active=true;let busy=false;let attempts=0;
    const check=async()=>{
      if(busy || attempts>=12)return;busy=true;attempts++;
      try {
        const response=await fetch('/api/infinitepay-status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({order_nsu:order,transaction_nsu:transaction,slug})});
        const data=await response.json();if(!response.ok || !data.success)throw new Error();
        if(!active)return;
        setError(false);setPaid(data.paid===true);setDelivered(data.delivered===true);
        if(data.paid && !cleared.current && sessionStorage.getItem('c2tech_card_order')===order){cleared.current=true;clearCartRef.current();sessionStorage.removeItem('c2tech_card_order');}
        if(data.delivered)attempts=12;
        else if(attempts>=12)setError(true);
      }catch{if(active)setError(true);}finally{busy=false;}
    };
    void check();const timer=setInterval(check,5000);return()=>{active=false;clearInterval(timer);};
  },[order,transaction,slug,retry]);
  return <section className="max-w-2xl mx-auto px-5 pt-36 pb-24 text-center space-y-5">
    {paid?<CheckCircle2 size={48} className="mx-auto text-emerald-600"/>:<Loader2 size={40} className="mx-auto text-action-primary animate-spin"/>}
    <h1 className="text-3xl font-bold">{text(paid?'Pagamento confirmado!':'Confirmando seu pagamento')}</h1>
    <p>{text(delivered?'Os arquivos de acesso foram enviados para seu e-mail.':paid?'Pagamento confirmado. Estamos preparando a entrega por e-mail.':'Aguarde enquanto verificamos a confirmação do pagamento. Não é necessário pagar novamente.')}</p>
    {error && <div role="alert" className="rounded-xl bg-amber-50 p-5 space-y-3"><p>{text('A confirmação ainda não está disponível. Tente novamente ou fale com nosso suporte.')}</p><button className="text-action-primary underline" onClick={()=>{setError(false);setRetry(v=>v+1);}}>{text('Verificar novamente')}</button></div>}
    <Link to="/contato" className="inline-block text-action-primary underline">{text('Fale com nosso suporte')}</Link>
    <Link to="/catalogo" className="block text-action-primary">{text('Continuar comprando')}</Link>
  </section>;
}
