# Interactive Software Care — Website

The agency's public site. Marketing pages plus one job that matters: turning a
visitor into a lead.

Next.js 16 (App Router) · React 19 · TypeScript strict · GSAP · Tailwind v4

**API:** [`../server`](../server) — Express + MongoDB
**Live content:** fetched server-side, with static fallbacks so the site never
renders empty when the API is down.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill it in, see below
npm run dev                    # http://localhost:3000
```

The site runs without the API. Every fetcher falls back to `lib/fallback.ts`,
so you get placeholder content instead of an error page. Run `../server`
(`npm run dev`, port 5000) for live data.

| Script | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build + type check |
| `npm run start` | Serve the build |
| `npm run typecheck` | `tsc --noEmit` |

---

## Environment

`.env.local`, never committed. Everything here is `NEXT_PUBLIC_` and therefore
**visible in the browser** — no secrets belong in this file.

| Variable | Example | Notes |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_API_URL` | `http://localhost:5000/api/v1` | Include the `/api/v1` prefix |
| `NEXT_PUBLIC_SITE_URL` | `https://isoftwarecare.com` | Drives canonicals, OG, robots, sitemap |
| `NEXT_PUBLIC_CAL_LINK` | `isoftwarecare/30min` | Blank disables booking; a full cal.com URL is also accepted |
| `NEXT_PUBLIC_CAL_ORIGIN` | `https://cal.com` | Only for Cal EU or self-hosted |

> `NEXT_PUBLIC_SITE_URL` is the one that breaks things quietly. Left on
> `localhost:3000` in production, the site tells Google it lives on your laptop.

Mail credentials live in `../server/.env`. The browser never sends email.

---

## Routes

| Route | Rendering | Notes |
|---|---|---|
| `/` | Static + ISR | Hero, services, process, featured work, stats, testimonials |
| `/services`, `/services/[slug]` | SSG | Slugs pre-built from the API |
| `/work`, `/work/[slug]` | SSG | Case studies |
| `/about` | Static | Story, principles, disciplines |
| `/contact` | Dynamic | Lead form + inline booking calendar |
| `/book` | Static | Dedicated booking page |
| `/terms`, `/privacy` | Static | Content from `lib/legal.ts` |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Generated | |
| `opengraph-image` | Per route | Rendered at request time from `lib/og.tsx` |

ISR revalidates every 300s, so admin content edits appear within five minutes
without a redeploy.

---

## How it fits together

```
app/          routes, metadata, sitemap/robots/manifest, OG images
components/
  sections/   page sections (server components, motion via data attributes)
  layout/     Header, Footer, Ambient, Providers
  booking/    Cal.com popup + inline embed
  forms/      LeadForm
  legal/      shared Terms/Privacy renderer
  theme/      ThemeScript, ThemeToggle, useTheme
  analytics/  GA4 / GTM / Meta Pixel, driven by admin settings
  motion/     GSAP setup (one client component per page)
lib/          api, fallback, og, schema, legal, cloudinary, site constants
redux/        RTK Query — client-side calls only (the lead form)
```

Two data paths, deliberately not mixed:

- **Public content** → Server Components via `lib/api.ts`. Indexable, ISR-cached,
  falls back to static content on any failure.
- **Interactive** → RTK Query in client components. Currently just the lead form.

Full detail in [`docs/architecture.md`](docs/architecture.md).

---

## Theming

Light and dark, with dark as the default.

- `:root` holds dark values; `:root[data-theme="light"]` overrides them
- `ThemeScript` sets the attribute in `<head>` **before first paint**, so there
  is no flash on navigation
- The choice persists in `localStorage`; until one exists, the OS preference is
  followed live
- `useTheme()` exposes it to JS — the Cal.com embeds use it

**Adding styles:** never write a raw colour. Use a token, or `color-mix()` on
one. A literal cannot follow the theme, which is how a light mode ends up with
invisible cards and black smears. The only exceptions are mask-image colours
and the `.w1`/`.w2`/`.w3` brand gradients.

Light is not an inversion of dark — the accent darkens for contrast and
elevation switches from sheen to shadow. The reasoning is in
[`docs/design.md`](docs/design.md).

---

## The lead form

The one public write. `components/forms/LeadForm.tsx` → `POST /leads`.

- Client validation mirrors the server's Zod schema; the server stays the authority
- A hidden `website` honeypot field is silently dropped server-side — **do not remove it**
- `source` records which page the form was sent from
- Rate limited to 10 per 15 minutes per IP; 429 gets its own message
- On success the server emails you and auto-replies to the prospect

---

## Conventions

- Server Components by default. `"use client"` only for state, effects, browser
  APIs or GSAP.
- Imports use `@/` from the project root.
- Components in PascalCase; everything else matches its folder.
- Next 16: route `params` and `searchParams` are Promises — `await` them.
- Images go through `cld()` with a gradient fallback. Never render a raw
  Cloudinary original.
- Motion degrades: content must be fully visible with no JS and under
  `prefers-reduced-motion: reduce`.
- Comment the non-obvious reason, not the code.

---

## Definition of done

- `npm run build` passes with no type errors
- Works with the API up **and** down
- No horizontal scroll at 320px
- Keyboard navigable, visible focus ring
- Both themes checked
- Reduced motion renders everything in its final state

---

## Docs

| File | Contents |
|---|---|
| [`docs/agent.md`](docs/agent.md) | Working rules — read first |
| [`docs/architecture.md`](docs/architecture.md) | How the app is built, API contract |
| [`docs/design.md`](docs/design.md) | Design system, tokens, motion, theming |
| [`components.md`](components.md) | Porting the GSAP sections into another project |
| [`LAUNCH.md`](LAUNCH.md) | Deployment checklist for both halves |
