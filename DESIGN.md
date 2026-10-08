# AKSHAY — Creative Developer · Design File

Swiss/International typographic style × modern motion design. A portfolio that feels
like a printed specimen sheet that learned to move.

---

## 1. Concept

A single-page portfolio for "AKSHAY — Creative Developer". The visual language is
borrowed from Swiss/International style: an off-white paper ground, ink-black grotesk
type set huge and tight, visible hairline rules that expose the grid, generous
negative space, and exactly one loud accent color used like a rubber stamp.
Motion is the second voice: masked word reveals, a pinned horizontal work gallery,
a magnetic cursor system, and a marquee — all tuned to feel mechanical and precise,
never bouncy.

Mantra: **"Print rigor, screen motion."**

## 2. Palette

| Token        | Hex                  | Use                                        |
|--------------|----------------------|--------------------------------------------|
| `--paper`    | `#F4F2EE`            | Page background                            |
| `--ink`      | `#141412`            | Primary text, rules at low alpha, footer bg |
| `--accent`   | `#FF4D00`            | THE accent: counters, hovers, fills, marks |
| `--muted`    | `#6F6B64`            | Secondary text, labels, meta               |
| `--line`     | `rgba(20,20,18,.14)` | Hairline rules / baseline grid             |
| `--paper-2`  | `#ECE9E3`            | Card wells, subtle panels                  |

One accent only. No gradients in UI chrome — gradients live exclusively inside the
project-card thumbnails, where they read as "artwork".

## 3. Typography

- **Display:** `Archivo` (Google Fonts), weight 800–900, tight tracking (−0.03em),
  uppercase for hero/footer/section titles.
- **Body/mono-ish meta:** `Space Grotesk` 400/500 for paragraphs, labels, nav.
  Labels are uppercase, 11–12px, letter-spacing +0.14em.
- **Guest fonts (work-gallery homages only):** `Instrument Serif` italic (Lumina),
  `Space Mono` (Orbital HUD + card metadata), `Anton` (Atelier Noir),
  `Cormorant Garamond` italic (Essenza). They never leak outside their card.

Type scale (fluid, clamp-based):

| Role            | Size                              |
|-----------------|-----------------------------------|
| Hero display    | `clamp(3.2rem, 12.5vw, 11rem)` / 0.92 line-height |
| Footer "LET'S TALK" | `clamp(3rem, 13vw, 12rem)`     |
| Section title   | `clamp(2rem, 5vw, 4.5rem)`        |
| Card title      | `clamp(1.4rem, 2.2vw, 2rem)`      |
| About lead      | `clamp(1.3rem, 2.6vw, 2.4rem)`    |
| Body            | `clamp(1rem, 1.1vw, 1.125rem)`    |
| Label / meta    | `0.6875rem`, ls `.14em`, uppercase |

## 4. Grid & rules

- Content container: `max-width: 1440px`, side padding `clamp(20px, 4vw, 64px)`.
- 12-col mental grid; section headers use a 2-col split (index number left, title right).
- **Visible structure:** every section opens with a 1px top rule (`--line`);
  the hero carries faint vertical rules at 25/50/75% (desktop only) to expose the grid.
- Section index numbers (`01`–`05` style, mono-spaced feel) sit in the accent color.

## 5. Section storyboard

1. **Preloader** — ink-black full-screen panel. Counter `000 → 100` in huge Archivo,
   bottom-left, plus the word-mark "AKSHAY©". At 100 the panel wipes upward
   (clip-path) revealing the hero mid-animation.
2. **Header (fixed)** — hairline-ruled bar: "AKSHAY©" left; nav (Work / About / Contact)
   center-right; live **local time** (`HH:MM:SS IST` style, updates 1s) far right.
   Mix-blend-friendly, backdrop blur on scroll.
3. **Hero** — four stacked masked lines: `AKSHAY / BUILDS / EXPRESSIVE / WEB EXPERIENCES®`.
   "EXPRESSIVE" set in accent. Under it a meta row: availability dot + "Open for work",
   location, scroll hint arrow. Time-based greeting ("Good evening —") as eyebrow line.
4. **Marquee** — full-bleed strip between two rules; skills separated by accent ✦
   glyphs, translating left forever (CSS animation, duplicated track). Second
   row optional reversed. Pauses for reduced-motion.
5. **Work (horizontal) — "a gallery of worlds"** — section pinned; vertical scroll
   scrubs a horizontal track of **5 cards**: the **4 real, live sites** plus a meta
   card for this portfolio itself. Each real card is a **mini homage** to its site's
   identity — its own palette, its own Google Font, and a signature motif rendered in
   pure CSS (no images) — so scrubbing the shelf feels like flipping through four
   different websites inside the Swiss grid. Giant outlined index numbers `01`–`05`
   stay. Whole card = link, new tab, `rel="noopener"`. Desktop: pin+scrub.
   ≤768px: plain vertical stack, no pinning, no previews.

   | # | Project | URL | Homage identity | Motif (pure CSS/SVG) | Tag |
   |---|---------|-----|-----------------|----------------------|-----|
   | 01 | **LUMINA** | `…/lumina/` | near-black `#050507`, warm amber glow, Instrument Serif italic + Inter | radial glowing orb (amber→transparent, layered glow shadows) | Three.js · Scrollytelling |
   | 02 | **ORBITAL** | `…/orbital/` | deep space `#030613`, electric cyan `#35E6FF`, Space Grotesk + Space Mono | starfield (repeating radial-gradient dot fields) + HUD readout `ALT 400KM`, corner brackets | WebGL · Scroll Journey |
   | 03 | **ATELIER NOIR** | `…/atelier-noir/` | `#0A0A0A` black / `#EDEAE4` bone, Anton display, mono metadata | huge cropped "NOIR" letterforms overflowing the frame | Kinetic Type · GSAP |
   | 04 | **ESSENZA** | `…/essenza/` | cream `#F6F1E7` → citrus `#E8A33D` → mauve `#B07A8C` → dark amber `#2E1B10`, Cormorant Garamond italic | the 4-stop color-world gradient + italic serif word-mark | Scrollytelling · Canvas |
   | 05 | **THIS SITE** | repo on GitHub | the portfolio's own paper + `#FF4D00` | accent panel, "You're looking at it." wink | Swiss Type · GSAP · Lenis |

   **Live-preview interaction (signature):** on hover — desktop fine pointers only,
   never on touch or `prefers-reduced-motion` — the card's thumb reveals a **live
   miniature of the real site**: an `<iframe>` of the live URL at 1280px virtual
   width, scaled with `transform: scale(thumbWidth/1280)` (origin top-left) to fit
   the 4:3 thumb, `pointer-events: none` (wheel keeps hitting the page, so Lenis +
   the pinned ScrollTrigger never stall), `loading="lazy"`, `aria-hidden`,
   `tabindex="-1"`. Iframes are **created lazily on first hover** (never upfront —
   these are four WebGL-heavy pages), kept alive after creation, fade in at 0.35s
   once mounted, and are re-scaled on resize. A small accent "LIVE" badge appears
   with the preview. Card 05 has no preview (it would recurse). Fallback everywhere
   else: the styled motif card alone.
6. **About** — big lead paragraph revealed **line-by-line** (masked line spans slide up,
   staggered, scrubbed-adjacent trigger). Right column: numbered capability list +
   stat row (years / projects / coffee). Portrait replaced by an abstract accent
   mark (keeps "no external images" rule).
7. **Footer (ink panel)** — inverted: ink background, paper text. Giant "LET'S TALK"
   link → `https://github.com/akshay-th`; on hover the text **fills with accent**
   left→right (background-clip trick) and the arrow glyph translates. Below: columns
   of links (GitHub, email, socials), local time again, "© 2026 Akshay. Set in Archivo."

## 6. Animation spec

Global easing: `power4.out` for entrances, `power2.inOut` for wipes, `none` for scrubs.

| Moment               | Trigger                   | Motion                                                        | Duration / ease |
|----------------------|---------------------------|---------------------------------------------------------------|-----------------|
| Preloader counter    | page load                 | integer tween 0→100, slight random stepping                   | ~1.4s           |
| Preloader exit       | counter = 100             | panel `clip-path` wipe to top                                 | 0.9s `power3.inOut` |
| Hero words           | preloader exit −0.4s      | each line `yPercent: 110 → 0` inside `overflow:hidden` mask   | 1.1s, stagger 0.09, `power4.out` |
| Hero meta row        | after words               | fade + y 24→0                                                 | 0.8s            |
| Header               | after words               | fade down                                                     | 0.6s            |
| Marquee              | always                    | CSS `translateX(0→−50%)` loop, 28s linear                     | infinite        |
| Work pin             | section top hits top      | `x: 0 → −(track − viewport)`, `scrub: 1`, pin                 | scrub           |
| Card inner parallax  | within pin                | thumbnail inner `x` counter-drift ±6%                          | scrub           |
| Card live preview    | hover (fine pointer only) | lazy-create scaled iframe of live site, fade in + "LIVE" badge | 0.35s ease CSS  |
| About lines          | line enters 85% viewport  | masked line `yPercent: 110 → 0`, stagger 0.08                 | 0.9s `power4.out` |
| Section headers      | enter 85%                 | rule `scaleX 0→1` (origin left) + title rise                  | 0.8s            |
| Footer giant link    | hover                     | accent fill sweeps via `background-size` on clipped text; arrow x+12px | 0.5s `power3.out` CSS |
| Magnetic elements    | pointermove within bounds | translate toward cursor ×0.35 (text ×0.55), lerp back on leave| rAF lerp 0.18   |

**Scroll:** Lenis smooth scroll (duration 1.1, ease out-expo-ish default) driven by
`gsap.ticker`; `ScrollTrigger.update` on Lenis scroll. Anchor nav uses `lenis.scrollTo`.

**Reduced motion (`prefers-reduced-motion: reduce`):** preloader skipped instantly,
Lenis disabled (native scroll), all reveals set to final state, marquee paused,
horizontal section falls back to vertical stack, cursor hidden.

## 7. Cursor & interaction spec

- **Custom cursor:** 8px accent dot (snappy lerp 0.55) + 36px 1px-ink ring
  (lazy lerp 0.16). On elements with `[data-hover]`: ring scales ×1.8 and fills
  accent @ 12% alpha; on `[data-hover="text"]` ring scales ×2.6. `mix-blend-mode`
  kept off (paper bg) — contrast handled by color swap on ink footer (`.is-inverted`:
  ring goes paper-colored).
- Disabled entirely on touch / `(hover: none)` / coarse pointers → native cursor.
  Native cursor hidden only when custom cursor is active.
- **Magnetic:** nav links, header word-mark, footer giant link, card "visit" chips.
  Strength 0.35 container / 0.55 label (label moves more = depth).
- **Grain:** full-viewport fixed overlay, inline-SVG `feTurbulence` tile as
  background-image, `opacity .5`, 128px tile, `pointer-events:none`, above everything
  (z-index 200, below cursor at 300).

## 8. Tech constraints

- Static: `index.html`, `css/style.css`, `js/main.js`. Relative paths only
  (served from `/akshay-folio/` subpath).
- CDN only: GSAP 3.12.5 + ScrollTrigger (cdnjs), Lenis 1.1.x (jsDelivr),
  Google Fonts (Archivo + Space Grotesk). No build step, no npm, no images.
- Favicon: inline SVG data URI (accent square, ink "A").
- SEO/social: `<title>`, meta description, Open Graph + Twitter card tags.
- Responsive to 360px. No console errors; every third-party global guarded.
