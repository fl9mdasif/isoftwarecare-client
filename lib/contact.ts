import type { TSettings } from "@/types";

const digits = (v: string) => v.replace(/[^\d+]/g, "");

const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export function contactLinks(s: TSettings) {
  const phone = s.contactPhone ? digits(s.contactPhone) : "";
  const wa = s.whatsappNumber ? digits(s.whatsappNumber).replace(/^\+/, "") : "";

  return {
    email: s.contactEmail ? { href: `mailto:${s.contactEmail}`, label: s.contactEmail } : null,
    phone: phone ? { href: `tel:${phone}`, label: s.contactPhone as string } : null,
    whatsapp: wa ? { href: `https://wa.me/${wa}`, label: `+${wa}` } : null,
    address: s.officeAddress || null,
    socials: (s.socialLinks ?? [])
      .filter((l) => /^https?:\/\//.test(l.url))
      .map((l) => ({ platform: l.platform, url: l.url, label: prettyUrl(l.url) })),
  };
}
