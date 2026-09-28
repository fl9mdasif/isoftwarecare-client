"use client";

/**
 * Replaces the root layout when the layout itself throws, so it cannot rely on
 * any shared chrome, fonts or CSS variables — every style here is inline.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#06070A",
          color: "#F4F6FA",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, margin: "0 0 12px", letterSpacing: "-0.02em" }}>Something went wrong</h1>
          <p style={{ color: "#B4BCCB", margin: "0 0 24px", lineHeight: 1.6 }}>
            The page failed to load. Reloading usually fixes it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "linear-gradient(135deg, #6C5CFF, #2EE6C5)",
              color: "#06070A",
              border: 0,
              borderRadius: 10,
              padding: "12px 22px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
          {error.digest && <p style={{ color: "#8590A2", fontSize: 13, marginTop: 20 }}>Reference: {error.digest}</p>}
        </div>
      </body>
    </html>
  );
}
