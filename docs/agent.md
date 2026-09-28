# Agent Guide: Interactive Software Care client

Read this first, then `docs/architecture.md` (how the app is built) and `docs/design.md` (how it must look). The visual reference is `A:/Daily dev lab/it-agency/home.html`. The API lives in `../server` and follows `../server/SERVER-ARCHITECTURE.md`.

## What this project is

The agency's own public website. Prospects judge the agency's skill by it, so it must look and behave at least as well as client work. Its business job is one thing: turn visitors into leads through the contact form.

No payments. No public accounts. No uploads on the public site.

## Rules

1. **Design fidelity first.** Every new section reuses tokens and component classes from `app/globals.css`. Do not invent new colors, radii, fonts or shadows. If something new is needed, add it to `globals.css` and `docs/design.md` together.
2. **Server Components by default.** Public content is fetched on the server through `lib/api.ts`. Use RTK Query only in client components for interactive calls (lead form, future dashboard).
3. **Never break when the API is down.** Every fetcher in `lib/api.ts` returns fallback content from `lib/fallback.ts` on failure. A page must never render empty or throw because the server is offline.
4. **Mirror the server, don't guess.** API field names and endpoints come from `../server/src/app/modules/*/interface.*.ts` and `route.*.ts`. When the server changes, update `types/` and `docs/architecture.md` §4.
5. **Images go through `cld()`.** Never render a raw Cloudinary original. Always provide a gradient fallback when the URL is missing.
6. **Motion is optional.** Content must be fully visible without JS and with reduced motion. GSAP lives only in `components/motion/`.
7. **Accessibility is part of done.** Visible focus ring, labelled inputs, `aria-*` on menu and form, no horizontal scroll at 320px.
8. **Keep the lead form's honeypot.** The hidden `website` field must stay empty and hidden. Never remove it.
9. **No secrets in the client.** Only `NEXT_PUBLIC_*` variables, and only non-secret values in them.
10. **Dashboard groundwork is not public-site code.** `authApi`, `userApi`, `categoryApi` and `services/ImageUploader.tsx` exist for Phase 4. Nothing in `app/` may import them yet. (The older `productApi`, `orderApi`, `activityApi` and `lib/status.ts` have been deleted.)
11. **Booking degrades, never breaks.** `CAL.link` may be empty. `BookMeeting` falls back to `/book`, and `/book` falls back to the lead form. Never render a dead button or an empty calendar panel.
12. **Analytics comes from settings, never hardcoded.** No tag loads unless the admin has set its ID.

## Conventions

- Files: components in PascalCase (`ServiceCard.tsx`), everything else camelCase or kebab-case matching existing folders.
- Imports use `@/` from the project root.
- RTK Query slices: one file per server module in `redux/api/<name>Api.ts`, created with `baseApi.injectEndpoints`, tags added to `redux/tag-types.ts`.
- Next.js 16: route `params` and `searchParams` are Promises; `await` them.
- No comments that restate code. Comment only a non-obvious reason.

## Commands

```bash
npm run dev        # http://localhost:3000
npm run build      # production build + type check
npm run start      # serve the build
npm run typecheck  # tsc --noEmit
```

Run the server (`../server`, `npm run dev`, port 5000) for live data. Without it, the site renders fallback content.

## Definition of done

- Matches `home.html` visually at 320px, 768px, 1280px and 1600px.
- `npm run build` passes with no type errors.
- Works with the API up (live content) and down (fallback content).
- Lead form submits end to end and the lead appears in the API.
- Reduced motion and keyboard navigation both work.

## Status

| Phase | Scope | State |
|---|---|---|
| 1 | Scaffold, design system port, layout, home page | Done |
| 2 | Services, work list and case-study pages, contact page with lead form | Done |
| 3 | SEO polish, OG images, sitemap, analytics, booking, error boundaries | Done |
| 4 | Admin dashboard (auth, leads pipeline, content CRUD, Cloudinary upload) | Future |

Phase 3 shipped: `app/sitemap.ts`, `app/robots.ts`, `app/icon.svg`, `app/apple-icon.tsx`,
`app/manifest.ts`, `opengraph-image.tsx` on every route (shared renderer in `lib/og.tsx`),
JSON-LD via `lib/schema.ts`, settings-driven analytics in `components/analytics/`,
`app/error.tsx` + `app/global-error.tsx`, and the Cal.com booking surface
(`/book`, inline embed on `/contact`, popup in the header).

Server-side companion work: new-lead email through Gmail SMTP
(`server/src/app/utils/mailer.ts`, `modules/lead/notify.lead.ts`), and the API sitemap
corrected from `/portfolio/*` to `/work/*`.

Still open before launch: everything in `../LAUNCH.md` — real content in the admin,
production env vars, the Gmail App Password, and the end-to-end lead test.
