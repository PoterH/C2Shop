# Banner stacking

Source: https://transitions.dev/detail.html?t=banner-stacking

## When to use

Sonner-style stack of banners. A new banner enters at depth 0 (rise + scale + cross-blur), older ones step back one depth (peek up, scale down, fade). A fourth banner gets `.is-leaving` and is removed after `--stack-close`.

## Usage

```html
<div class="t-stack">
  <div class="t-stack-banner" data-depth="0">…</div>
</div>
```

- Append a new banner with `.is-enter` + `data-depth="0"`, bump every older banner's `data-depth` by one, force one reflow, then remove `.is-enter` in the same task (no rAF hop).
- The banner past depth 2 gets `.is-leaving`; remove it after `--stack-close`.
- Optional hover spread: add `.is-spread` to `.t-stack`.

In this project: `src/components/HeroBenefitsStack.tsx` auto-advances the three store benefits under the hero search (CSS in `src/index.css`).

## Tokens

| Variable | Default |
| --- | --- |
| `--stack-open` | `350ms` |
| `--stack-close` | `250ms` |
| `--stack-rise` | `80px` |
| `--stack-blur` | `2px` |
| `--stack-scale` | `0.97` |
| `--stack-peek` | `12px` |
| `--stack-spread-gap` | `8px` |
| `--stack-depth-scale` | `0.06` |
| `--stack-depth-fade` | `0.4` |
| `--stack-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` |

Reduced motion: `.t-stack-banner { transition: none; transform: none; filter: none; }`.
