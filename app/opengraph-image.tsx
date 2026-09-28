import { renderOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { SITE } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${SITE.name} — software, AI and SaaS partner`;

export default function Image() {
  return renderOgImage({
    eyebrow: "Software · AI · SaaS",
    title: "Full-cycle software, one accountable team",
    description: "Web platforms, mobile apps, custom SaaS and automation — built and shipped in-house from Dhaka.",
  });
}
