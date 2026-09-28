import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "What we build";

export default function Image() {
  return renderOgImage({ eyebrow: "Services", title: "What we build", description: "Web platforms, e-commerce, mobile apps, custom SaaS, AI automation. One team, start to live." });
}
