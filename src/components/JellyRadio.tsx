import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import './JellyRadio.css';

export type JellyRadioItem = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

type JellyRadioProps = {
  items: JellyRadioItem[];
  value: string;
  onChange: (value: string, index: number) => void;
  ariaLabel: string;
  className?: string;
};

export function JellyRadio({ items, value, onChange, ariaLabel, className = '' }: JellyRadioProps) {
  const activeIndex = Math.max(0, items.findIndex((item) => item.value === value));
  const activeLabel = items[activeIndex]?.label;
  const approximateActiveWidth = typeof activeLabel === 'string' ? activeLabel.length * 7 + 30 : 64;
  const push = Math.min(10, Math.max(4, approximateActiveWidth * 0.07));

  const select = (index: number) => {
    const item = items[index];
    if (!item || item.disabled || index === activeIndex) return;
    onChange(item.value, index);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const enabled = items.map((item, itemIndex) => ({ item, itemIndex })).filter(({ item }) => !item.disabled);
    if (enabled.length === 0) return;
    const position = enabled.findIndex(({ itemIndex }) => itemIndex === index);
    let nextPosition = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextPosition = (position + 1) % enabled.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextPosition = (position - 1 + enabled.length) % enabled.length;
    if (event.key === 'Home') nextPosition = 0;
    if (event.key === 'End') nextPosition = enabled.length - 1;
    if (nextPosition < 0) return;
    event.preventDefault();
    const next = enabled[nextPosition].itemIndex;
    select(next);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('.jelly-radio__chip')[next]?.focus();
  };

  return (
    <div role="radiogroup" aria-label={ariaLabel} className={`jelly-radio ${className}`}>
      {items.map((item, index) => {
        const selected = index === activeIndex;
        const style = {
          '--jr-shift': `${index < activeIndex ? -push : index > activeIndex ? push : 0}px`,
          '--jr-scale': selected ? '1.07' : '0.99',
        } as CSSProperties;
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            disabled={item.disabled}
            className="jelly-radio__chip"
            data-on={selected}
            style={style}
            onClick={() => select(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <span className="jelly-radio__skin">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
