import { useCallback, useEffect, useRef, useState } from 'react';
import type { Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { useText } from '../hooks/useText';

type Props = {
  products: Product[];
  /** Changing this value rewinds the rail to the first card (e.g. the active category). */
  resetKey: string;
};

const DRAG_THRESHOLD = 6;
const AUTO_ADVANCE_MS = 4000;

/**
 * Product rail without arrows: swipe on touch, drag with the mouse, scroll with a trackpad.
 * A segmented progress bar below shows how many "pages" the rail holds and where you are.
 */
export function ProductCarousel({ products, resetKey }: Props) {
  const localize = useText();
  const railRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [progress, setProgress] = useState(0); // 0..1 across the whole rail
  const [dragging, setDragging] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const hovering = useRef(false);
  const userTookOver = useRef(false);
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0, lastX: 0, lastT: 0, velocity: 0, pointerId: -1 });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPages(max > 2 ? Math.ceil(max / el.clientWidth - 0.05) + 1 : 1);
    setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 0);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener('scroll', measure, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', measure);
    };
  }, [measure, products]);

  // Rewind when the category changes
  useEffect(() => {
    const el = railRef.current;
    if (el) el.scrollLeft = 0;
    userTookOver.current = false;
    measure();
  }, [resetKey, measure]);

  const step = () => {
    const el = railRef.current;
    if (!el) return 0;
    return (el.firstElementChild?.getBoundingClientRect().width ?? 0) + parseFloat(getComputedStyle(el).columnGap || '0');
  };

  // Gentle auto-advance; pauses on hover and stops for good once the visitor moves the rail.
  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(() => {
      const el = railRef.current;
      if (!el || document.hidden || hovering.current || userTookOver.current || drag.current.active) return;
      const max = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: el.scrollLeft >= max - 10 ? 0 : el.scrollLeft + step(), behavior: 'smooth' });
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [reducedMotion, products]);

  /* ---------- Mouse drag (touch and trackpad scroll natively) ---------- */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = railRef.current;
    if (!el) return;
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft, lastX: e.clientX, lastT: performance.now(), velocity: 0, pointerId: e.pointerId };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = railRef.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      d.moved = true;
      userTookOver.current = true;
      el.setPointerCapture(d.pointerId);
      setDragging(true);
    }
    const now = performance.now();
    const dt = Math.max(1, now - d.lastT);
    d.velocity = (e.clientX - d.lastX) / dt; // px per ms
    d.lastX = e.clientX;
    d.lastT = now;
    el.scrollLeft = d.startScroll - dx;
  };

  const endDrag = () => {
    const d = drag.current;
    const el = railRef.current;
    if (!d.active) return;
    d.active = false;
    if (!d.moved || !el) return;
    if (el.hasPointerCapture(d.pointerId)) el.releasePointerCapture(d.pointerId);
    // Settle on the nearest card, carrying a little momentum from the flick
    const s = step() || 1;
    const fling = Math.max(-s, Math.min(s, -d.velocity * 180)); // at most one extra card
    const target = el.scrollLeft + fling;
    const snapped = Math.round(target / s) * s;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.min(max, Math.max(0, snapped)), behavior: reducedMotion ? 'auto' : 'smooth' });
    window.setTimeout(() => setDragging(false), reducedMotion ? 0 : 420);
  };

  // A drag must never open the card it started on
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const goToPage = (i: number) => {
    const el = railRef.current;
    if (!el) return;
    userTookOver.current = true;
    const max = el.scrollWidth - el.clientWidth;
    const s = step() || 1;
    const target = pages > 1 ? (i / (pages - 1)) * max : 0;
    el.scrollTo({ left: i === pages - 1 ? max : Math.round(target / s) * s, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const activePage = Math.round(progress * (pages - 1));

  return (
    <div
      className="w-full"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <div
        ref={railRef}
        className={`home-product-carousel pc-rail flex overflow-x-auto pb-6 pt-2 scrollbar-none ${dragging ? 'is-dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        onTouchStart={() => (userTookOver.current = true)}
        onWheel={(e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) userTookOver.current = true; }}
        role="region"
        aria-roledescription="carrossel"
        aria-label={localize('Softwares em destaque')}
      >
        {products.map((product) => (
          <div key={product.id} className="home-carousel-item shrink-0 snap-start flex flex-col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="pc-progress" role="group" aria-label={localize('Navegação do carrossel')}>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`pc-seg ${i === activePage ? 'is-active' : ''} ${i < activePage ? 'is-past' : ''}`}
              aria-label={`${localize('Ir para a página')} ${i + 1} ${localize('de')} ${pages}`}
              aria-current={i === activePage ? 'true' : undefined}
              onClick={() => goToPage(i)}
            >
              <span className="pc-seg-bar" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
