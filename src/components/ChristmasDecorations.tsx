import React, { useMemo } from 'react';

/**
 * ============================================================================
 * 1. SANTA HAT (Gorro de Papai Noel de Foto Real para a Logo C2Tech)
 * ============================================================================
 * Gorro de Papai Noel fotorrealista em veludo vermelho macio com dobra natural,
 * borda de pelúcia branca e pompom fofo com transparência perfeita.
 */
export const SantaHat: React.FC<{ className?: string }> = ({
  className = 'w-8 h-auto',
}) => {
  return (
    <img
      src="/images/santa-hat.png"
      alt="Gorro de Natal"
      className={`shrink-0 pointer-events-none select-none drop-shadow-md ${className}`}
      aria-hidden="true"
    />
  );
};

/**
 * ============================================================================
 * 2. SNOW EFFECT (Efeito de Flocos de Neve Caindo no Hero)
 * ============================================================================
 * Flocos de neve elegantes, leves e de alto desempenho (60 FPS) que flutuam
 * continuamente sobre o fundo escuro do hero da página.
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
  isCrystal: boolean;
}

export const SnowEffect: React.FC = () => {
  const snowflakes = useMemo<SnowflakeConfig[]>(() => {
    const flakes: SnowflakeConfig[] = [];
    const count = 42;
    
    let seed = 12345;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < count; i++) {
      const isCrystal = i % 7 === 0;
      const size = isCrystal ? 10 + rnd() * 6 : 2.5 + rnd() * 4.5;
      const duration = 6 + rnd() * 7;
      const delay = -(rnd() * duration);
      const driftStart = -15 + rnd() * 30;
      const driftEnd = driftStart + (-25 + rnd() * 50);
      const opacity = 0.35 + rnd() * 0.55;

      flakes.push({
        id: i,
        left: (i / count) * 100 + (-2 + rnd() * 4),
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
              <polyline points="9 4 12 7 15 4" />
              <polyline points="9 20 12 17 15 20" />
              <polyline points="5 10 8 10 9 7" />
              <polyline points="19 14 16 14 15 17" />
              <polyline points="5 14 8 14 9 17" />
              <polyline points="19 10 16 10 15 7" />
            </svg>
          ) : (
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
 * 3. CHRISTMAS WREATH (Guirlanda Natalina de Foto Real)
 * ============================================================================
 * Imagem fotográfica de alta resolução de uma guirlanda de Natal circular,
 * com ramos de pinheiro natural, laço de cetim vermelho brilhante, bolas
 * natalinas douradas e vermelhas, azevinhos e luzes quentes.
 */
export const ChristmasWreath: React.FC<{ className?: string }> = ({
  className = 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36',
}) => {
  return (
    <img
      src="/images/christmas-wreath.png"
      alt="Guirlanda de Natal"
      className={`object-contain pointer-events-none select-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.65)] ${className}`}
      aria-hidden="true"
    />
  );
};

/**
 * ============================================================================
 * 4. FOOTER GARLAND LINE (Guirlanda Natalina Sobre a Linha do Footer)
 * ============================================================================
 * Repousa exatamente centralizada sobre a linha superior divisória do footer,
 * apenas com a belíssima guirlanda de foto real e um suave brilho aconchegante,
 * sem linhas ou festões artificiais.
 */
export const FooterGarlandLine: React.FC = () => {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none flex items-center justify-center">
      {/* Brilho quente suave e aconchegante atrás da guirlanda */}
      <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-red-600/25 via-amber-400/30 to-emerald-500/25 blur-2xl pointer-events-none"></div>

      {/* Guirlanda de Foto Real Central */}
      <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
        <ChristmasWreath className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" />
      </div>
    </div>
  );
};
