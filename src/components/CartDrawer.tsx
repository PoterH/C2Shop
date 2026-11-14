import { Link, useLocation } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useText } from '../hooks/useText';
import { CartLine } from './CartLine';
import { cartItemKey } from '../utils/cart';
export function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, total } = useCart();
  const { formatPrice } = useCurrency();
  const text = useText();
  const { pathname } = useLocation();
  useEffect(() => { setIsCartOpen(false); }, [pathname]);
  useEffect(() => { if (!isCartOpen) return; const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsCartOpen(false); }; window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, [isCartOpen]);
  if (!isCartOpen || pathname === '/checkout' || pathname === '/carrinho') return null;
  return <aside aria-label={text('Seu carrinho')} className="cart-drawer fixed right-0 top-0 bottom-0 z-50 w-[min(390px,100vw)] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-cart-enter">
    <div className="p-5 border-b border-slate-200 flex items-center justify-between"><h2 className="text-xl font-bold flex items-center gap-2"><ShoppingBag size={21} />{text('Seu carrinho')}</h2><button onClick={() => setIsCartOpen(false)} aria-label={text('Fechar carrinho')} className="motion-press p-2 hover:bg-slate-100 rounded-lg focus-visible:outline-2 focus-visible:outline-action-primary focus-visible:outline-offset-2"><X size={20} /></button></div>
    <div className="flex-1 overflow-y-auto px-5 divide-y divide-slate-100">{cartItems.length ? cartItems.map(item => <CartLine item={item} compact key={cartItemKey(item)} />) : <p className="py-12 text-center text-slate-500">{text('Seu carrinho está vazio.')}</p>}</div>
    <div className="p-5 border-t border-slate-200 space-y-4"><div className="flex justify-between text-lg font-bold"><span>{text('Total')}</span><span>{formatPrice(total)}</span></div>{cartItems.length > 0 && <Link to="/carrinho" onClick={() => setIsCartOpen(false)} className="t-learn motion-press flex items-center justify-center gap-2 rounded-lg bg-action-primary hover:bg-action-primary-hover text-white py-3 font-bold focus-visible:outline-2 focus-visible:outline-action-primary focus-visible:outline-offset-2">{text('Ver carrinho')}<span className="t-learn-chevron inline-flex" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span></Link>}<button onClick={() => setIsCartOpen(false)} className="motion-feedback text-sm text-slate-500 hover:text-slate-700 w-full">{text('Continuar comprando')}</button></div>
  </aside>;
}
