"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // The digest is the only handle on the server-side stack, which Next.js
    // deliberately withholds from the browser in production.
    console.error("Route error:", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="nf">
      <div className="wrap">
        <b className="grad">500</b>
        <h1>Something broke on our side</h1>
        <p>
          Not your fault. Try again in a moment — if it keeps happening, email us at{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we&apos;ll dig in.
        </p>
        <div className="cta-row">
          <button type="button" className="btn btn-solid" onClick={reset}>
            Try again
            <Icon name="loader" strokeWidth={2} />
          </button>
          <Link href="/" className="btn btn-ghost">
            Back home
          </Link>
        </div>
        {error.digest && <p className="err-digest">Reference: {error.digest}</p>}
      </div>
    </section>
  );
}
