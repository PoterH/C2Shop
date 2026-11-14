import { useEffect, useMemo, useRef, useState } from 'react';

export interface GridMotionItem {
  src: string;
  alt?: string;
}

interface GridMotionProps {
  items: GridMotionItem[];
  className?: string;
  rows?: number;
  aspectRatio?: number;
  gap?: number;
  angle?: number;
  speed?: number;
  spotlight?: number;
  dim?: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wrap = (value: number, total: number) => ((value % total) + total) % total;

/** Lightweight React implementation of the Grid Motion treatment for product artwork. */
export function GridMotion({
  items,
  className = '',
  rows = 3,
  aspectRatio = 0.78,
  gap = 20,
  angle = -7,
  speed = 16,
  spotlight = 0.42,
  dim = 0.24,
}: GridMotionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const tiles = useMemo(() => items.filter((item) => item.src), [items]);
  const rowCount = Math.max(1, Math.round(rows));
  const visibleRows = size.width > 0 && size.width < 640 ? Math.min(2, rowCount) : rowCount;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(() => {
      setSize({ width: root.clientWidth, height: root.clientHeight });
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const layout = useMemo(() => {
    if (!size.width || !size.height) return null;
    const radians = (angle * Math.PI) / 180;
    const sin = Math.abs(Math.sin(radians));
    const cos = Math.max(0.01, Math.abs(Math.cos(radians)));
    const rotatedViewportHeight = size.width * sin + size.height * cos;
    // Keep product artwork at a natural, viewport-height-based size. Deriving
    // tile height from the rotated width makes cards grow on ultrawide screens.
    const tileHeight = Math.min(
      (rotatedViewportHeight - gap * (visibleRows - 1)) / visibleRows,
      size.height / visibleRows,
      280,
    );
    const tileWidth = tileHeight * aspectRatio;
    const step = tileWidth + gap;
    const rowStackHeight = visibleRows * tileHeight + gap * (visibleRows - 1);
    // Trim the unused transparent area above/below the rows. The plane now
    // bleeds naturally past the viewport while each card keeps its own size.
    const planeHeight = rowStackHeight;
    const planeWidth = (size.width + planeHeight * sin) / cos;
    const columns = Math.ceil(planeWidth / step) + 3;
    const rowOffsetY = 0;
    return { planeWidth, planeHeight, tileWidth, tileHeight, step, columns, rowOffsetY, period: columns * step, rowWidth: columns * step * 3 };
  }, [size, angle, gap, visibleRows, aspectRatio]);

  useEffect(() => {
    const root = rootRef.current;
    const plane = planeRef.current;
    if (!root || !plane || !layout || tiles.length === 0) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Start each row across the viewport so both rows fill the hero immediately.
    const offsets = Array.from({ length: visibleRows }, (_, row) => layout.period * (row % 2 === 0 ? 0.5 : 0.62));
    const spotlightValues = new WeakMap<HTMLElement, number>();
    let raf = 0;
    let last = performance.now();
    let isVisible = true;
    let alive = true;

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointerRef.current = {
        x: event.clientX - rect.left - rect.width / 2,
        y: event.clientY - rect.top - rect.height / 2,
        active: event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom,
      };
    };
    const onPointerLeave = () => { pointerRef.current.active = false; };

    root.addEventListener('pointermove', onPointerMove, { passive: true });
    root.addEventListener('pointerleave', onPointerLeave);

    const frame = (now: number) => {
      if (!alive) return;
      // Clear the completed frame id before deciding whether to schedule another.
      // Otherwise it stays truthy while the grid is off-screen and blocks a restart.
      raf = 0;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const pointer = pointerRef.current;
      const turn = (angle * Math.PI) / 180;
      const focusX = pointer.x * Math.cos(turn) + pointer.y * Math.sin(turn);
      const focusY = -pointer.x * Math.sin(turn) + pointer.y * Math.cos(turn);
      const reach = Math.max(layout.tileWidth, layout.tileHeight) * (1.3 + spotlight * 2.4);

      Array.from(plane.children).forEach((rowElement, rowIndex) => {
        const row = rowElement as HTMLElement;
        const driftDirection = rowIndex % 2 === 0 ? -1 : 1;
        if (!reducedMotion) offsets[rowIndex] += speed * driftDirection * dt;
        const x = -layout.period + wrap(offsets[rowIndex], layout.period);
        row.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;

        Array.from(row.children).forEach((tileElement, tileIndex) => {
          const tile = tileElement as HTMLElement;
          const tileX = x - layout.planeWidth / 2 + layout.tileWidth / 2 + tileIndex * layout.step;
          const tileY = layout.rowOffsetY + layout.tileHeight / 2 + rowIndex * (layout.tileHeight + gap) - layout.planeHeight / 2;
          const distance = Math.hypot(tileX - focusX, tileY - focusY);
          const target = pointer.active && spotlight > 0 ? 1 - clamp((distance - reach * 0.22) / (reach * 0.78), 0, 1) : 0;
          const current = spotlightValues.get(tile) ?? 0;
          const next = current + (target - current) * (1 - Math.exp(-dt / 0.2));
          if (Math.abs(next - current) > 0.01) {
            spotlightValues.set(tile, next);
            tile.style.setProperty('--grid-spot', next.toFixed(3));
          }
        });
      });
      if (isVisible) raf = requestAnimationFrame(frame);
    };

    const visibility = new IntersectionObserver((entries) => {
      isVisible = entries.some((entry) => entry.isIntersecting);
      if (isVisible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    visibility.observe(root);
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      visibility.disconnect();
      root.removeEventListener('pointermove', onPointerMove);
      root.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [layout, tiles, visibleRows, angle, speed, spotlight]);

  return (
    <div ref={rootRef} className={`grid-motion ${className}`} role="img" aria-label="Artes dos softwares disponíveis na loja">
      {layout && tiles.length > 0 && (
        <div
          ref={planeRef}
          className="grid-motion__plane"
          style={{
            width: layout.planeWidth,
            height: layout.planeHeight,
          transform: `translate(-50%,-50%) rotateZ(${angle}deg)`,
            '--grid-gap': `${gap}px`,
            '--grid-tile-width': `${layout.tileWidth}px`,
            '--grid-tile-height': `${layout.tileHeight}px`,
            '--grid-dim': dim,
          } as React.CSSProperties}
        >
          {Array.from({ length: visibleRows }, (_, rowIndex) => {
            const hasCenterRow = visibleRows >= 3;
            const isCenterRow = rowIndex === Math.floor(visibleRows / 2);
            const rowDim = hasCenterRow ? (isCenterRow ? dim * 0.12 : Math.min(0.58, dim + 0.27)) : dim;
            return (
            <div className="grid-motion__row" key={rowIndex} style={{ top: layout.rowOffsetY + rowIndex * (layout.tileHeight + gap), width: layout.rowWidth, '--grid-row-dim': rowDim } as React.CSSProperties}>
              {Array.from({ length: layout.columns * 3 }, (_, columnIndex) => {
                const item = tiles[(rowIndex * layout.columns + columnIndex) % tiles.length];
                return (
                  <div className="grid-motion__tile" key={`${rowIndex}-${columnIndex}`}>
                    <img src={item.src} alt="" draggable={false} decoding="async" loading="eager" />
                  </div>
                );
              })}
            </div>
          );})}
        </div>
      )}
    </div>
  );
}
