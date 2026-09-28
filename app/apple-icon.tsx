import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icons are composited on the home screen without transparency, so
// the mark sits on the site's own background rather than a transparent canvas.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#06070A",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "linear-gradient(135deg, #6C5CFF, #2EE6C5)",
          }}
        >
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "#06070A" }} />
        </div>
      </div>
    ),
    size,
  );
}
