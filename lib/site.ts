export const SITE = {
  name: "Interactive Software Care",
  shortName: "iSoftwareCare",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://isoftwarecare.com" || "http://localhost:3000",
  domain: "isoftwarecare.com",
  description:
    "Interactive Software Care is a Dhaka-based software, AI and SaaS engineering partner. Web platforms, mobile apps, custom SaaS and automation, built by one accountable team.",
  email: "interactivesoftwarecare@gmail.com",
  phone: "+880 1746 818461",
  phoneDisplay: "+880 1746 818461",
  whatsapp: "+880 1746 818461",
  address: "Mirpur Tower, Mirpur - 1, Dhaka - 1216, Bangladesh",
  facebook: "https://www.facebook.com/isoftwarecare",
};

export const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const BUDGETS = ["Under $1,000", "$1,000 – $3,000", "$3,000 – $7,000", "$7,000 – $15,000", "$15,000+", "Not sure yet"];

const CAL_ORIGIN = process.env.NEXT_PUBLIC_CAL_ORIGIN || "https://cal.com";

/**
 * Cal.com's embed wants a bare `username` or `username/event-slug`. Pasting the
 * full booking URL from the browser is the obvious mistake and would make the
 * embed request `cal.com/https://cal.com/...`, which fails silently — so accept
 * either form and strip the origin down to the path.
 */
const normalizeCalLink = (raw: string) =>
  raw
    .trim()
    .replace(/^https?:\/\/(www\.)?(cal\.com|cal\.eu|app\.cal\.com)/i, "")
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^\/+|\/+$/g, "")
    .split("?")[0];

export const CAL = {
  link: normalizeCalLink(process.env.NEXT_PUBLIC_CAL_LINK || ""),
  origin: CAL_ORIGIN,
};

/** Absolute Cal.com URL, for the no-JS fallback and for email/proposal links. */
export const calUrl = () => (CAL.link ? `${CAL.origin.replace(/\/$/, "")}/${CAL.link}` : "");

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000/api/v1";

/**
 * Per-page Open Graph block.
 *
 * Next.js shallow-merges metadata, so a child that defines `openGraph` replaces
 * the parent's object wholesale — a page setting only `url` would silently drop
 * siteName, type and locale. Inheriting instead leaves every page advertising
 * the site root as its og:url. This helper rebuilds the full block each time.
 */
export const pageOg = (path: string, extra: Record<string, unknown> = {}) => ({
  type: "website" as const,
  siteName: SITE.name,
  locale: "en_US",
  url: `${SITE.url.replace(/\/$/, "")}${path}`,
  ...extra,
});
