import { memo, useEffect, useRef, useState } from 'react';

export const SantaHat = memo(function SantaHat({className = ''}: {className?: string}) {
  return <svg viewBox="0 0 64 52" className={className} aria-hidden="true" focusable="false">
    <path d="M14 34C10 19 23 5 39 7C26 8 19 16 10 19L8 14C22-5 45-4 50 23Z" fill="#c92940" />
    <path d="M17 28C18 17 28 9 39 7C24 6 15 17 14 28Z" fill="#ef5866" />
    <path d="M15 37Q31 26 49 24" fill="none" stroke="#fff7ed" strokeWidth="9" strokeLinecap="round" />
    <circle cx="8" cy="18" r="6" fill="#fff7ed" />
  </svg>;
});

// The observer pauses the only continuous decoration when the hero is offscreen.
export const SnowEffect = memo(function SnowEffect() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="holiday-snow" data-visible={visible} aria-hidden="true">
    {Array.from({length: 12}, (_, i) => <i key={i} style={{left: `${5 + i * 8}%`, animationDelay: `${-i * 1.7}s`, animationDuration: `${12 + i % 5}s`}} />)}
  </div>;
});

function HolidayCorner() {
  return <svg viewBox="0 0 240 150" fill="none" focusable="false">
    <path d="M10 15Q80 30 209 8" stroke="#416d59" strokeWidth="3" strokeLinecap="round" />
    <path d="m28 19-17 15m29-13L22 44m34-21L39 46m34-22L58 48m34-24L82 46m29-24-6 20m26-22-2 18m24-22 3 17m18-20 9 15m-142-9L32 4m25 19L51 6m24 17L73 5m20 18L96 5m17 16 6-17m13 15 8-16m13 13 10-14" stroke="#315b48" strokeWidth="3" strokeLinecap="round" />
    <path d="M72 25v49" stroke="#c9aa6d" strokeWidth="1" />
    <rect x="66" y="71" width="12" height="8" rx="2" fill="#c9aa6d" />
    <circle cx="72" cy="102" r="25" fill="#a92d42" />
    <path d="M49 94q23 14 46 0m-46 16q23-14 46 0" stroke="#e3bf7b" strokeWidth="1.3" />
    <path d="M58 85a21 21 0 0 0-7 16" stroke="#ed9ca3" strokeWidth="2" strokeLinecap="round" />
    <circle cx="132" cy="20" r="3" fill="#ddbf85" /><circle cx="187" cy="12" r="3" fill="#ddbf85" />
  </svg>;
}

export const HolidayHeroDecor = memo(function HolidayHeroDecor() {
  return <div className="holiday-hero-decor" aria-hidden="true">
    <div className="holiday-corner holiday-corner-left"><HolidayCorner /></div>
    <div className="holiday-corner holiday-corner-right"><HolidayCorner /></div>
  </div>;
});

export const ChristmasWreath = memo(function ChristmasWreath({className = 'w-24 h-24'}: {className?: string}) {
  return <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
    <circle cx="50" cy="50" r="33" fill="none" stroke="#195d4c" strokeWidth="17" />
    <circle cx="50" cy="50" r="35" fill="none" stroke="#43816a" strokeWidth="11" strokeDasharray="2 6" />
    {[0,60,120,180,240,300].map(a=><g key={a} transform={`rotate(${a} 50 50)`}><circle cx="50" cy="17" r="4" fill="#e6c385" /><circle cx="42" cy="21" r="2" fill="#a72e41" /></g>)}
    <path d="M50 18C21-4 20 35 50 22c30 13 29-26 0-4Z" fill="#c74251" />
    <path d="m46 21-9 22 11-5 3 8 4-24Z" fill="#b43143" />
  </svg>;
});

export const FooterGarlandLine = memo(function FooterGarlandLine() {
  return <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none" aria-hidden="true"><ChristmasWreath className="w-16 h-16" /></div>;
});
