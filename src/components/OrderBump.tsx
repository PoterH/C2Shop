import { useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useText } from '../hooks/useText';
import { galleryImageSource } from '../data/galleryImages';
import type { Product } from '../data/products';
import { cartItemKey } from '../utils/cart';
import {
  getOrderBumpOffers,
  orderBumpBasePrice,
  orderBumpOption,
  orderBumpPrice,
  ORDER_BUMP_DISCOUNT_PERCENT,
} from '../data/orderBumps';

// Inline, opt-in add-ons shown above the payment methods. Nothing pops over the checkout.
export function OrderBump() {
  const { cartItems, addOrderBump, removeFromCart } = useCart();
  const { formatPrice } = useCurrency();
  const text = useText();

  // Offers are picked from the products the buyer came for, and stay put while they tick them.
  const mainKey = cartItems.filter(item => !item.orderBump).map(cartItemKey).join('|');
  const offers = useMemo(() => getOrderBumpOffers(cartItems.filter(item => !item.orderBump)), [mainKey]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!offers.length) return null;

  const toggle = (offer: Product) => {
    const added = cartItems.find(item => item.id === offer.id && item.orderBump);
    if (added) removeFromCart(cartItemKey(added));
    else addOrderBump(offer, orderBumpOption(offer));
  };

  return (
    <section aria-labelledby="order-bump-title" className="rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/60 p-3.5 sm:p-4">
      <h3 id="order-bump-title" className="text-sm font-bold text-slate-900">
        {text(`Leve junto com ${ORDER_BUMP_DISCOUNT_PERCENT}% de desconto`)}
      </h3>
      <p className="text-xs text-slate-600 mt-0.5">{text('Desconto válido só neste pedido. Marque para adicionar.')}</p>
      <ul className="mt-3 space-y-2.5">
        {offers.map(offer => {
          const checked = cartItems.some(item => item.id === offer.id && item.orderBump);
          const base = orderBumpBasePrice(offer);
          const image = orderBumpOption(offer)?.imageUrl || offer.imageUrl || '';
          return (
            <li key={offer.id}>
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => toggle(offer)}
                className={`group w-full flex items-center gap-3 rounded-lg border bg-white p-2.5 text-left transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-px active:translate-y-0 ${
                  checked ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className="t-input t-check shrink-0 pointer-events-none" aria-checked={checked} aria-hidden="true">
                  <svg viewBox="0 0 10.1668 10.1668"><path d="M1 5.52L3.92 9.17L9.17 1" /></svg>
                </span>
                <span className="shrink-0 w-12 h-12 overflow-hidden rounded-md bg-slate-50 flex items-center justify-center">
                  <img src={galleryImageSource(image)} alt="" loading="lazy" decoding="async" className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.03]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-slate-900 leading-snug">{text(offer.name)}</span>
                  <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-xs text-slate-400 line-through">{formatPrice(base)}</span>
                    <span className="text-sm font-bold text-emerald-700">{formatPrice(orderBumpPrice(base))}</span>
                  </span>
                </span>
                <span className="shrink-0 rounded-md bg-emerald-600 px-1.5 py-0.5 text-xs font-bold text-white">−{ORDER_BUMP_DISCOUNT_PERCENT}%</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
