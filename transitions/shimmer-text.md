# Shimmer text

## When to use

Masked gradient sweep across inline text — status captions, thinking indicators, preview labels. Pure CSS, no JavaScript or state toggling. Tune `--shimmer-base` and `--shimmer-highlight` so contrast stays legible against your surface.

## HTML / React usage

```html
<span class="t-shimmer" data-text="Planning next moves">
  Planning next moves
</span>
```

```tsx
export function Shimmer({ children }: { children: string }) {
  return (
    <span className="t-shimmer" data-text={children}>
      {children}
    </span>
  );
}
```

## Tunable variables

| Variable | Default | Notes |
| --- | --- | --- |
| `--shimmer-dur` | `2000ms` | Sweep cycle duration |
| `--shimmer-base` | `#7c7c7c` | Resting text color |
| `--shimmer-highlight` | `#0d0d0d` | Sweep highlight color |
| `--shimmer-band` | `400%` | Gradient band width |
| `--shimmer-ease` | `linear` | Sweep timing curve |

```css
:root {
  --shimmer-dur: 2000ms;
  --shimmer-base: #7c7c7c;
  --shimmer-highlight: #0d0d0d;
  --shimmer-band: 400%;
  --shimmer-ease: linear;
}

.t-shimmer {
  position: relative;
  display: inline-block;
  color: var(--shimmer-base);
}
.t-shimmer::before {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    transparent 40%,
    var(--shimmer-highlight) 50%,
    transparent 60%,
    transparent 100%
  );
  background-size: var(--shimmer-band) 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: t-shimmer var(--shimmer-dur) var(--shimmer-ease) infinite;
}
@keyframes t-shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: 0% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .t-shimmer::before { animation: none !important; }
}
```
