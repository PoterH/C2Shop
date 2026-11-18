import { useId } from 'react';
import { useText } from '../hooks/useText';

/**
 * Product-cover seal. Lifetime licences show the advantage itself:
 * an infinity mark, the word "Vitalício" and a ribbon saying there is no monthly fee.
 * Subscriptions get the same medal with a check and "Original".
 */
export function LifetimeSeal({ subscription = false }: { subscription?: boolean }) {
  const text = useText();
  const id = useId().replace(/:/g, '');
  const g = (n: string) => `${id}-${n}`;

  const word = text(subscription ? 'ASSINATURA' : 'VITALÍCIO');
  const ribbon = text(subscription ? '100% ORIGINAL' : 'SEM MENSALIDADE');
  const aria = subscription
    ? text('Licença original')
    : text('Licença vitalícia, sem mensalidade');

  return (
    <svg className="lifetime-seal" viewBox="0 0 120 120" role="img" aria-label={aria}>
      <defs>
        <linearGradient id={g('rim')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbe7ad" />
          <stop offset=".45" stopColor="#d4a548" />
          <stop offset=".7" stopColor="#f5dc97" />
          <stop offset="1" stopColor="#b8862f" />
        </linearGradient>
        <radialGradient id={g('face')} cx=".5" cy=".32" r=".75">
          <stop offset="0" stopColor="#1d4f86" />
          <stop offset=".6" stopColor="#0f2b52" />
          <stop offset="1" stopColor="#081a33" />
        </radialGradient>
        <linearGradient id={g('mark')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f3d68c" />
          <stop offset=".5" stopColor="#fff3cf" />
          <stop offset="1" stopColor="#e2b85c" />
        </linearGradient>
        <linearGradient id={g('band')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f7bff" />
          <stop offset="1" stopColor="#0052cc" />
        </linearGradient>
        <linearGradient id={g('shine')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".22" />
          <stop offset=".55" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Medal: gold rim, navy face, fine inner ring */}
      <circle cx="60" cy="54" r="52" fill={`url(#${g('rim')})`} />
      <circle cx="60" cy="54" r="46.5" fill={`url(#${g('face')})`} />
      <circle cx="60" cy="54" r="42" fill="none" stroke="#e6c77f" strokeOpacity=".55" strokeWidth=".8" strokeDasharray="1.6 2.4" />
      <ellipse cx="60" cy="36" rx="38" ry="24" fill={`url(#${g('shine')})`} />

      {/* Centre mark */}
      {subscription ? (
        <path d="m47 39 9 9 17-18" fill="none" stroke={`url(#${g('mark')})`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path
          d="M60 38c-5-6.5-9.2-9.5-14-9.5-6.2 0-10.5 4.4-10.5 9.5s4.3 9.5 10.5 9.5c4.8 0 9-3 14-9.5s9.2-9.5 14-9.5c6.2 0 10.5 4.4 10.5 9.5s-4.3 9.5-10.5 9.5c-4.8 0-9-3-14-9.5Z"
          fill="none"
          stroke={`url(#${g('mark')})`}
          strokeWidth="5.2"
          strokeLinejoin="round"
        />
      )}

      <text
        x="60"
        y="69"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="12.5"
        fontWeight="800"
        letterSpacing=".6"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {word}
      </text>

      {/* Ribbon across the lower edge */}
      <path d="M4 84h14v17H4l5-8.5Z" fill="#003a94" />
      <path d="M116 84h-14v17h14l-5-8.5Z" fill="#003a94" />
      <path d="M12 98v4l6-4Z M108 98v4l-6-4Z" fill="#00276a" />
      <rect x="12" y="80" width="96" height="18" rx="2" fill={`url(#${g('band')})`} />
      <rect x="12" y="80" width="96" height="1.2" rx=".6" fill="#ffffff" fillOpacity=".35" />
      <text
        x="60"
        y="92.6"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="7.9"
        fontWeight="800"
        letterSpacing=".35"
        textLength={ribbon.length > 15 ? 82 : undefined}
        lengthAdjust="spacingAndGlyphs"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {ribbon}
      </text>
    </svg>
  );
}
