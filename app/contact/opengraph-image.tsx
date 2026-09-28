import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Let us scope your project";

export default function Image() {
  return renderOgImage({ eyebrow: "Contact", title: "Let us scope your project", description: "A clear scope and timeline back within one business day, from an engineer rather than a sales rep." });
}
