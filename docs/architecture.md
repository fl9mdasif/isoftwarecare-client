# Client Architecture: Interactive Software Care

Public marketing and lead-generation site for Interactive Software Care. It reads content from the Express API in `../server` and posts one thing back: the contact form (a lead). Images live in Cloudinary; the server stores their URLs.

Visual rules: see `docs/design.md`. Agent working rules: see `docs/agent.md`.

## 1. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16, App Router, React 19 |
| Language | TypeScript, `strict: true` |
| Styling | Design-system CSS in `app/globals.css` (ported from `home.html`) plus Tailwind CSS v4 for utilities |
| Motion | GSAP + ScrollTrigger (client components only) |
| Client data | Redux Toolkit + RTK Query over an axios base query (`redux/`, `helpers/axios/`) |
| Server data | Native `fetch` in Server Components through `lib/api.ts`, with ISR |
| Images | Cloudinary delivery URLs rendered with `next/image` |
| Icons | Inline SVG for the marketing site (matches `home.html`), `lucide-react` for dashboard UI |
| Toasts | `react-hot-toast` |

## 2. Folder structure

The `@/*` import alias maps to the project root (no `src/`), because the shared folders were carried over from an earlier project with that layout.

```
app/                          # App Router: routes, layouts, metadata
  layout.tsx                  # fonts, ambient layer, header, footer, providers
  page.tsx                    # home
  services/page.tsx
  services/[slug]/page.tsx
  work/page.tsx
  work/[slug]/page.tsx
  contact/page.tsx
  book/page.tsx               # Cal.com booking page
  not-found.tsx
  error.tsx                   # route-level error boundary
  global-error.tsx            # replaces the layout when the layout itself throws
  robots.ts
  sitemap.ts                  # canonical sitemap, served by this app
  manifest.ts
  icon.svg                    # favicon
  apple-icon.tsx              # 180x180 touch icon via ImageResponse
  opengraph-image.tsx         # one per route, incl. [slug] routes
  globals.css                 # design tokens + component CSS
components/
  layout/                     # Header, Footer, Ambient, MobileMenu
  sections/                   # Hero, Marquee, Services, Pipeline, Work, Stats, Testimonials, CTA, PageHero
  ui/                         # Button, Eyebrow, SectionHead, Chip, Icon, CldImg
  motion/                     # MotionRoot (GSAP setup), Reveal helpers
  forms/                      # LeadForm
  booking/                    # BookMeeting (popup), CalInline (embed), MeetLogo
  analytics/                  # GA4 / GTM / Meta Pixel, driven by settings
lib/
  api.ts                      # server-side fetchers (Server Components only)
  cloudinary.ts               # URL transform helper
  fallback.ts                 # static content used when the API is unreachable
  site.ts                     # site constants, nav, Cal link normaliser
  og.tsx                      # shared Open Graph card renderer
  schema.ts                   # JSON-LD builders
  contact.ts                  # settings -> mailto/tel/wa links
  utils.ts                    # cn()
redux/                        # store, baseApi, endpoint slices (client side)
helpers/axios/                # axios instance + RTK Query base query
services/                     # client auth helpers, ImageUploader (dashboard, future)
hooks/                        # useCurrentUser, useDebouncedValue
contains/                     # constants: authKey, USER_ROLE
types/                        # shared TypeScript types (API shapes)
utils/                        # local-storage, jwt, slugify, misc
docs/                         # design.md, architecture.md, agent.md
```

## 3. Data flow

Two paths, each with one job. Do not mix them.

### 3.1 Public content: Server Components + `lib/api.ts`

Pages that need SEO (every public page) fetch on the server:

```ts
// lib/api.ts
const res = await fetch(`${API_URL}/services`, { next: { revalidate: 300, tags: ['services'] } });
```

- Rendered HTML contains the content, so search engines and link previews see it.
- ISR: revalidate every 300 seconds. Content edits in the admin appear within 5 minutes without a redeploy.
- On network error or non-2xx, the fetcher returns fallback content from `lib/fallback.ts` (the copy from `home.html`), so the site still renders when the API is down or empty. A missing single item (`/work/unknown-slug`) calls `notFound()`.
- `generateStaticParams` pre-builds `services/[slug]` and `work/[slug]`; `generateMetadata` uses each item's `metaTitle` / `metaDescription`.

### 3.2 Interactive calls: RTK Query

Client components use RTK Query hooks from `redux/api/*`:

- `useCreateLeadMutation` for the contact form.
- Future admin dashboard: auth, lead pipeline, content CRUD. `authApi`, `categoryApi` and `ImageUploader` are already in place for this.

`ReduxProvider` wraps the app in `app/layout.tsx`. The axios instance unwraps the server envelope, so RTK Query `data` is the inner `data` field.

## 4. API contract

Base URL: `NEXT_PUBLIC_BACKEND_API_URL` (for example `http://localhost:5000/api/v1`). Every response uses the envelope `{ success, statusCode, message, data }`. Public list endpoints return plain arrays (no pagination).

| Method | Path | Auth | Returns / notes |
|---|---|---|---|
| GET | `/services` | public | Active services sorted by `order`, `category` populated `{name, slug}` |
| GET | `/services/:idOrSlug` | public | One service |
| GET | `/portfolio` | public | Items sorted by `order`. Query: `category` (ObjectId), `isFeatured=true` |
| GET | `/portfolio/:idOrSlug` | public | One item, `category` populated |
| GET | `/testimonials` | public | Approved only, newest first, `relatedPortfolioItem` populated `{title, slug}` |
| GET | `/categories` | public | Categories |
| GET | `/settings` | public | Singleton: contact email, phone, WhatsApp, address, social links, marketing IDs |
| POST | `/leads` | public | Contact form. Rate limit: 10 per 15 min per IP |
| — | `/sitemap.xml` | public | Served by the API at its root, not by this app |

### Types (mirror of server interfaces)

```ts
TService      { _id, title, slug, shortDescription, fullDescription, icon?, category?, order, isActive, metaTitle?, metaDescription? }
TPortfolio    { _id, title, slug, client?, description, techStack[], thumbnail, gallery?[], liveUrl?, category, isFeatured, order, metaTitle?, metaDescription? }
TTestimonial  { _id, clientName, clientRole?, clientCompany?, photo?, quote, rating, relatedPortfolioItem?, isApproved, isFeatured }
TSettings     { contactEmail?, contactPhone?, whatsappNumber?, officeAddress?, socialLinks?[{platform, url}], fbPixelId?, gaId?, gtmId?, searchConsoleTag? }
TLeadInput    { name, email, phone?, message, serviceInterested? (ObjectId), budget?, source?, website (honeypot, always "") }
```

`Service.icon` is either a Cloudinary URL (rendered as an image) or an icon key (`web`, `ecommerce`, `app`, `uiux`, `saas`, `fullstack`, `ai`, `chatbot`) rendered as a built-in SVG. When neither matches, the icon is guessed from the slug.

## 5. Lead form

- Fields: name, email, phone, service (select from `/services`), budget (select), message.
- Honeypot: a visually hidden `website` input, `tabIndex={-1}`, `autoComplete="off"`. Real users never fill it; the server silently drops any lead where it is set.
- `source`: the page path the form was submitted from (`/contact`, `/services/web-development`, ...).
- Client validation mirrors the server Zod schema (name 1–100, valid email, message 1–2000). The server remains the authority; show its message on 4xx.
- 429 shows "Too many submissions, try again in a few minutes."
- Success replaces the form with a confirmation panel. Errors use a toast plus an inline live region.

## 6. Images (Cloudinary)

- `lib/cloudinary.ts` exports `cld(url, { w, h, crop, gravity })`. It inserts a transformation segment after `/upload/` (`f_auto,q_auto,c_fill,w_800`). Non-Cloudinary URLs pass through unchanged.
- `next.config.ts` allows `res.cloudinary.com` in `images.remotePatterns`. Components pass the already-transformed URL to `next/image` with `unoptimized` so Cloudinary, not Next, does the resizing (no double processing, no Vercel image quota).
- Uploads happen only in the future admin dashboard, through a signed server route. The public site never uploads.

## 7. Environment variables

`.env.local` (never committed):

| Variable | Example | Use |
|---|---|---|
| `NEXT_PUBLIC_BACKEND_API_URL` | `http://localhost:5000/api/v1` | API base for server fetchers and RTK Query |
| `NEXT_PUBLIC_SITE_URL` | `https://isoftwarecare.com` | Canonical URLs, Open Graph, robots, sitemap |
| `NEXT_PUBLIC_CAL_LINK` | `isoftwarecare/30min` | Cal.com booking target; blank disables the embed |
| `NEXT_PUBLIC_CAL_ORIGIN` | `https://cal.com` | Only for Cal EU or self-hosted |

No secrets belong here — everything prefixed `NEXT_PUBLIC_` ships to the browser.
The Plunk keys live in `../server/.env`.

The server's `CLIENT_URL` must include this site's origin, or the browser blocks the lead form with a CORS error.

## 8. SEO

- `app/layout.tsx` exports a single `generateMetadata` (not `metadata` — Next.js
  forbids both in one file). It resolves `searchConsoleTag` from `/settings`, so
  verification is an admin edit rather than a redeploy.
- Per-page `generateMetadata` from the item's meta fields, falling back to title
  and short description. Every page sets `alternates.canonical`.
- **Sitemap:** `app/sitemap.ts` is canonical and is what `robots.ts` advertises.
  A sitemap on another origin is only honoured for verified domains, and the
  API's copy previously listed `/portfolio/*` paths this app never served.
  The API still serves its own at `/sitemap.xml`; it was corrected to `/work/*`.
- **Open Graph:** `lib/og.tsx` renders one card design for every route through
  `ImageResponse`. It fetches no remote fonts or images on purpose — a network
  call there makes link previews fail intermittently.
- **Structured data:** `lib/schema.ts` builds `ProfessionalService` + `WebSite`
  (root layout), `Service`, `CreativeWork` and `BreadcrumbList` (detail pages),
  emitted through `components/ui/JsonLd.tsx`, which escapes `<`.
- One `h1` per page. Semantic landmarks: `header`, `main`, `footer`, `nav`.

## 8a. Booking (Cal.com)

`NEXT_PUBLIC_CAL_LINK` takes `username`, `username/event-slug` or a full Cal.com
URL — `normalizeCalLink()` in `lib/site.ts` strips the origin, because the embed
needs the bare path and a pasted URL would otherwise fail silently.

Three surfaces, all degrading when the link is empty:

| Surface | Component | Empty-link behaviour |
|---|---|---|
| Header / contact button | `BookMeeting` | Renders a `Link` to `/book` |
| Contact page section | `CalInline` | Section is not rendered at all |
| `/book` page | `CalInline` | Falls back to `LeadForm` + explanation |

## 8b. Analytics

`components/analytics/Analytics.tsx` reads `gaId`, `gtmId`, `fbPixelId` from
`/settings`. Nothing is hardcoded and nothing loads unless an ID is set, so a
fresh install makes zero third-party requests. GA4 only loads directly when GTM
is absent, otherwise the measurement ID would be registered twice. All tags use
`strategy="afterInteractive"` and must never sit on the LCP path.

## 8c. Lead email (server side)

`POST /leads` persists the lead and then awaits `notifyNewLead`, which sends two
Plunk emails: an internal alert to `NOTIFY_EMAIL` (reply-to set to the prospect)
and an auto-reply to the prospect (reply-to set to the agency inbox). The send is
awaited rather than fire-and-forget because a serverless function can freeze the
moment the response flushes. `sendMail` never throws, so a mail outage cannot
turn a captured lead into a 500.

## 9. Rendering rules

- Server Component by default. Add `"use client"` only for state, effects, browser APIs or GSAP.
- GSAP runs in one client component, `MotionRoot`, which scans the DOM for `data-*` hooks (`data-fade`, `data-stagger`, `data-count`, `data-tilt`, `.reveal`) after each route change. Sections stay Server Components and only carry attributes.
- Every animation must degrade to fully visible content with no JS and with `prefers-reduced-motion: reduce`.

## 10. Dashboard groundwork

`redux/api/authApi.ts`, `userApi.ts`, `categoryApi.ts` and
`services/ImageUploader.tsx` exist for the Phase 4 admin dashboard. Nothing in
`app/` imports them. The genuinely dead files from the earlier inventory project
(`productApi`, `orderApi`, `activityApi`, `lib/status.ts`) have been deleted,
along with their now-unused entries in `redux/tag-types.ts`.

The product/order/activity types still in `types/common.ts` are unused by the
public site but are left in place until the dashboard settles its own shapes.
