# Launch checklist — Interactive Software Care

Two deployables: `../server/` (Express + MongoDB) and this Next.js 16 client.
Deploy the server first — the client reads from it at build time.

---

## 1. Server (`../server/`)

### Environment variables

Set these on the host (Vercel → Settings → Environment Variables, or your VPS `.env`):

| Variable | Value | Notes |
|---|---|---|
| `NODE_ENV` | `production` | |
| `PORT` | `5000` | Ignored by Vercel |
| `DATABASE_URL` | MongoDB Atlas SRV string | Atlas → Network Access must allow the host IP, or `0.0.0.0/0` for serverless |
| `BCRYPT_SALT_ROUND` | `12` | |
| `JWT_ACCESS_SECRET` | long random string | Never reuse the dev value |
| `JWT_REFRESH_SECRET` | long random string | Different from the access secret |
| `JWT_ACCESS_EXPIRES_IN` | `1d` | |
| `JWT_REFRESH_EXPIRES_IN` | `30d` | |
| `SUPER_ADMIN_EMAIL` / `SUPER_ADMIN_PASS` | your admin login | Seeds the first admin |
| `ADMIN_EMAIL` | your inbox | Fallback for lead alerts |
| **`NOTIFY_EMAIL`** | your inbox | **Where new-lead alerts land.** Falls back to `ADMIN_EMAIL` |
| **`GMAIL_USER`** | your Gmail address | Account that sends the mail |
| **`GMAIL_APP_PASSWORD`** | 16-char App Password | Google App Password, **not** the account password |
| **`MAIL_FROM`** | blank, or a verified Gmail alias | Blank = `GMAIL_USER` |
| **`MAIL_FROM_NAME`** | `Interactive Software Care` | |
| `SITE_URL` | `https://isoftwarecare.com` | Used for the API-side `sitemap.xml` |
| `CLIENT_URL` | `https://isoftwarecare.com,https://www.isoftwarecare.com` | **CORS.** Missing entries = the lead form fails in the browser |

### Steps

- [ ] `npm run build` passes (run from `../server`)
- [ ] Deploy, note the public API origin (e.g. `https://api.isoftwarecare.com`)
- [ ] `GET /api/v1/settings` returns 200
- [ ] `GET /sitemap.xml` returns XML with `/work/...` paths (not `/portfolio/...`)
- [ ] Log in as super admin and fill **Settings**: contact email, phone, WhatsApp, address, social links
- [ ] Add real Services, Portfolio items and Testimonials — until then the site serves `lib/fallback.ts` placeholder copy

---

## 2. Email (Gmail SMTP)

- [ ] Enable **2-Step Verification** on the Gmail account
- [ ] Create an App Password: myaccount.google.com -> Security -> App passwords
- [ ] Put it in `GMAIL_APP_PASSWORD` (spaces are stripped automatically)
- [ ] Run `npm run verify:mail` -> expect **PASS**
- [ ] Run `npm run verify:mail -- --send` and confirm the test email arrives
- [ ] Submit a real lead and confirm **both** emails: alert to `NOTIFY_EMAIL`, auto-reply to the sender

If the credentials are unset the site still captures leads; it logs a warning and
sends nothing. Gmail's free tier allows roughly 500 messages/day, which is far
beyond lead volume for this site.


---

## 3. Cal.com (book a meeting)

- [ ] Event type exists, 30 minutes, **location = Google Meet**
- [ ] Google Calendar connected under Apps, so invites and conflict-checking work
- [ ] Availability set to real working hours in **Asia/Dhaka**
- [ ] Set `NEXT_PUBLIC_CAL_LINK` to `username` or `username/event-slug` (currently `isoftwarecare`)

A bare username shows every public event type. Point it at a specific slug
(e.g. `isoftwarecare/30min`) to send people straight into one event.

---

## 4. Client (this repo)

### Environment variables

| Variable | Production value |
|---|---|
| `NEXT_PUBLIC_BACKEND_API_URL` | `https://<your-api-host>/api/v1` |
| `NEXT_PUBLIC_SITE_URL` | `https://isoftwarecare.com` |
| `NEXT_PUBLIC_CAL_LINK` | `isoftwarecare` (or `isoftwarecare/30min`) |
| `NEXT_PUBLIC_CAL_ORIGIN` | `https://cal.com` |

`NEXT_PUBLIC_SITE_URL` is the one that silently breaks things: it drives canonical
URLs, Open Graph, `robots.txt` and `sitemap.xml`. Leaving it on `localhost:3000`
ships a site that tells Google it lives on your laptop.

### Steps

- [ ] `npm run build` passes
- [ ] Deploy to Vercel, point the domain at it
- [ ] Add `https://isoftwarecare.com` to the server's `CLIENT_URL`, redeploy the server
- [ ] Submit a real lead from the deployed site → check the DB **and** both emails

---

## 5. Post-deploy verification

- [ ] `/robots.txt` lists `https://isoftwarecare.com/sitemap.xml`
- [ ] `/sitemap.xml` lists `/`, `/services`, `/work`, `/book`, `/contact` + every slug
- [ ] `/opengraph-image` renders the branded card — paste a link into Slack/WhatsApp to confirm the preview
- [ ] Favicon shows in the tab; `/manifest.webmanifest` loads
- [ ] Rich Results Test passes: <https://search.google.com/test/rich-results>
- [ ] Lead form: success, validation errors, and the 429 rate-limit message
- [ ] Booking: popup from the header, inline calendar on `/contact` and `/book`
- [ ] Keyboard-only pass: visible focus ring everywhere, mobile menu closes on Escape
- [ ] 320px width: no horizontal scroll
- [ ] OS "reduce motion" on: everything renders in its final state
- [ ] Kill the API and reload: fallback content renders, nothing throws

---

## 6. Search Console & analytics

- [ ] Add the property at <https://search.google.com/search-console>, verify by HTML tag
- [ ] Paste the tag content into **Settings → searchConsoleTag** in the admin — the client injects it automatically, no redeploy needed
- [ ] Submit `https://isoftwarecare.com/sitemap.xml`
- [ ] Optional: set `gaId` (GA4), `gtmId` or `fbPixelId` in Settings. Nothing loads until an ID is set

---

## 7. Known gaps

- **No admin dashboard yet** (Phase 4). Content is edited through the API directly; leads arrive by email
- `ImageUploader`, `authApi`, `categoryApi` and `userApi` are dashboard groundwork, unused by the public site
- The API also serves its own `/sitemap.xml`. The client's copy at `/sitemap.xml` is the canonical one in `robots.txt`
