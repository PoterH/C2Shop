import React from 'react';

interface AnimatedPriceProps {
  value: number;
  formatted: string;
  className?: string;
  announce?: boolean;
}

export const AnimatedPrice: React.FC<AnimatedPriceProps> = ({
  formatted,
  className,
  announce = false,
}) => {
  return (
    <span
      className={`t-subtle-number${className ? ` ${className}` : ''}`}
      aria-live={announce ? 'polite' : undefined}
      aria-atomic={announce ? true : undefined}
    >
      {formatted}
    </span>
  );
};
