import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface AnimatedPriceProps {
  value: number;
  formatted: string;
  className?: string;
  announce?: boolean;
}

interface PriceSnapshot {
  value: number;
  formatted: string;
}

const DIGIT = /^\d$/;
const ANIMATION_DURATION_MS = 455;

function digitsOf(value: string) {
  return Array.from(value).filter((character) => DIGIT.test(character));
}

function hasChangedDigits(previous: string, next: string) {
  const oldDigits = digitsOf(previous);
  const newDigits = digitsOf(next);
  const sharedDigits = Math.min(oldDigits.length, newDigits.length);

  for (let offset = 1; offset <= sharedDigits; offset += 1) {
    if (oldDigits[oldDigits.length - offset] !== newDigits[newDigits.length - offset]) return true;
  }

  return false;
}

export const AnimatedPrice: React.FC<AnimatedPriceProps> = ({
  value,
  formatted,
  className,
  announce = false,
}) => {
  const latestPrice = useRef<PriceSnapshot>({ value, formatted });
  const [previousPrice, setPreviousPrice] = useState<PriceSnapshot | null>(null);

  useLayoutEffect(() => {
    const previous = latestPrice.current;
    latestPrice.current = { value, formatted };

    if (previous.formatted === formatted) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPreviousPrice(!reducedMotion && hasChangedDigits(previous.formatted, formatted) ? previous : null);
  }, [formatted, value]);

  useEffect(() => {
    if (!previousPrice) return;
    const timeout = window.setTimeout(() => setPreviousPrice(null), ANIMATION_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [previousPrice]);

  const oldDigits = previousPrice ? digitsOf(previousPrice.formatted) : [];
  const newDigits = digitsOf(formatted);
  let digitIndex = 0;
  const direction = previousPrice && value < previousPrice.value ? -1 : 1;

  const characters = Array.from(formatted).map((character, index) => {
    if (!DIGIT.test(character)) {
      return <span className="t-subtle-char" key={`${formatted}-${index}`}>{character}</span>;
    }

    const positionFromRight = newDigits.length - digitIndex - 1;
    const oldCharacter = oldDigits[oldDigits.length - positionFromRight - 1];
    digitIndex += 1;

    if (previousPrice && oldCharacter && oldCharacter !== character) {
      return (
        <span className="t-subtle-slot" key={`${formatted}-${index}`}>
          <span className="t-subtle-old" aria-hidden="true">{oldCharacter}</span>
          <span className="t-subtle-new">{character}</span>
        </span>
      );
    }

    return <span className="t-subtle-char" key={`${formatted}-${index}`}>{character}</span>;
  });

  return (
    <span
      className={`t-subtle-number${previousPrice ? ' is-animating' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--t-subtle-direction': direction } as React.CSSProperties}
      aria-live={announce ? 'polite' : undefined}
      aria-atomic={announce ? true : undefined}
    >
      {characters}
    </span>
  );
};
