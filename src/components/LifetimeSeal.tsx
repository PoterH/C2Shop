import { useId } from 'react';

const SEAL_LOBES = 18;
const SEAL_CX = 48;
const SEAL_CY = 46;

function buildScallopedPath(radius: number, lobeRadius: number): string {
  const points: Array<[number, number]> = [];
  for (let i = 0; i < SEAL_LOBES; i++) {
    const angle = (i * 2 * Math.PI) / SEAL_LOBES - Math.PI / 2;
    points.push([
      Number((SEAL_CX + radius * Math.cos(angle)).toFixed(2)),
      Number((SEAL_CY + radius * Math.sin(angle)).toFixed(2)),
    ]);
  }
  return (
    points.reduce((acc, [x, y], idx) => {
      if (idx === 0) return `M ${x} ${y}`;
      return `${acc} A ${lobeRadius} ${lobeRadius} 0 0 1 ${x} ${y}`;
    }, '') +
    ` A ${lobeRadius} ${lobeRadius} 0 0 1 ${points[0][0]} ${points[0][1]} Z`
  );
}

const OUTER_SCALLOP_PATH = buildScallopedPath(37.5, 6.8);

export function LifetimeSeal({ label }: { label: string }) {
  const id = useId();
  const outerGradId = `${id}-outer`;
  const innerGradId = `${id}-inner`;
  const ribbonGradId = `${id}-ribbon`;
  const star = '0,-4.8 1.4,-1.5 4.8,-1.4 2.2,1 2.9,4.3 0,2.5 -2.9,4.3 -2.2,1 -4.8,-1.4 -1.4,-1.5';

  return (
    <svg className="lifetime-seal" viewBox="0 0 96 110" role="img" aria-label={`100% ${label}`}>
      <defs>
        <linearGradient id={outerGradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe89e" />
          <stop offset="50%" stopColor="#f7b93e" />
          <stop offset="100%" stopColor="#d9880f" />
        </linearGradient>
        <linearGradient id={innerGradId} x1="0.15" y1="0.1" x2="0.85" y2="0.9">
          <stop offset="0%" stopColor="#ffd25a" />
          <stop offset="55%" stopColor="#f5a623" />
          <stop offset="100%" stopColor="#df850c" />
        </linearGradient>
        <linearGradient id={ribbonGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4800b" />
          <stop offset="100%" stopColor="#f2a324" />
        </linearGradient>
      </defs>

      {/* Fitas inferiores do selo */}
      <path
        d="M 26 74 L 16 104 L 29 97 L 38 107 L 45 80 Z"
        fill={`url(#${ribbonGradId})`}
      />
      <path
        d="M 70 74 L 80 104 L 67 97 L 58 107 L 51 80 Z"
        fill={`url(#${ribbonGradId})`}
      />

      {/* Borda redonda ondulada (vários redondos ao redor) */}
      <path d={OUTER_SCALLOP_PATH} fill={`url(#${outerGradId})`} />

      {/* Medalhão circular central */}
      <circle cx={SEAL_CX} cy={SEAL_CY} r="34" fill={`url(#${innerGradId})`} />

      {/* Anéis internos de enquadramento */}
      <circle
        cx={SEAL_CX}
        cy={SEAL_CY}
        r="31"
        fill="none"
        stroke="#fff3cc"
        strokeWidth="1.5"
      />
      <circle
        cx={SEAL_CX}
        cy={SEAL_CY}
        r="28.2"
        fill="none"
        stroke="#fff3cc"
        strokeWidth="0.75"
        strokeDasharray="2.2 2.2"
         opacity="0.85"
      />

      {/* Conteúdo perfeitamente contido dentro do círculo */}
      <g
        fill="#ffffff"
        textAnchor="middle"
        fontFamily="var(--font-display), Arial, sans-serif"
      >
        <text
          x={SEAL_CX}
          y="37"
          fontSize="14.5"
          fontWeight="800"
          letterSpacing="-0.02em"
        >
          100%
        </text>
        <text
          x={SEAL_CX}
          y="49.5"
          fontSize="9.2"
          fontWeight="800"
          letterSpacing="0.04em"
        >
          {label.toLocaleUpperCase()}
        </text>
      </g>

      {/* Linha divisória interna */}
      <line
        x1="29"
        y1="55"
        x2="67"
        y2="55"
        stroke="#fff3cc"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* 3 estrelas alinhadas acompanhando a curvatura interna */}
      <g fill="#ffffff">
        <polygon points={star} transform="translate(35.5 62.5) scale(0.72)" />
        <polygon points={star} transform="translate(48 64.5) scale(0.92)" />
        <polygon points={star} transform="translate(60.5 62.5) scale(0.72)" />
      </g>
    </svg>
  );
}

