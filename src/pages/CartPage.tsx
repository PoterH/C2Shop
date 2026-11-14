import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useText } from '../hooks/useText';
import { CartLine } from '../components/CartLine';
import { cartItemKey } from '../utils/cart';
export function CartPage() {
  const {cartItems, subtotal, discountAmount, total, couponCode, applyCoupon, removeCoupon} = useCart();
  const {formatPrice} = useCurrency(); const text = useText();
  const [coupon, setCoupon] = useState(''); const [feedback,setFeedback] = useState('');
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 xl:pt-36 pb-20 min-h-[75vh]">
    <p className="text-sm text-slate-500 mb-3">{text('Carrinho')} <span className="px-2">/</span> {text('Identificação')} <span className="px-2">/</span> {text('Pagamento')}</p>
    <h1 className="text-3xl font-display font-bold text-slate-900 mb-8">{text('Seu carrinho')}</h1>
    {cartItems.length ? <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
      <section className="border border-slate-200 rounded-xl overflow-hidden"><div className="px-6 py-4 bg-slate-50 border-b border-slate-200 font-semibold">{text('Revise seus softwares')}</div><div className="px-5 sm:px-6 divide-y divide-slate-100">{cartItems.map(item => <CartLine item={item} key={cartItemKey(item)}/>)}</div></section>
      <aside className="border border-slate-200 rounded-xl p-6 space-y-5 bg-white"><h2 className="text-xl font-bold">{text('Resumo do pedido')}</h2><div className="flex justify-between text-sm"><span>{text('Subtotal')}</span><span>{formatPrice(subtotal)}</span></div>{discountAmount > 0 && <div className="flex justify-between text-sm text-feedback-success-strong"><span>OFF10 (10%)</span><span>−{formatPrice(discountAmount)}</span></div>}<div className="border-t border-slate-200 pt-4 flex justify-between text-xl font-bold"><span>{text('Total')}</span><span>{formatPrice(total)}</span></div>
      <form onSubmit={e => {e.preventDefault();setFeedback(applyCoupon(coupon).message);}} className="flex gap-2"><label className="flex border border-slate-200 rounded-lg items-center px-3 min-w-0"><Tag size={16} className="shrink-0 text-slate-400"/><input aria-label={text('Cupom de desconto')} value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder={text('Cupom')} className="w-full p-2 outline-none text-sm" /></label><button className="text-sm text-action-primary font-semibold">{text('Aplicar')}</button></form>{feedback && <p role="status" className="text-xs text-slate-600">{text(feedback)}</p>}{couponCode && <button className="text-xs text-red-600" onClick={()=>{removeCoupon();setFeedback('');}}>{text('Remover cupom')} {couponCode}</button>}
      <Link to="/checkout" className="specular-press flex justify-center items-center gap-2 bg-action-primary text-white py-3.5 rounded-lg font-bold">{text('Continuar para checkout')}<ArrowRight size={18}/></Link><p className="text-xs text-slate-500 leading-relaxed">{text('Entrega digital por e-mail após a confirmação do pagamento. Confira a versão e a plataforma antes de continuar.')}</p></aside>
    </div> : <div className="border border-slate-200 rounded-xl p-12 text-center"><ShoppingBag className="mx-auto text-slate-300 mb-4" size={40}/><p>{text('Seu carrinho está vazio.')}</p></div>}
    <Link to="/catalogo" className="inline-flex gap-2 items-center text-sm text-action-primary mt-8"><ArrowLeft size={16}/>{text('Continuar comprando')}</Link>
  </div>;
}
