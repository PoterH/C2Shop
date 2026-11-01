import React, { useMemo } from 'react';

/**
 * ============================================================================
 * 1. SANTA HAT (Chapeuzinho Natalino para o Ícone da Logo C2Tech)
 * ============================================================================
 * Um gorro de Papai Noel vetorial clássico e vibrante, desenhado com
 * tecido vermelho aveludado, dobra elegante, acabamento felpudo branco e
 * pompom macio. Encaixa perfeitamente inclinado sobre o topo do ícone.
 */
export const SantaHat: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => {
  return (
    <svg
      viewBox="0 0 100 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="santaHatRed" x1="20" y1="20" x2="75" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="25%" stopColor="#ef4444" />
          <stop offset="65%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="santaHatFold" x1="25" y1="20" x2="55" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="santaWhiteFluff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <radialGradient id="santaPompom" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <filter id="santaHatShadow" x="-20%" y="-20%" width="150%" height="150%">
          <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Red Cap Cone with Natural Curve */}
      <g filter="url(#santaHatShadow)">
        <path
          d="M18 60 C22 38, 42 16, 62 14 C76 13, 86 24, 83 38 C80 48, 69 52, 75 60 C73 63, 67 63, 65 57 C67 47, 72 38, 71 30 C70 20, 60 21, 50 26 C36 33, 25 45, 18 60 Z"
          fill="url(#santaHatRed)"
        />
        {/* Soft fabric highlight fold */}
        <path
          d="M26 53 C32 38, 44 26, 56 22 C48 27, 36 38, 30 52 Z"
          fill="url(#santaHatFold)"
        />
      </g>

      {/* Fluffy White Brim / Band */}
      <g filter="url(#santaHatShadow)">
        <rect x="12" y="53" width="56" height="17" rx="8.5" fill="url(#santaWhiteFluff)" />
        {/* Cloud-like puffy bumps */}
        <circle cx="18" cy="61.5" r="8.5" fill="url(#santaWhiteFluff)" />
        <circle cx="28" cy="59.5" r="9" fill="#ffffff" />
        <circle cx="39" cy="61.5" r="8.5" fill="url(#santaWhiteFluff)" />
        <circle cx="50" cy="59.5" r="9" fill="#ffffff" />
        <circle cx="60" cy="61.5" r="8" fill="url(#santaWhiteFluff)" />
      </g>

      {/* Fluffy Pompom at tip */}
      <g filter="url(#santaHatShadow)">
        <circle cx="74" cy="64" r="10.5" fill="url(#santaPompom)" />
        <circle cx="72" cy="61.5" r="8.5" fill="#ffffff" />
        {/* Fine plush texture dots */}
        <circle cx="76" cy="65" r="1.4" fill="#94a3b8" opacity="0.4" />
        <circle cx="71" cy="67" r="1.2" fill="#94a3b8" opacity="0.35" />
        <circle cx="75" cy="60" r="1.1" fill="#94a3b8" opacity="0.3" />
      </g>
    </svg>
  );
};

/**
 * ============================================================================
 * 2. SNOW EFFECT (Efeito de Flocos de Neve Caindo no Hero)
 * ============================================================================
 * Flocos de neve elegantes, leves e de alto desempenho que flutuam
 * continuamente sobre o fundo escuro do hero.
 */
interface SnowflakeConfig {
  id: number;
  left: number; // 0% to 100%
  size: number; // 2px to 8px
  duration: number; // seconds
  delay: number; // negative delay so snow is already mid-air
  driftStart: number; // px
  driftEnd: number; // px
  opacity: number;
  isCrystal: boolean; // render SVG snowflake or glowing circular flurry
}

export const SnowEffect: React.FC = () => {
  // Deterministic snowflake pool to prevent SSR/re-render hydration flicker
  const snowflakes = useMemo<SnowflakeConfig[]>(() => {
    const flakes: SnowflakeConfig[] = [];
    const count = 42; // Perfect balance between visual magic and ultra-smooth 60fps performance
    
    // Simple deterministic PRNG
    let seed = 12345;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < count; i++) {
      const isCrystal = i % 7 === 0; // Every 7th flake is an intricate crystalline snowflake
      const size = isCrystal ? 10 + rnd() * 6 : 2.5 + rnd() * 4.5;
      const duration = 6 + rnd() * 7; // 6s to 13s
      const delay = -(rnd() * duration); // Already falling on mount
      const driftStart = -15 + rnd() * 30;
      const driftEnd = driftStart + (-25 + rnd() * 50);
      const opacity = 0.35 + rnd() * 0.55;

      flakes.push({
        id: i,
        left: (i / count) * 100 + (-2 + rnd() * 4), // Well-distributed horizontal spread
        size,
        duration,
        delay,
        driftStart,
        driftEnd,
        opacity,
        isCrystal,
      });
    }

    return flakes;
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10"
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <span
          key={flake.id}
          className="absolute top-0 animate-snowfall will-change-transform block"
          style={
            {
              left: `${flake.left}%`,
              '--snow-duration': `${flake.duration}s`,
              '--snow-delay': `${flake.delay}s`,
              '--snow-drift-start': `${flake.driftStart}px`,
              '--snow-drift-end': `${flake.driftEnd}px`,
              '--snow-opacity': flake.opacity,
              '--snow-rot': `${flake.isCrystal ? 360 : 0}deg`,
            } as React.CSSProperties
          }
        >
          {flake.isCrystal ? (
            /* Intricate 6-pointed crystalline snowflake */
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.6"
              strokeLinecap="round"
              style={{
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.75))',
                opacity: flake.opacity,
              }}
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="3.34" y1="7" x2="20.66" y2="17" />
              <line x1="3.34" y1="17" x2="20.66" y2="7" />
              {/* Branchlets */}
              <polyline points="9 4 12 7 15 4" />
              <polyline points="9 20 12 17 15 20" />
              <polyline points="5 10 8 10 9 7" />
              <polyline points="19 14 16 14 15 17" />
              <polyline points="5 14 8 14 9 17" />
              <polyline points="19 10 16 10 15 7" />
            </svg>
          ) : (
            /* Soft glowing flurry dot */
            <span
              className="block rounded-full bg-white"
              style={{
                width: `${flake.size}px`,
                height: `${flake.size}px`,
                boxShadow:
                  flake.size > 4
                    ? '0 0 6px 1px rgba(255, 255, 255, 0.8), 0 0 12px 2px rgba(0, 210, 255, 0.4)'
                    : '0 0 4px rgba(255, 255, 255, 0.7)',
                opacity: flake.opacity,
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
};

/**
 * ============================================================================
 * 3. CHRISTMAS WREATH (Guirlanda Natalina Central com Ramos e Laço de Veludo)
 * ============================================================================
 * Guirlanda festiva circular feita de ramos de pinheiro perenes, laço duplo
 * de veludo vermelho com fitas esvoaçantes, bolinhas douradas, vermelhas e azuis
 * (cor tema da C2Tech), azevinhos com brilho e luzes de fada reluzentes.
 */
export const ChristmasWreath: React.FC<{ className?: string }> = ({
  className = 'w-24 h-24 sm:w-28 sm:h-28',
}) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wreathPineDark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#052e16" />
        </linearGradient>
        <linearGradient id="wreathPineMid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="wreathPineLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>

        <linearGradient id="wreathRibbonRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="25%" stopColor="#ef4444" />
          <stop offset="70%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="wreathRibbonHighlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>

        <radialGradient id="wreathGoldBall" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </radialGradient>
        <radialGradient id="wreathRedBall" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="40%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#881337" />
        </radialGradient>
        <radialGradient id="wreathCyanBall" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="40%" stopColor="#00d2ff" />
          <stop offset="100%" stopColor="#0066FF" />
        </radialGradient>

        <filter id="wreathDropShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      <g filter="url(#wreathDropShadow)">
        {/* Base Pine Needles Foundation Ring */}
        <circle
          cx="80"
          cy="85"
          r="44"
          stroke="#064e3b"
          strokeWidth="26"
          strokeLinecap="round"
          strokeDasharray="16 4"
          opacity="0.95"
        />
        <circle
          cx="80"
          cy="85"
          r="44"
          stroke="url(#wreathPineDark)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeDasharray="14 3"
        />
        <circle
          cx="80"
          cy="85"
          r="44"
          stroke="url(#wreathPineMid)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="10 5"
        />

        {/* Outer Pine Needles (Spiky Conifer Sprigs) */}
        <g stroke="url(#wreathPineLight)" strokeWidth="2.5" strokeLinecap="round">
          {/* Top Left */}
          <path d="M52 57 L44 48 M52 57 L39 56 M52 57 L46 64" />
          <path d="M40 73 L30 68 M40 73 L28 77 M40 73 L33 82" />
          {/* Left */}
          <path d="M37 93 L26 91 M37 93 L27 101 M37 93 L33 105" />
          {/* Bottom Left */}
          <path d="M46 112 L38 119 M46 112 L43 126 M46 112 L52 127" />
          <path d="M63 124 L60 134 M63 124 L69 137 M63 124 L74 133" />
          {/* Bottom Center */}
          <path d="M80 126 L80 138 M80 126 L86 137 M80 126 L74 137" />
          {/* Bottom Right */}
          <path d="M97 124 L101 134 M97 124 L91 137 M97 124 L106 133" />
          <path d="M114 112 L122 119 M114 112 L117 126 M114 112 L108 127" />
          {/* Right */}
          <path d="M123 93 L134 91 M123 93 L133 101 M123 93 L127 105" />
          <path d="M120 73 L130 68 M120 73 L132 77 M120 73 L127 82" />
          {/* Top Right */}
          <path d="M108 57 L116 48 M108 57 L121 56 M108 57 L114 64" />
        </g>

        {/* Inner Pine Needles */}
        <g stroke="#86efac" strokeWidth="1.8" strokeLinecap="round" opacity="0.9">
          <path d="M60 66 L55 58 M60 66 L52 64 M60 66 L57 73" />
          <path d="M50 82 L42 79 M50 82 L43 88 M50 82 L46 92" />
          <path d="M51 100 L43 103 M51 100 L46 109 M51 100 L53 111" />
          <path d="M72 116 L68 124 M72 116 L76 125" />
          <path d="M88 116 L92 124 M88 116 L84 125" />
          <path d="M109 100 L117 103 M109 100 L114 109 M109 100 L107 111" />
          <path d="M110 82 L118 79 M110 82 L117 88 M110 82 L114 92" />
          <path d="M100 66 L105 58 M100 66 L108 64 M100 66 L103 73" />
        </g>

        {/* Shiny Holiday Baubles / Spheres */}
        {/* Gold Ornament 1 */}
        <circle cx="114" cy="72" r="6.5" fill="url(#wreathGoldBall)" />
        <circle cx="112" cy="70" r="1.8" fill="#ffffff" opacity="0.85" />

        {/* Red Ornament 1 */}
        <circle cx="45" cy="88" r="7" fill="url(#wreathRedBall)" />
        <circle cx="43" cy="86" r="2" fill="#ffffff" opacity="0.85" />

        {/* Cyan/Tech Blue C2Tech Ornament */}
        <circle cx="106" cy="112" r="6" fill="url(#wreathCyanBall)" />
        <circle cx="104" cy="110" r="1.6" fill="#ffffff" opacity="0.85" />

        {/* Gold Ornament 2 */}
        <circle cx="56" cy="110" r="6.5" fill="url(#wreathGoldBall)" />
        <circle cx="54" cy="108" r="1.8" fill="#ffffff" opacity="0.85" />

        {/* Red Ornament 2 */}
        <circle cx="80" cy="125" r="5.5" fill="url(#wreathRedBall)" />
        <circle cx="78.5" cy="123.5" r="1.5" fill="#ffffff" opacity="0.85" />

        {/* Bright Holly Berry Clusters */}
        <g>
          {/* Cluster Top Left */}
          <circle cx="46" cy="56" r="3.2" fill="#e11d48" />
          <circle cx="45" cy="55" r="0.9" fill="#ffffff" opacity="0.95" />
          <circle cx="51" cy="54" r="3" fill="#be123c" />
          <circle cx="50" cy="53" r="0.8" fill="#ffffff" opacity="0.95" />
          <circle cx="49" cy="59" r="2.8" fill="#e11d48" />

          {/* Cluster Right */}
          <circle cx="118" cy="94" r="3.2" fill="#e11d48" />
          <circle cx="117" cy="93" r="0.9" fill="#ffffff" opacity="0.95" />
          <circle cx="122" cy="98" r="3" fill="#be123c" />
          <circle cx="121" cy="97" r="0.8" fill="#ffffff" opacity="0.95" />

          {/* Cluster Bottom Left */}
          <circle cx="70" cy="120" r="3" fill="#e11d48" />
          <circle cx="69" cy="119" r="0.8" fill="#ffffff" opacity="0.95" />
          <circle cx="66" cy="124" r="2.8" fill="#be123c" />
        </g>

        {/* Warm Sparkling Fairy Lights with Twinkle Classes */}
        <g>
          <g className="animate-twinkle-1">
            <circle cx="64" cy="62" r="2.2" fill="#fef08a" />
            <circle cx="64" cy="62" r="5" fill="#facc15" opacity="0.4" />
          </g>
          <g className="animate-twinkle-2">
            <circle cx="96" cy="62" r="2.2" fill="#fef08a" />
            <circle cx="96" cy="62" r="5" fill="#facc15" opacity="0.4" />
          </g>
          <g className="animate-twinkle-3">
            <circle cx="38" cy="102" r="2.2" fill="#fef08a" />
            <circle cx="38" cy="102" r="5" fill="#facc15" opacity="0.4" />
          </g>
          <g className="animate-twinkle-1">
            <circle cx="122" cy="82" r="2.2" fill="#fef08a" />
            <circle cx="122" cy="82" r="5" fill="#facc15" opacity="0.4" />
          </g>
          <g className="animate-twinkle-2">
            <circle cx="92" cy="124" r="2.2" fill="#fef08a" />
            <circle cx="92" cy="124" r="5" fill="#facc15" opacity="0.4" />
          </g>
        </g>

        {/* Elegant Red Velvet Ribbon Bow (Crown of the Wreath) */}
        {/* Ribbon tails */}
        <g>
          {/* Left tail */}
          <path
            d="M74 46 C70 56, 64 68, 62 82 L70 80 C71 68, 76 58, 77 47 Z"
            fill="url(#wreathRibbonRed)"
          />
          <path d="M62 82 L67 76 L70 80 Z" fill="#7f1d1d" />
          {/* Right tail */}
          <path
            d="M86 46 C90 56, 96 68, 98 82 L90 80 C89 68, 84 58, 83 47 Z"
            fill="url(#wreathRibbonRed)"
          />
          <path d="M98 82 L93 76 L90 80 Z" fill="#7f1d1d" />
          {/* Delicate gold edging */}
          <path
            d="M72 52 C69 62, 65 72, 63 79"
            stroke="#fbbf24"
            strokeWidth="0.8"
            opacity="0.8"
          />
          <path
            d="M88 52 C91 62, 95 72, 97 79"
            stroke="#fbbf24"
            strokeWidth="0.8"
            opacity="0.8"
          />
        </g>

        {/* Left Bow Loop */}
        <path
          d="M78 43 C70 32, 50 28, 48 38 C46 47, 65 48, 76 46 Z"
          fill="url(#wreathRibbonRed)"
        />
        <path
          d="M74 42 C68 35, 54 32, 51 38 C49 43, 62 45, 73 44 Z"
          fill="url(#wreathRibbonHighlight)"
          opacity="0.45"
        />
        <ellipse cx="58" cy="38" rx="4" ry="2.5" transform="rotate(-15 58 38)" fill="#7f1d1d" />

        {/* Right Bow Loop */}
        <path
          d="M82 43 C90 32, 110 28, 112 38 C114 47, 95 48, 84 46 Z"
          fill="url(#wreathRibbonRed)"
        />
        <path
          d="M86 42 C92 35, 106 32, 109 38 C111 43, 98 45, 87 44 Z"
          fill="url(#wreathRibbonHighlight)"
          opacity="0.45"
        />
        <ellipse cx="102" cy="38" rx="4" ry="2.5" transform="rotate(15 102 38)" fill="#7f1d1d" />

        {/* Center Ribbon Knot */}
        <ellipse cx="80" cy="44" rx="7.5" ry="6.5" fill="url(#wreathRibbonRed)" />
        <ellipse cx="79" cy="43" rx="5" ry="4" fill="url(#wreathRibbonHighlight)" opacity="0.5" />
        <circle cx="80" cy="44" r="2.2" fill="#fbbf24" opacity="0.85" />
      </g>
    </svg>
  );
};

/**
 * ============================================================================
 * 4. FOOTER GARLAND LINE (Guirlanda Natalina Sobre a Linha do Footer)
 * ============================================================================
 * Uma guirlanda decorativa completa que repousa diretamente sobre a linha
 * superior do footer. No centro destaca-se a bela guirlanda circular natalina
 * com laço vermelho, ladeada por festões de pinheiro, azevinhos vermelhos
 * e pequenas luzes douradas que se estendem harmoniosamente ao longo da borda.
 */
export const FooterGarlandLine: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 right-0 -translate-y-1/2 z-20 pointer-events-none select-none flex items-center justify-center">
      {/* Left Pine Garland Swag Banner */}
      <div className="hidden md:flex flex-1 items-center justify-end overflow-hidden max-w-[420px] lg:max-w-[540px] h-12 pr-1 opacity-90">
        <svg
          viewBox="0 0 450 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full preserve-3d"
        >
          {/* Swag curved pine branches */}
          <path
            d="M0 12 C100 36, 250 36, 450 16"
            stroke="#064e3b"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="12 4"
          />
          <path
            d="M0 12 C100 36, 250 36, 450 16"
            stroke="#15803d"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="8 3"
          />
          <path
            d="M0 12 C100 36, 250 36, 450 16"
            stroke="#4ade80"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 6"
            opacity="0.85"
          />
          {/* Pine needles clusters */}
          <g stroke="#22c55e" strokeWidth="2" strokeLinecap="round">
            <path d="M120 28 L114 36 M120 28 L126 38 M120 28 L122 42" />
            <path d="M220 31 L214 39 M220 31 L226 41 M220 31 L222 45" />
            <path d="M330 27 L324 35 M330 27 L336 37 M330 27 L332 41" />
          </g>
          {/* Red Ribbon Swag Wire */}
          <path
            d="M0 14 C120 38, 230 40, 450 18"
            stroke="#dc2626"
            strokeWidth="2.5"
            strokeDasharray="18 14"
            opacity="0.85"
          />
          {/* Holly Berries along the swag */}
          <circle cx="120" cy="30" r="3" fill="#e11d48" />
          <circle cx="124" cy="32" r="2.6" fill="#be123c" />
          <circle cx="220" cy="33" r="3" fill="#e11d48" />
          <circle cx="224" cy="35" r="2.6" fill="#be123c" />
          <circle cx="330" cy="29" r="3" fill="#e11d48" />
          <circle cx="334" cy="31" r="2.6" fill="#be123c" />
          {/* Twinkling fairy lights */}
          <g className="animate-twinkle-1">
            <circle cx="70" cy="22" r="2.2" fill="#fef08a" />
            <circle cx="70" cy="22" r="4.5" fill="#facc15" opacity="0.4" />
          </g>
          <g className="animate-twinkle-2">
            <circle cx="170" cy="31" r="2.2" fill="#fef08a" />
            <circle cx="170" cy="31" r="4.5" fill="#facc15" opacity="0.4" />
          </g>
          <g className="animate-twinkle-3">
            <circle cx="270" cy="30" r="2.2" fill="#fef08a" />
            <circle cx="270" cy="30" r="4.5" fill="#facc15" opacity="0.4" />
          </g>
          <g className="animate-twinkle-1">
            <circle cx="380" cy="22" r="2.2" fill="#fef08a" />
            <circle cx="380" cy="22" r="4.5" fill="#facc15" opacity="0.4" />
          </g>
        </svg>
      </div>

      {/* Central Magnificent Wreath */}
      <div className="relative shrink-0 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
        {/* Soft magical holiday glow behind wreath */}
        <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-r from-red-600/20 via-amber-400/25 to-emerald-500/20 blur-xl"></div>
        <ChristmasWreath className="w-24 h-24 sm:w-28 sm:h-28 relative z-10" />
      </div>

      {/* Right Pine Garland Swag Banner */}
      <div className="hidden md:flex flex-1 items-center justify-start overflow-hidden max-w-[420px] lg:max-w-[540px] h-12 pl-1 opacity-90">
        <svg
          viewBox="0 0 450 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform scale-x-[-1] preserve-3d"
        >
          {/* Swag curved pine branches */}
          <path
            d="M0 12 C100 36, 250 36, 450 16"
            stroke="#064e3b"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="12 4"
          />
          <path
            d="M0 12 C100 36, 250 36, 450 16"
            stroke="#15803d"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="8 3"
          />
          <path
            d="M0 12 C100 36, 250 36, 450 16"
            stroke="#4ade80"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 6"
            opacity="0.85"
          />
          {/* Pine needles clusters */}
          <g stroke="#22c55e" strokeWidth="2" strokeLinecap="round">
            <path d="M120 28 L114 36 M120 28 L126 38 M120 28 L122 42" />
            <path d="M220 31 L214 39 M220 31 L226 41 M220 31 L222 45" />
            <path d="M330 27 L324 35 M330 27 L336 37 M330 27 L332 41" />
          </g>
          {/* Red Ribbon Swag Wire */}
          <path
            d="M0 14 C120 38, 230 40, 450 18"
            stroke="#dc2626"
            strokeWidth="2.5"
            strokeDasharray="18 14"
            opacity="0.85"
          />
          {/* Holly Berries along the swag */}
          <circle cx="120" cy="30" r="3" fill="#e11d48" />
          <circle cx="124" cy="32" r="2.6" fill="#be123c" />
          <circle cx="220" cy="33" r="3" fill="#e11d48" />
          <circle cx="224" cy="35" r="2.6" fill="#be123c" />
          <circle cx="330" cy="29" r="3" fill="#e11d48" />
          <circle cx="334" cy="31" r="2.6" fill="#be123c" />
          {/* Twinkling fairy lights */}
          <g className="animate-twinkle-2">
            <circle cx="70" cy="22" r="2.2" fill="#fef08a" />
            <circle cx="70" cy="22" r="4.5" fill="#facc15" opacity="0.4" />
          </g>
          <g className="animate-twinkle-3">
            <circle cx="170" cy="31" r="2.2" fill="#fef08a" />
            <circle cx="170" cy="31" r="4.5" fill="#facc15" opacity="0.4" />
          </g>
          <g className="animate-twinkle-1">
            <circle cx="270" cy="30" r="2.2" fill="#fef08a" />
            <circle cx="270" cy="30" r="4.5" fill="#facc15" opacity="0.4" />
          </g>
          <g className="animate-twinkle-2">
            <circle cx="380" cy="22" r="2.2" fill="#fef08a" />
            <circle cx="380" cy="22" r="4.5" fill="#facc15" opacity="0.4" />
          </g>
        </svg>
      </div>
    </div>
  );
};
