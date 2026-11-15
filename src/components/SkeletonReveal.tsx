import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Route-aware `<Suspense>` fallback using `.t-skel` & `.t-skel-skeleton.is-pulsing`.
 * Only rendered while React is genuinely downloading a lazy route chunk over the network.
 * Once the route mounts, real DOM elements and images render directly at full opacity
 * without any wrapper or observer that could defer browser image loading.
 */
export const PageRouteSkeleton: React.FC = () => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isProductDetail = pathname.startsWith('/produto/');
  const isCatalog = pathname.startsWith('/catalogo');
  const isCheckoutOrCart = pathname.startsWith('/checkout') || pathname.startsWith('/carrinho');

  return (
    <div
      className="t-skel min-h-[70vh] w-full"
      data-state="loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Carregando conteúdo da página"
    >
      <div className="t-nav-loader-bar" data-active="true" aria-hidden="true">
        <div className="t-nav-loader-fill" data-stage="loading" />
      </div>

      <div className="t-skel-skeleton is-pulsing relative inset-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 xl:pt-12 pb-16">
        {isProductDetail ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-100">
              <span className="t-skel-bar h-3.5 w-64" />
              <span className="t-skel-bar h-5 w-48" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 flex flex-col items-center gap-4 pt-6">
                <span className="t-skel-box w-[240px] sm:w-[280px] h-[320px] sm:h-[380px] rounded-2xl" />
                <div className="flex gap-2.5 justify-center">
                  <span className="t-skel-box w-20 h-20 rounded-md" />
                  <span className="t-skel-box w-20 h-20 rounded-md" />
                  <span className="t-skel-box w-20 h-20 rounded-md" />
                  <span className="t-skel-box w-20 h-20 rounded-md" />
                </div>
              </div>
              <div className="lg:col-span-6 space-y-4 pt-2">
                <span className="t-skel-bar h-8 w-4/5" />
                <span className="t-skel-bar h-4 w-2/5" />
                <span className="t-skel-bar h-10 w-44 mt-2" />
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <span className="t-skel-box h-12 w-full rounded-xl" />
                  <span className="t-skel-box h-12 w-full rounded-xl" />
                </div>
                <span className="t-skel-box h-14 w-full rounded-xl mt-3" />
                <span className="t-skel-box h-24 w-full rounded-xl" />
              </div>
            </div>
          </div>
        ) : isCheckoutOrCart ? (
          <div className="max-w-6xl mx-auto space-y-6">
            <span className="t-skel-bar h-4 w-52" />
            <span className="t-skel-bar h-9 w-64" />
            <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
              <div className="border border-slate-200 rounded-xl p-6 space-y-5 bg-white">
                <span className="t-skel-bar h-6 w-48" />
                <div className="flex gap-4 items-center">
                  <span className="t-skel-box w-20 h-24 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2.5">
                    <span className="t-skel-bar h-5 w-3/4" />
                    <span className="t-skel-bar h-3.5 w-1/2" />
                    <span className="t-skel-bar h-4 w-1/3" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <span className="t-skel-box h-14 w-full rounded-xl" />
                  <span className="t-skel-box h-14 w-full rounded-xl" />
                </div>
              </div>
              <div className="border border-slate-200 rounded-xl p-6 space-y-4 bg-white">
                <span className="t-skel-bar h-6 w-40" />
                <span className="t-skel-bar h-4 w-full" />
                <span className="t-skel-bar h-7 w-full" />
                <span className="t-skel-box h-12 w-full rounded-lg" />
              </div>
            </div>
          </div>
        ) : isCatalog ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="t-skel-bar h-4 w-40" />
              <span className="t-skel-bar h-9 w-72" />
              <span className="t-skel-bar h-4 w-full max-w-2xl" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="border border-slate-100 rounded-card p-3.5 space-y-3 bg-white">
                  <span className="t-skel-box w-full h-[180px] sm:h-[210px] rounded-lg" />
                  <span className="t-skel-bar h-5 w-4/5" />
                  <span className="t-skel-bar h-3.5 w-3/5" />
                  <span className="t-skel-bar h-7 w-1/2" />
                  <span className="t-skel-box h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <span className="t-skel-box w-full h-[260px] sm:h-[320px] rounded-2xl" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="border border-slate-100 rounded-card p-3.5 space-y-3 bg-white">
                  <span className="t-skel-box w-full h-[180px] rounded-lg" />
                  <span className="t-skel-bar h-5 w-4/5" />
                  <span className="t-skel-bar h-3.5 w-3/5" />
                  <span className="t-skel-bar h-7 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Lightweight, non-blocking navigation indicator.
 * Never sets opacity:0 or filter:blur on page content or images, ensuring every image
 * and lazy-loaded asset renders natively without ever getting stuck blank.
 */
export const PageNavigationReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname, search } = useLocation();
  const barWrapRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const barWrap = barWrapRef.current;
    const barFill = barFillRef.current;
    if (!barWrap || !barFill) return;

    barWrap.setAttribute('data-active', 'true');
    barFill.setAttribute('data-stage', 'loading');

    const finishTimer = window.setTimeout(() => {
      barFill.setAttribute('data-stage', 'complete');
    }, 120);

    const hideTimer = window.setTimeout(() => {
      barWrap.setAttribute('data-active', 'false');
      barFill.setAttribute('data-stage', 'idle');
    }, 320);

    return () => {
      window.clearTimeout(finishTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pathname, search]);

  return (
    <>
      <div
        ref={barWrapRef}
        className="t-nav-loader-bar"
        data-active="false"
        aria-hidden="true"
      >
        <div ref={barFillRef} className="t-nav-loader-fill" data-stage="idle" />
      </div>
      {children}
    </>
  );
};
