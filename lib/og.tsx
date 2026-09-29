import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { SITE } from "./site";

/**
 * The brand mark, inlined as a data URI.
 *
 * Uses the plated variant because these cards are dark: the bare navy logo is
 * 1.31:1 against this background and all but disappears in a link preview.
 *
 * Read once at module load rather than fetched per render — an OG card that
 * depends on a network request fails intermittently, and each crawler only
 * generates the preview once.
 */
const LOGO = `data:image/png;base64,${fs
  .readFileSync(path.join(process.cwd(), "app/assets/logo-images/derived/mark-plate.png"))
  .toString("base64")}`;

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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} width={56} height={56} alt="" />
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
