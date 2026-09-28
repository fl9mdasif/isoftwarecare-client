import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Projects we have shipped";

export default function Image() {
  return renderOgImage({ eyebrow: "Selected work", title: "Projects we have shipped", description: "Case studies from platforms, storefronts and internal tools we designed, built and launched." });
}
