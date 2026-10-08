# AKSHAY — Creative Developer

Personal portfolio for Akshay — Swiss/International typographic style meets modern
motion design. Off-white paper ground, ink-black Archivo display type, one electric
orange-red accent, and GSAP-driven scroll choreography.

**Live:** https://akshay-th.github.io/akshay-folio/

## Highlights

- Preloader with 000→100 counter and clip-path wipe
- Hero with staggered, masked word-by-word reveal
- Custom cursor (accent dot + trailing ring that scales on hoverables) and magnetic nav/CTA
- Skills marquee strip
- Horizontal-scroll work gallery (GSAP ScrollTrigger pin + scrub) — a "gallery of
  worlds": each card is a mini homage to a real live site (its own palette, font,
  and a pure-CSS motif), and on hover reveals a live scaled-down iframe miniature
  of the actual site (lazy-created, desktop only)

## Showcased sites (all real, all live)

| # | Project | Live | Identity |
|---|---------|------|----------|
| 01 | **Lumina** | https://akshay-th.github.io/lumina/ | Cinematic smart-light scrollytelling — Three.js, glowing orb, Instrument Serif |
| 02 | **Orbital** | https://akshay-th.github.io/orbital/ | Space-tourism scroll voyage — WebGL, cyan HUD, Space Mono |
| 03 | **Atelier Noir** | https://akshay-th.github.io/atelier-noir/ | Brutalist kinetic-typography studio — Anton, black/bone |
| 04 | **Essenza** | https://akshay-th.github.io/essenza/ | Color-shifting perfume narrative — Cormorant Garamond, four color worlds |
| 05 | **This site** | https://github.com/akshay-th/akshay-folio | The portfolio itself — Swiss grid, one accent, no images |
- Line-by-line about reveal, giant "LET'S TALK" footer link with accent fill on hover
- Live local-time readout + time-based greeting, SVG grain overlay
- Lenis smooth scroll; full `prefers-reduced-motion` support; cursor and horizontal
  scroll degrade gracefully on touch/mobile (tested down to 360px)

## Stack

Static HTML/CSS/JS — no build tools, no npm. Libraries via CDN only:
[GSAP + ScrollTrigger](https://cdnjs.com/libraries/gsap) (cdnjs) and
[Lenis](https://lenis.darkroom.engineering/) (jsDelivr). Fonts: Archivo &
Space Grotesk via Google Fonts.

```
index.html
css/style.css
js/main.js
DESIGN.md   ← full design spec (palette, type scale, animation spec)
```

Run locally: `python3 -m http.server 4173` and open http://localhost:4173/.
