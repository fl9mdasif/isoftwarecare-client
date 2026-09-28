import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "A small team that finishes things";

export default function Image() {
  return renderOgImage({ eyebrow: "About us", title: "A small team that finishes things", description: "Six specialists in Dhaka covering product, design, frontend, backend and delivery in-house." });
}
