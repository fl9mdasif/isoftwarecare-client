"use client";

import { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CAL } from "@/lib/site";

const NAMESPACE = "inline";

type Props = {
  /** Prefilled into the Cal.com form so returning visitors don't retype. */
  prefill?: { name?: string; email?: string; notes?: string };
};

/**
 * The on-page calendar. Renders nothing when NEXT_PUBLIC_CAL_LINK is unset —
 * the surrounding section decides what to show instead, so an unconfigured
 * booking link degrades to the contact form rather than an empty panel.
 */
export function CalInline({ prefill }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!CAL.link) return;
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#2EE6C5" },
          dark: { "cal-brand": "#2EE6C5" },
        },
      });
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!CAL.link) return null;

  return (
    <div className="cal-inline" data-ready={ready || undefined}>
      <Cal
        namespace={NAMESPACE}
        calLink={CAL.link}
        calOrigin={CAL.origin}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "dark", ...prefill }}
      />
      <p className="cal-fallback">
        Calendar not loading?{" "}
        <a href={`${CAL.origin}/${CAL.link}`} target="_blank" rel="noopener noreferrer">
          Open it on Cal.com
        </a>
      </p>
    </div>
  );
}
