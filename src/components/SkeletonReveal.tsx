import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  wrapperClassName?: string;
  skeletonClassName?: string;
  contentClassName?: string;
  skeletonChildren?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Real-loading Skeleton Loader & Reveal wrapper (transitions.dev `skeleton-loader-and-reveal`).
 * - Never delays rendering: if the image is already in browser cache (`node.complete`),
 *   it marks `.is-revealed` immediately on attach.
 * - While the image is genuinely downloading over the network, `.t-skel-skeleton.is-pulsing`
 *   occupies the exact visual slot and cross-fades + un-blurs (`--reveal-dur: 400ms`,
 *   `--reveal-blur: 2px`) the instant `onLoad` fires.
 */
export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  skeletonClassName = '',
  contentClassName = '',
  skeletonChildren,
  children,
  onLoad,
  onError,
  ...rest
}) => {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isRevealed = Boolean(src) && loadedSrc === src;

  const handleImgRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (node && node.complete && node.naturalWidth > 0 && loadedSrc !== src) {
        setLoadedSrc(src);
      }
    },
    [loadedSrc, src]
  );

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setLoadedSrc(src);
      onLoad?.(e);
    },
    [onLoad, src]
  );

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setLoadedSrc(src);
      onError?.(e);
    },
    [onError, src]
  );

  return (
    <div
      className={`t-skel ${isRevealed ? 'is-revealed' : ''} ${wrapperClassName}`.trim()}
      data-state={isRevealed ? 'revealed' : 'loading'}
    >
      <div
        className={`t-skel-skeleton ${isRevealed ? '' : 'is-pulsing'} ${skeletonClassName}`.trim()}
        aria-hidden="true"
      >
        {skeletonChildren ?? (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-2.5 bg-slate-50/90">
            <span className="t-skel-box w-3/5 h-3/5 max-w-[140px] max-h-[160px] rounded-xl" />
            <span className="t-skel-bar w-2/5 h-2.5 rounded-md" />
          </div>
        )}
      </div>
      <div className={`t-skel-content ${contentClassName}`.trim()}>
        <img
          ref={handleImgRef}
          src={src}
          alt={alt}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          {...rest}
        />
        {children}
      </div>
    </div>
  );
};

/**
 * Route-aware `<Suspense>` fallback using `.t-skel` & `.t-skel-skeleton.is-pulsing`.
 * Only rendered while React is genuinely downloading a lazy route chunk over the network.
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
 * Site-wide real navigation & element loading boundary.
 * - Observes real route navigation and genuinely pending above-the-fold images inside `<main>`.
 * - Applies the transitions.dev `skeleton-loader-and-reveal` blur-crossfade reveal to newly
 *   loaded images and shows a top progress bar ONLY while real assets are still loading.
 * - Never delays page rendering or holds back content that is already loaded.
 */
export const PageNavigationReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname, search } = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const barWrapRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    const barWrap = barWrapRef.current;
    const barFill = barFillRef.current;
    if (!container) return;

    const cleanupFns: Array<() => void> = [];

    // Attach real-load reveal to any uncached standalone <img> inside the page
    const observeStandaloneImages = () => {
      const imgs = container.querySelectorAll<HTMLImageElement>('img');
      imgs.forEach((img) => {
        if (img.closest('.t-skel') || img.closest('.home-hero-avatars') || img.dataset.tSkelObserved === '1') {
          return;
        }
        img.dataset.tSkelObserved = '1';
        if (img.complete && img.naturalWidth > 0) {
          img.classList.remove('t-img-loading');
          return;
        }
        img.classList.add('t-img-loading');
        const finishImg = () => {
          img.classList.remove('t-img-loading');
          img.classList.add('t-img-revealed');
        };
        img.addEventListener('load', finishImg, { once: true });
        img.addEventListener('error', finishImg, { once: true });
        cleanupFns.push(() => {
          img.removeEventListener('load', finishImg);
          img.removeEventListener('error', finishImg);
        });
      });
    };

    observeStandaloneImages();

    const mutationObserver = new MutationObserver(() => {
      observeStandaloneImages();
    });
    mutationObserver.observe(container, { childList: true, subtree: true });
    cleanupFns.push(() => mutationObserver.disconnect());

    if (isFirstMount.current) {
      isFirstMount.current = false;
      return () => {
        cleanupFns.forEach((fn) => fn());
      };
    }

    // On real client-side route navigation, check if above-the-fold images are still loading
    container.classList.remove('is-nav-revealed');
    container.classList.add('is-nav-revealing');
    const rafReveal = window.requestAnimationFrame(() => {
      container.classList.add('is-nav-revealed');
    });
    cleanupFns.push(() => window.cancelAnimationFrame(rafReveal));

    if (barWrap && barFill) {
      const viewportHeight = window.innerHeight || 800;
      const pendingCriticalImgs = Array.from(container.querySelectorAll<HTMLImageElement>('img')).filter(
        (img) => {
          if (img.complete) return false;
          if (img.loading === 'lazy') return false;
          const rect = img.getBoundingClientRect();
          return rect.bottom > 0 && rect.top < viewportHeight * 1.1;
        }
      );

      barWrap.setAttribute('data-active', 'true');
      barFill.setAttribute('data-stage', 'loading');

      let completed = false;
      const completeBar = () => {
        if (completed) return;
        completed = true;
        barFill.setAttribute('data-stage', 'complete');
        const hideTimer = window.setTimeout(() => {
          barWrap.setAttribute('data-active', 'false');
          barFill.setAttribute('data-stage', 'idle');
        }, 260);
        cleanupFns.push(() => window.clearTimeout(hideTimer));
      };

      if (pendingCriticalImgs.length === 0) {
        const fastRaf = window.requestAnimationFrame(() => {
          completeBar();
        });
        cleanupFns.push(() => window.cancelAnimationFrame(fastRaf));
      } else {
        let remaining = pendingCriticalImgs.length;
        const onAssetDone = () => {
          remaining -= 1;
          if (remaining <= 0) {
            completeBar();
          }
        };
        pendingCriticalImgs.forEach((img) => {
          img.addEventListener('load', onAssetDone, { once: true });
          img.addEventListener('error', onAssetDone, { once: true });
          cleanupFns.push(() => {
            img.removeEventListener('load', onAssetDone);
            img.removeEventListener('error', onAssetDone);
          });
        });
        const maxWaitTimer = window.setTimeout(completeBar, 1200);
        cleanupFns.push(() => window.clearTimeout(maxWaitTimer));
      }
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
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
      <div ref={containerRef} className="t-page-reveal is-nav-revealed">
        {children}
      </div>
    </>
  );
};
