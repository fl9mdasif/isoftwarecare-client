# Design System: Interactive Software Care (client)

Source of truth for the visual design is `A:/Daily dev lab/it-agency/home.html`. Every page in this app must look like it belongs to that file. When this document and that file disagree, the file wins; update this document to match.

## 1. Direction

Dark, technical, calm. A near-black canvas with two brand accents (violet and acid teal), soft ambient light blobs, film grain, thin 1px borders and glassy panels. Motion is present but restrained: no pinned sections, everything is reveal-on-scroll or scrubbed.

Tone of copy: plain, specific, accountable. No hype words ("revolutionary", "cutting-edge"). Say what gets built and how.

## 2. Tokens

All tokens live as CSS custom properties on `:root` in `app/globals.css`. Never hard-code a color or radius in a component; use a token.

**Two themes.** `:root` holds the dark values; `:root[data-theme="light"]` overrides them. Nothing else in the stylesheet may contain a raw colour, because a literal cannot follow the theme. The only permitted exceptions are:

- mask-image colours (`#000`) — alpha only, the hue is never rendered
- the `.w1` / `.w2` / `.w3` brand gradients, which act as artwork in both themes
- white marks sitting on those gradients

Accent-derived tints use `color-mix(in srgb, var(--acid) N%, transparent)` rather than a baked `rgba()`, so a glow tracks the theme's accent.

### Theme-specific tokens

| Token | Purpose |
|---|---|
| `--on-accent` | Text on an accent fill. Near-black in dark, white in light — not the same as `--bg` |
| `--glass-top` / `--glass-bot` / `--glass-top-strong` | Card sheen. A white sheen in dark; a near-white card in light |
| `--shadow-card` | `none` in dark, a soft shadow in light. Light themes convey elevation with shadow, not sheen |
| `--shadow-pop` | Floating elements (toasts) |
| `--sheen`, `--tint-1..4` | Subtle surface fills |
| `--grid-line`, `--dot-pattern` | Decorative patterns |
| `--header-bg`, `--panel-bg`, `--overlay-bg` | Translucent chrome |
| `--scrim`, `--scrim-soft`, `--img-veil`, `--img-veil-border` | Overlays on photography — these stay dark in **both** themes |
| `--blob-a/b/c`, `--blob-opacity` | Aurora blobs, heavily reduced in light |
| `--grain-opacity`, `--grain-blend` | Film grain: `overlay` in dark, `multiply` at low opacity in light |
| `--grad-3` | Third stop of the `.grad` text gradient |

### Light theme is not an inversion

Two things genuinely change rather than flip:

1. **Accent contrast.** `--acid: #2ee6c5` is roughly 1.6:1 on white — unusable for text. Light uses `#047762`, which clears 4.5:1 while reading as the same hue. `--violet` darkens to `#5341e0` for the same reason.
2. **Elevation.** A white sheen over a light surface is invisible, so light swaps the glass gradient for a near-white card plus `--shadow-card`.

### Runtime

`components/theme/ThemeScript.tsx` is a blocking inline script in `<head>`: it reads `localStorage.theme`, falls back to `prefers-color-scheme`, and sets `data-theme` on `<html>` **before first paint**. Doing this in an effect would flash the dark default on every navigation for a light-theme visitor. `<html>` therefore carries `suppressHydrationWarning`.

`ThemeToggle` writes the choice to `localStorage` and flips the attribute. While no explicit choice is stored, the OS preference is followed live. `useTheme()` observes the attribute for anything that needs to react in JS — currently the Cal.com embeds, which would otherwise stay pinned to dark on a light page.

### Surfaces (dark / light)

| Token | Dark | Light | Use |
|---|---|---|---|
| `--bg` | `#06070A` | `#F4F6FB` | Page background |
| `--surface` | `#0D0F15` | Cards, alternate section background |
| `--surface-2` | `#12151D` | Inputs, nested panels |
| `--border` | `rgba(255,255,255,.085)` | Default 1px border |
| `--border-strong` | `rgba(255,255,255,.16)` | Hover border, ghost button |

### Text

| Token | Value | Use |
|---|---|---|
| `--text` | `#F4F6FA` | Headings, primary text |
| `--text-mid` | `#B4BCCB` | Body copy, descriptions |
| `--text-dim` | `#8590A2` | Meta, labels, captions |

### Brand

| Token | Value | Use |
|---|---|---|
| `--violet` | `#6C5CFF` | Secondary accent, gradients, glows |
| `--violet-dim` | `rgba(108,92,255,.14)` | Violet tint backgrounds |
| `--acid` | `#2EE6C5` | Primary accent: CTAs, eyebrows, focus ring, active state |
| `--acid-dim` | `rgba(46,230,197,.12)` | Acid tint backgrounds |

Gradient text (`.grad`): `linear-gradient(100deg, var(--acid) 0%, var(--violet) 55%, #A99BFF 100%)`. Use for at most one phrase per heading.

### Type

| Token | Family | Use |
|---|---|---|
| `--display` | Space Grotesk 500/600/700 | h1–h4, big numbers, brand |
| `--body` | Inter 400/500/600 | Body, buttons, nav |
| `--mono` | JetBrains Mono 400/500 | Eyebrows, tags, meta, labels, stat captions |

Headings: `line-height: 1.05`, `letter-spacing: -.03em`, weight 700.

| Element | Size |
|---|---|
| Hero h1 | `clamp(2.5rem, 6.2vw, 4.7rem)`, `letter-spacing: -.04em`, `line-height: 1` |
| Section h2 | `clamp(1.9rem, 4.4vw, 3.1rem)` |
| Card h3 | `1.05rem`–`1.3rem`, weight 600 |
| Body | `1rem`, `line-height: 1.6` |
| Lead paragraph | `1.03rem`–`1.08rem`, `--text-mid`, max `56ch` |
| Mono labels | `.66rem`–`.8rem`, uppercase, `letter-spacing: .06em`–`.16em` |

Fonts load through `next/font/google` (self-hosted at build time, no layout shift).

### Space and shape

| Token | Value |
|---|---|
| `--sp-1` … `--sp-7` | `8, 16, 24, 32, 48, 64, 96` px |
| `--radius` | `14px` (cards, inputs) |
| `--radius-lg` | `22px` (large cards, panels) |
| Pill | `999px` (buttons, chips, tags) |
| CTA block | `28px` |

Container: `.wrap` max-width `1240px`, side padding `24px` (`16px` under 600px).
Section rhythm: `.section` padding `96px 0` (`64px` under 700px).

## 3. Ambient layer

Rendered once in the root layout, behind everything:

- `.aurora` with three blurred radial blobs (violet top-right, acid mid-left, violet bottom-right). Blobs parallax slowly on scroll.
- `.grain`: fixed SVG fractal-noise overlay, `opacity .38`, `mix-blend-mode: overlay`, `pointer-events: none`.

Content (`header`, `main`, `footer`) sits at `z-index: 1` above the aurora.

## 4. Components

| Component | Spec |
|---|---|
| Eyebrow | Mono, uppercase, acid, preceded by a 22px acid hairline. One per section head. |
| Button solid | Acid background, `#06070A` text, pill, lifts `-2px` on hover. Primary action only, max one per block. |
| Button ghost | Transparent, `--border-strong` border; border and text turn acid on hover. |
| Button small | `.btn-sm`: `10px 20px`, `.87rem`. Header CTA. |
| Section head | Eyebrow, h2, optional lead paragraph. Max width `660px`, bottom margin `64px`. |
| Service card | Gradient glass card, 1px border, number top-right in mono, icon tile, title, text. Pointer spotlight (violet radial following cursor). Lifts `-5px` on hover. The first card spans 2 columns. |
| Work card | `--surface` card, `--radius-lg`. Top visual 190px: Cloudinary thumbnail with a grid overlay, or a brand gradient fallback (`w1`/`w2`/`w3`). Mono tag pill bottom-left. Body: title, description, tech-stack chips. |
| Chip | Mono pill, 1px border. `.on` variant uses acid border, text and tint. |
| Stats band | Gradient violet→acid tint panel, 4 columns (2 on mobile), acid display numbers with count-up animation. |
| Testimonial | `--surface` card, violet quote icon, quote text, author row with avatar (Cloudinary photo or gradient circle). Star rating in acid. |
| CTA block | Large rounded panel, violet→acid tint, dotted radial pattern, centered heading, two buttons, contact row in mono. |
| Process spine | Vertical centre spine with 10 step cards alternating left/right (`<ol>` of `<article>`). Each card connects by a horizontal stub to a node dot on the spine. Card: step number (display, accent), stroke icon, uppercase title, one-line description, progress bar (step/10). Per-card accent interpolates acid (01) to violet (10). Equal size cards (380px desktop, 320px tablet), faint grid background. Under 768px the spine moves to the left edge and cards stack full width. |
| Form field | `--surface-2` background, 1px `--border`, `--radius`. Focus: acid border plus `0 0 0 4px var(--acid-dim)` ring. Label in mono uppercase `--text-dim`. Error text in `#FF6B81`. |
| Header | Transparent at top; after 24px scroll becomes `rgba(8,9,13,.72)` with 16px backdrop blur and bottom border. Mobile (≤940px): burger opens a full-screen panel with large display links. |
| Footer | 4 columns (about, services, company, contact), collapses to 2 then 1. Payment-marks strip above a mono bottom bar carrying copyright, legal links and location. |
| Principle card | Glass card, 1px border, `--radius-lg`. Acid icon tile (42px, `--surface-2`), title, body. 3 columns, 2 below 1000px, 1 below 640px. Lifts 4px on hover (fine pointers only). |
| Disciplines list | Two-column list of acid `checkCircle` + label + detail, each row separated by a 1px border. Single column below 760px. |
| Legal document | Sticky contents card left (268px), numbered sections right. Section numbers in acid mono, `scroll-margin-top: 110px` so anchor jumps clear the header. Bullets are acid 6px squares, not list markers. |
| Payment mark | 62x40 pill, `--surface-2`, 1px border, holding a 48x30 inline-SVG brand plate. Muted at rest (`opacity .82`, `saturate(.9)`), full strength on hover — six brand palettes at full saturation would otherwise shout over the footer. |

## 5. Imagery (Cloudinary)

All images (portfolio thumbnails and galleries, testimonial photos, service icons when they are image URLs, category thumbnails) are Cloudinary URLs stored by the server.

- Always render through the `cld()` helper in `lib/cloudinary.ts` (via the `CldImg` component), which injects `f_auto,q_auto,c_fill,w_<n>` into the delivery URL. Never render the raw original.
- Use `next/image` with explicit `sizes`. `res.cloudinary.com` is allowed in `next.config.ts` `images.remotePatterns`.
- Thumbnails: aspect `16:10` in cards, `16:9` in case-study hero. Avatars: `1:1`, `c_thumb,g_face`.
- Every image gets a dark overlay (grid texture or gradient) so it sits in the dark theme instead of glaring out of it.
- If an image URL is missing, fall back to the brand gradient visual. Never show a broken image or an empty grey box.

## 6. Motion

Library: GSAP + ScrollTrigger, loaded client-side only.

| Effect | Where | Spec |
|---|---|---|
| Hero headline | Home hero | Per-character rise, `yPercent 110`, `rotateX -45`, stagger `.014`, `expo.out`. Gradient spans animate as one unit (splitting them breaks `background-clip: text`). |
| Fade-up | `[data-fade]` | `y 22`, opacity, stagger `.1`. |
| Reveal | `.reveal` | `y 26`, opacity, `.75s`, triggers at `top 86%`. |
| Grid stagger | `[data-stagger]` children | `y 22`, `scale .96`, `back.out(1.3)`, stagger `.07`. |
| Service cards | `.svc-grid` | Per card at `top 88%`, delayed .09s per column: card rises (y 40, scale .96, rotateX 4–6°) 0.7s `power3.out`; icon tile pops (`back.out(2.2)`); icon strokes draw with DrawSVG 0.8s; title, text, link stagger .06. Fine pointers: ±3° tilt toward cursor plus 6px lift; gradient hairline sweeps across the top edge; icon tile tilts and glows. |
| Service scroll depth | `.svc-grid` (≥621px) | Scrubbed column parallax through CSS vars (`--svc-py` on `translate`): each column starts offset (+24px, +62px, +100px), settles to 0 when the grid centre hits the viewport centre, then drifts up. Cards leaving the top recede (`--svc-exit-s` .955, `--svc-exit-b` brightness .62). Separate from `transform`, so it never fights entrance or tilt. |
| Project stack | Home "Selected projects" (`#stack`) | Sticky deck: each card sticks at `96px + i*18px` (`88px + i*10px` mobile). While the next card travels up, the covered card scrubs `--stack-s` 1 to .94 (.97 mobile) and `--stack-b` 1 to .55, origin centre top. Entrance y 60, 0.6s `power3.out`, inner stagger .06. Visual panel parallax yPercent -8 to 8 (scrub 1). Sticky "01 / 03" counter bottom-right. Trigger points derived from the non-sticky list, so reloading mid-page stays correct. Reduced motion: plain list, no sticky. |
| Count-up | `[data-count]` | `1.4s`, `power2.out`, supports `data-suffix`. |
| Panel tilt | `[data-tilt]` | ±7° follow pointer, hover-capable devices only. |
| Blob parallax | Aurora | Scrubbed `yPercent` across full page. |
| Process spine | Process section | Spine fill scrubbed (`scrub .8`). Per step, triggered at `top 84%`: stub `scaleX` 0.35s, node `back.out(2)` 0.4s, card from spine side (x ±40, scale .96, opacity 0) 0.65s at `-0.15s`, inner stagger .05, bar fill 0.6s after .15s. Card nearest viewport centre gets `.active`. Breakpoints via `gsap.matchMedia()`. No pinning. |
| Marquee | Service ticker | CSS keyframes, 34s loop, pauses on hover, direction follows scroll direction. |

Rules:

- `prefers-reduced-motion: reduce` disables every animation. Content must be fully visible with no JS and with reduced motion. `.reveal` is only hidden once `body.gsap-ready` is set.
- Easing default: `cubic-bezier(.16,1,.3,1)` for CSS transitions.
- Never animate layout properties (width/height/top/left) except the pipeline fill line.

## 7. Accessibility

- Focus ring: `2px solid var(--acid)`, `outline-offset: 3px` on every interactive element.
- Contrast: body text uses `--text-mid` or brighter on `--bg`. `--text-dim` only for non-essential meta.
- Decorative layers (`aurora`, `grain`, marquee) carry `aria-hidden="true"`.
- Burger button has `aria-expanded` and `aria-controls`. Mobile panel locks body scroll while open.
- Form inputs have visible labels, `aria-invalid` and `aria-describedby` for errors, and a live region for the submit result.
- No horizontal page scroll at 320px width.

## 8. Pages

| Route | Sections |
|---|---|
| `/` | Hero, marquee, services grid, pipeline, featured work (3), stats, testimonials, CTA |
| `/services` | Page hero, full services grid, pipeline, CTA |
| `/services/[slug]` | Page hero (title, short description), full description, related work, CTA with the service preselected in the form |
| `/work` | Page hero, category filter chips, work grid |
| `/work/[slug]` | Case-study hero with thumbnail, meta row (client, category, stack, live link), description, gallery, related testimonial, CTA |
| `/contact` | Split layout: copy and contact channels left, lead form right, inline booking calendar below |
| `/book` | Split layout: what the call covers left, Cal.com calendar right |
| `/about` | Page hero, story + at-a-glance aside, principles grid, stats, disciplines list, testimonials, CTA |
| `/terms`, `/privacy` | Sticky contents sidebar left, numbered legal sections right |
| `not-found` | Short message, ghost button home, same ambient layer |

Page hero (inner pages): eyebrow, h1 at `clamp(2.2rem, 5vw, 3.8rem)`, lead paragraph, top padding `160px` (`130px` on mobile).
