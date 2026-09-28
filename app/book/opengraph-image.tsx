import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Thirty minutes, one engineer";

export default function Image() {
  return renderOgImage({ eyebrow: "Book a meeting", title: "Thirty minutes, one engineer", description: "Pick an open slot for a Google Meet call. Straight answers on scope, timeline and budget." });
}
