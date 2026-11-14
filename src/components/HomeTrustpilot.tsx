import { useEffect, useRef, useState } from 'react';
import { StoreReviews } from './StoreReviews';

export function HomeTrustpilot() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState('pending');
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 639px)').matches);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const update = () => setMobile(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const timers: number[] = [];
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => setPhase('complete');
    if (motion.matches) { finish(); return; }
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      setPhase('star');
      timers.push(window.setTimeout(() => {
        const target = root.querySelector<HTMLImageElement>('.home-trustpilot-content img[src="/images/trustpilot-star.png"]');
        if (!target) { finish(); return; }
        const bounds = root.getBoundingClientRect();
        const position = target.getBoundingClientRect();
        root.style.setProperty('--star-left', `${position.left - bounds.left + position.width / 2}px`);
        root.style.setProperty('--star-top', `${position.top - bounds.top + position.height / 2}px`);
        root.style.setProperty('--star-size', `${position.width}px`);
        setPhase('moving');
      }, 500));
      timers.push(window.setTimeout(finish, 1450));
    }, { threshold: 0.2 });
    observer.observe(root);
    const onMotionChange = () => { if (motion.matches) finish(); };
    motion.addEventListener('change', onMotionChange);
    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
      motion.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <div id="avaliacoes" ref={ref} data-phase={phase} className="home-trustpilot-intro scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <img className="home-trustpilot-star" src="/images/trustpilot-star.png" alt="" aria-hidden="true" width="80" height="80" />
      <div className="home-trustpilot-content"><StoreReviews summaryOnly={mobile} /></div>
    </div>
  );
}
