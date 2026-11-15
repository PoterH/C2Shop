import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Transitions.dev — Banner stacking, auto-advancing through the store's three key benefits.
const BENEFITS = [
  { icon: '/images/icons/badge-seal.png', title: 'badge_lifetime', sub: 'badge_lifetime_sub' },
  { icon: '/images/icons/badge-shield.png', title: 'badge_guaranteed', sub: 'badge_guaranteed_sub' },
  { icon: '/images/icons/badge-plane.png', title: 'badge_digital_delivery', sub: 'badge_digital_delivery_sub' },
] as const;

const CYCLE_MS = 3200;
const CLOSE_MS = 250; // matches --stack-close
const MAX_VISIBLE = 3;

type StackItem = { id: number; benefit: number; leaving: boolean };

// Front banner first. Pre-filled so the stack reads complete on first paint and the
// banner that enters next is always the one leaving from the back.
const INITIAL_ITEMS: StackItem[] = [
  { id: 2, benefit: 0, leaving: false },
  { id: 1, benefit: 2, leaving: false },
  { id: 0, benefit: 1, leaving: false },
];

export const HeroBenefitsStack: React.FC = () => {
  const { t } = useLanguage();
  const [items, setItems] = useState<StackItem[]>(INITIAL_ITEMS);
  const [paused, setPaused] = useState(false);
  const nextIdRef = useRef(INITIAL_ITEMS.length);
  const leaveTimersRef = useRef<number[]>([]);

  const advance = useCallback(() => {
    const id = nextIdRef.current++;
    setItems((prev) => {
      const active = prev.filter((item) => !item.leaving);
      const benefit = active[0] ? (active[0].benefit + 1) % BENEFITS.length : 0;
      const next: StackItem[] = [{ id, benefit, leaving: false }];
      let activeCount = 1;
      prev.forEach((item) => {
        if (item.leaving) {
          next.push(item);
          return;
        }
        activeCount += 1;
        next.push(activeCount > MAX_VISIBLE ? { ...item, leaving: true } : item);
      });
      return next;
    });
    // The cycle is far longer than --stack-close, so every leaving banner belongs to this step.
    const timer = window.setTimeout(() => {
      setItems((current) => current.filter((item) => !item.leaving));
    }, CLOSE_MS);
    leaveTimersRef.current.push(timer);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(advance, CYCLE_MS);
    return () => window.clearInterval(interval);
  }, [advance, paused]);

  useEffect(() => {
    const timers = leaveTimersRef.current;
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  // A newly mounted banner starts from .is-enter, one forced reflow, then the class is
  // dropped in the same task so it rises into depth 0 (spec: no rAF hop).
  const enterRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || node.dataset.entered === 'true') return;
    node.dataset.entered = 'true';
    if (node.dataset.initial === 'true') return;
    node.classList.add('is-enter');
    void node.offsetWidth;
    node.classList.remove('is-enter');
  }, []);

  const depths = new Map<number, number>();
  items
    .filter((item) => !item.leaving)
    .forEach((item, index) => depths.set(item.id, index));

  return (
    <div
      className="home-hero-benefits t-stack"
      role="list"
      aria-label={t('badge_lifetime') + ', ' + t('badge_guaranteed') + ', ' + t('badge_digital_delivery')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((item) => {
        const benefit = BENEFITS[item.benefit];
        const itemDepth = depths.get(item.id);
        const isInitial = INITIAL_ITEMS.some((initial) => initial.id === item.id);
        return (
          <div
            key={item.id}
            ref={enterRef}
            role="listitem"
            aria-hidden={itemDepth === 0 ? undefined : true}
            data-depth={itemDepth}
            data-initial={isInitial ? 'true' : undefined}
            className={`t-stack-banner home-hero-benefit${item.leaving ? ' is-leaving' : ''}`}
          >
            <img src={benefit.icon} alt="" aria-hidden="true" className="home-hero-benefit-icon" />
            <div className="min-w-0">
              <p className="home-hero-benefit-title">{t(benefit.title)}</p>
              <p className="home-hero-benefit-sub">{t(benefit.sub)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
