---
name: avatar-group-hover
title: Avatar group hover
category: micro-interaction
source: https://transitions.dev/detail.html?t=avatar-group-hover
---

# Avatar group hover (`avatar-group-hover`)

Stacked avatar strip where hovering an avatar lifts it by `--avatar-lift` (`-4px`) and scales it to `--avatar-scale` (`1.05`), while neighboring avatars lift with exponential distance falloff (`lift * Math.pow(falloff, distance)`). Leaving the group restores all avatars with the springy `--avatar-ease-out` curve.

## CSS Tokens & Rules

```css
:root {
  --avatar-lift: -4px;
  --avatar-dur: 320ms;
  --avatar-scale: 1.05;
  --avatar-falloff: 0.45;
  --avatar-ease-in: cubic-bezier(0.22, 1, 0.36, 1);
  --avatar-ease-out: cubic-bezier(0.34, 3.85, 0.64, 1);
}

.t-avatar {
  transform-origin: center;
  transform:
    translateY(var(--shift, 0px))
    scale(var(--scale-active, 1));
  transition: transform var(--avatar-dur) var(--avatar-ease-in);
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .t-avatar {
    transition: none !important;
    transform: none !important;
  }
}
```
