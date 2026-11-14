import { useId } from 'react';

export function LifetimeSeal({ label }: { label: string }) {
  const gradientId = useId();
  const star = '0,-5 1.5,-1.6 5,-1.5 2.4,1 3.1,4.5 0,2.7 -3.1,4.5 -2.4,1 -5,-1.5 -1.5,-1.6';
  return (
    <svg className="lifetime-seal" viewBox="0 0 88 104" role="img" aria-label={`100% ${label}`}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffd675" />
          <stop offset="0.55" stopColor="#ffbb35" />
          <stop offset="1" stopColor="#f4a51c" />
        </linearGradient>
      </defs>
      <path d="M17 71 10 97 25 90 34 102 43 77M71 71 78 97 63 90 54 102 45 77" fill="#f4aa20" />
      <path d="m44 3 39 22v48L44 96 5 73V25Z" fill="#ffe1a0" />
      <path d="m44 11 32 18v40L44 88 12 69V29Z" fill={`url(#${gradientId})`} />
      <path d="m44 15 28 16v36L44 83 16 67V31Z" fill="none" stroke="#fff0c8" strokeWidth="1" />
      <g fill="white" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700">
        <text x="44" y="40" fontSize="13">100%</text>
        <text x="44" y="55" fontSize="10.5">{label.toLocaleUpperCase()}</text>
      </g>
      <path d="M23 60H65" stroke="#fff1cd" strokeWidth="1" />
      <g fill="white">
        <polygon points={star} transform="translate(28 70) scale(.75)" />
        <polygon points={star} transform="translate(44 71)" />
        <polygon points={star} transform="translate(60 70) scale(.75)" />
      </g>
    </svg>
  );
}
