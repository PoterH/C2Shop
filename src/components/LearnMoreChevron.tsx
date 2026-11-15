import React from 'react';

interface LearnMoreChevronProps {
  className?: string;
  size?: number;
}

export const LearnMoreChevron: React.FC<LearnMoreChevronProps> = ({
  className = 'ml-1.5',
  size = 16,
}) => (
  <span className={`t-learn-chevron inline-flex shrink-0 ${className}`} aria-hidden="true">
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        className="t-learn-arm t-learn-arm-top"
        d="M6 4L10 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="t-learn-arm t-learn-arm-bot"
        d="M10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);
