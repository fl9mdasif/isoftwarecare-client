import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Privacy policy";

export default function Image() {
  return renderOgImage({ eyebrow: "Legal", title: "Privacy policy", description: "What we collect, who processes it, how long we keep it, and how to have it deleted." });
}
