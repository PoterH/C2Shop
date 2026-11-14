import { galleryImageSource } from '../data/galleryImages';
import { useText } from '../hooks/useText';
import React from 'react';
import { Link } from 'react-router-dom';
import { Info, Star } from 'lucide-react';
import type { Product } from '../data/products';
import { reviewsData } from '../data/reviews';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { AnimatedPrice } from './AnimatedPrice';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const localize = useText();
  const { language, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const productReviews = reviewsData[product.id] || [];
  const averageRating = productReviews.length > 0
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : "5.0";

  // Format price
  const formattedPrice = formatPrice(product.price);
  const formattedOriginalPrice = formatPrice(product.originalPrice);
  const formattedRecurrencePrice = product.recurrencePrice
    ? formatPrice(product.recurrencePrice)
    : undefined;


  return (
    <div className="product-card relative group bg-white rounded-card border border-slate-100 hover:border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full">
      <Link to={`/produto/${product.slug}`} className="flex flex-col flex-1 hover:no-underline text-inherit">
        {/* Product Image / Visual Area */}
        <div className="product-card-visual relative h-[210px] sm:h-[241px] bg-white rounded-t-card flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img
              src={galleryImageSource(product.imageUrl)}
              alt={product.name}
              className="motion-card-image absolute inset-0 w-full h-full p-3 object-contain"
              loading="lazy"
            />
          ) : (
            <>
              {/* Soft Decorative Gradient in Background */}
              <div className="motion-card-image absolute inset-0 bg-radial from-slate-100 to-slate-50"></div>

              {/* Mockup software card representation */}
              <div className="relative w-28 h-32 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700/50 flex flex-col justify-between p-3.5 transform group-hover:-translate-y-1.5 transition-transform duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-xl font-bold font-display tracking-tight text-white select-none">
                    C2
                  </span>
                  <span className="bg-white/10 text-white/90 text-xs font-bold px-1.5 py-0.5 rounded uppercase">
                    {localize(product.compatibility)}
                  </span>
                </div>

                <div className="my-2 flex flex-col">
                  <span className="text-xs font-semibold leading-tight line-clamp-2 text-slate-200">
                    {localize(product.name)}
                  </span>
                  <span className="text-xs text-action-primary font-medium mt-0.5">
                    v{localize(product.version.split(' ')[0])}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs text-white/60 font-semibold tracking-wider uppercase">
                    {localize("Vitalício")}</span>
                </div>
              </div>
            </>
          )}



          {/* Semi-transparent dark overlay for unavailable products */}
          {product.unavailable && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1.5px] z-10 flex items-center justify-center">
              <span className="bg-rose-600 text-white text-xs font-black px-4 py-2.5 rounded-xl uppercase tracking-wider shadow-lg border border-rose-500/30">
                {localize(t('temporarily_unavailable'))}
              </span>
            </div>
          )}
        </div>

        <div className="px-3.5 sm:px-5 pt-3 pb-4 flex-1 flex flex-col gap-2">
          {product.originalPrice > product.price && !product.recurrencePrice && (
            <span className="self-start rounded bg-feedback-success-strong px-2 py-1 text-xs font-semibold text-white">
              {localize(language === 'en' ? 'Save ' : language === 'es' ? 'Ahorra ' : 'Economize ')}{formatPrice(product.originalPrice - product.price)}
            </span>
          )}
          <h3 className="font-display font-semibold text-base sm:text-lg leading-snug text-slate-900 group-hover:text-action-primary transition-colors">
            {localize(product.name)}
          </h3>
          <div className="space-y-1 text-[10px] sm:text-xs leading-snug text-slate-600">
            <p className="line-clamp-1" title={product.compatibility}>
              <span className="font-semibold text-slate-700">
                {localize(language === 'en' ? 'Compatible with' : language === 'es' ? 'Compatible con' : 'Compatível com')}:
              </span>{' '}
              {localize(product.compatibility)}
            </p>
            <p className="line-clamp-1" title={product.version}>
              <span className="font-semibold text-slate-700">
                {localize(language === 'en' ? 'Version' : language === 'es' ? 'Versión' : 'Versão')}:
              </span>{' '}
              {localize(product.version)}
            </p>
          </div>
          {productReviews.length > 0 && (
            <div className="flex items-center gap-1 text-xs" aria-label={localize(averageRating + ' / 5')}>
              <div className="flex gap-0.5" aria-hidden="true">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className={`w-4 h-4 sm:w-5 sm:h-5 ${star <= Math.round(Number(averageRating)) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                ))}
              </div>
              <span className="text-slate-500">({productReviews.length})</span>
            </div>
          )}
          <div className="mt-auto pt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <AnimatedPrice
              value={product.recurrencePrice || product.price}
              formatted={product.recurrencePrice ? formattedRecurrencePrice! : formattedPrice}
              className="text-xl sm:text-2xl font-display font-extrabold text-action-primary tracking-tight"
            />
            {product.isSubscription && <span className="text-xs font-normal text-slate-600">{localize('/mês')}</span>}
            {product.originalPrice > product.price && !product.recurrencePrice && (
              <span className="text-xs sm:text-sm text-slate-500 line-through">{formattedOriginalPrice}</span>
            )}
            {product.isSubscription && <span className="w-full text-xs text-slate-600">{localize('Assinatura')}</span>}
          </div>
        </div>
      </Link>

      {/* CTA Buttons */}
      <div className="px-3 sm:px-5 pb-3 sm:pb-5 pt-0 mt-auto">
        {product.unavailable ? (
          <Link
            to={`/produto/${product.slug}`}
            className="t-learn flex items-center justify-center py-2.5 px-4 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors duration-200 w-full"
          >
            <Info className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
            {localize(language === 'en' ? 'View software details' : language === 'es' ? 'Ver detalles del software' : 'Ver detalhes do software')}
            <LearnMoreChevron />
          </Link>
        ) : (
          <Link
            to={`/produto/${product.slug}`}
            className="t-learn motion-press flex items-center justify-center w-full min-h-11 py-3 px-3 rounded-control bg-sky-50 hover:bg-sky-100 text-sm font-bold text-action-primary border-none text-center focus-visible:outline-2 focus-visible:outline-action-primary focus-visible:outline-offset-2"
            id={`view-details-${product.id}`}
          >
            {localize(language === 'en' ? 'View details' : language === 'es' ? 'Ver detalles' : 'Ver detalhes')}
            <LearnMoreChevron />
          </Link>
        )}
      </div>
    </div>
  );
};

const LearnMoreChevron: React.FC = () => (
  <span className="t-learn-chevron ml-1.5 inline-flex" aria-hidden="true">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);
