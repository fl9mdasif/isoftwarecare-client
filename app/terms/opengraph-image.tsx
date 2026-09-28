import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Terms and conditions";

export default function Image() {
  return renderOgImage({ eyebrow: "Legal", title: "Terms and conditions", description: "How we quote, what you own, how we get paid, and what happens when something goes wrong." });
}
