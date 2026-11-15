import { galleryImageSource } from '../data/galleryImages';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useText } from '../hooks/useText';
import { cartItemKey, itemCount, itemTotal, itemValidity, itemUnitPrice, itemVersion } from '../utils/cart';
export function CartLine({ item, compact = false, editable = true }: { item: Product; compact?: boolean; editable?: boolean }) {
  const { removeFromCart, updateQuantity, setIsCartOpen } = useCart();
  const { formatPrice } = useCurrency();
  const text = useText();
  const key = cartItemKey(item);
  return <article className={`flex gap-4 py-5 ${compact ? '' : 'sm:gap-6'}`}>
    <Link to={`/produto/${item.slug}`} onClick={() => setIsCartOpen(false)} className={`shrink-0 ${compact ? 'w-16' : 'w-20 sm:w-28'} flex items-start justify-center`}><img src={galleryImageSource(item.selectedLicenseOption?.imageUrl || item.imageUrl || '')} alt={item.name} className="w-full object-contain" /></Link>
    <div className="min-w-0 flex-1">
      <Link to={`/produto/${item.slug}`} onClick={() => setIsCartOpen(false)} className="font-bold text-action-primary leading-snug block">{text(item.name)}</Link>
      <dl className="text-xs text-slate-500 mt-2 space-y-1"><div>{text('Plataforma')}: {text(item.selectedLicenseOption?.platform || item.compatibility)}</div><div>{text('Versão')}: {text(itemVersion(item))}</div><div>{text(itemValidity(item))}</div></dl>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
        {editable ? <div className="inline-flex border border-slate-200 rounded-lg items-center"><button aria-label={text(`Diminuir quantidade de ${item.name}`)} disabled={itemCount(item) <= 1} onClick={() => updateQuantity(key, itemCount(item) - 1)} className="p-2 disabled:opacity-30"><Minus size={14} /></button><span className="px-3 text-sm" aria-label={text('Quantidade')}>{itemCount(item)}</span><button aria-label={text(`Aumentar quantidade de ${item.name}`)} disabled={itemCount(item) >= 99} onClick={() => updateQuantity(key, itemCount(item) + 1)} className="p-2 disabled:opacity-30"><Plus size={14} /></button></div> : <span className="text-xs text-slate-500">{text('Quantidade')}: {itemCount(item)}</span>}
        <div className="text-right"><strong className="text-slate-900 whitespace-nowrap">{formatPrice(itemTotal(item))}</strong>{!compact && <p className="text-xs text-slate-500 mt-1">{formatPrice(itemUnitPrice(item))} / {text('unidade')}</p>}</div>
        {editable && <button onClick={() => removeFromCart(key)} aria-label={text(`Remover ${item.name}`)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>}
      </div>
    </div>
  </article>;
}
