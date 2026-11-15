# Skeleton loader and reveal

## When to use

A placeholder that loads then reveals real content — list rows, cards, profile headers. The skeleton pulses, then both layers cross-fade with a matching cross-blur. Bring your own bars / avatar / text; the skeleton stays in the same slot as the content so the swap is layout-free.

## HTML usage

```html
<div class="t-skel" data-state="loading">
  <div class="t-skel-skeleton is-pulsing">…</div>
  <div class="t-skel-content">…</div>
</div>
```

State:
  - Mount with `.is-pulsing` on the skeleton so it pulses `--pulse-count` times.
  - When data arrives, add `.is-revealed` to `.t-skel` — the skeleton fades out + blurs and the content fades in + un-blurs over `--reveal-dur`.
  - To replay the loading state without animating the reverse: add `.is-resetting` to `.t-skel`, remove `.is-revealed`, force a reflow, then drop `.is-resetting`.

## Tunable variables

| Variable | Default | Notes |
| --- | --- | --- |
| `--pulse-dur` | `1000ms` | sourced from `--p14-pulse-dur` |
| `--pulse-count` | `1` | sourced from `--p14-pulse-count` |
| `--pulse-min` | `0.5` | sourced from `--p14-pulse-min` |
| `--reveal-dur` | `400ms` | sourced from `--p14-reveal-dur` |
| `--reveal-blur` | `2px` | sourced from `--p14-reveal-blur` |
| `--reveal-ease` | `ease-in-out` | sourced from `--p14-reveal-ease` |

```css
:root {
  --pulse-dur: 1000ms;
  --pulse-count: 1;
  --pulse-min: 0.5;
  --reveal-dur: 400ms;
  --reveal-blur: 2px;
  --reveal-ease: ease-in-out;
}
```
