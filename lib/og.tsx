import { ImageResponse } from "next/og";
import { SITE } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type OgInput = {
  /** Small uppercase label above the headline, e.g. "Service" or "Case study". */
  eyebrow?: string;
  title: string;
  /** One line of supporting copy. Trimmed hard — OG cards are read at a glance. */
  description?: string;
};

const clamp = (value: string, max: number) => (value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value);

/**
 * One card design for every route, rendered at request time by the Edge-style
 * ImageResponse runtime. Deliberately uses no remote fonts or images: a network
 * fetch here would make link previews fail intermittently, and the satori
 * default font renders this layout cleanly.
 */
export function renderOgImage({ eyebrow, title, description }: OgInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#06070A",
          backgroundImage:
            "radial-gradient(900px 500px at 78% -10%, rgba(108,92,255,0.30), transparent 60%), radial-gradient(760px 460px at 4% 108%, rgba(46,230,197,0.22), transparent 62%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: "linear-gradient(135deg, #6C5CFF, #2EE6C5)",
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 5, background: "#06070A" }} />
          </div>
          <div style={{ color: "#F4F6FA", fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow && (
            <div
              style={{
                color: "#2EE6C5",
                fontSize: 21,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              color: "#F4F6FA",
              fontSize: title.length > 48 ? 62 : 76,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
            }}
          >
            {clamp(title, 96)}
          </div>
          {description && (
            <div style={{ color: "#B4BCCB", fontSize: 28, lineHeight: 1.45, marginTop: 24, maxWidth: 940 }}>
              {clamp(description, 140)}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#8590A2", fontSize: 24 }}>{SITE.domain}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 64, height: 5, borderRadius: 3, background: "#6C5CFF" }} />
            <div style={{ width: 24, height: 5, borderRadius: 3, background: "#2EE6C5" }} />
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
