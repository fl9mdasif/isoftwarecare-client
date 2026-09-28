import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="nf">
      <div className="wrap">
        <b className="grad">404</b>
        <h1>This page isn&apos;t shipped yet</h1>
        <p>The link may be old or mistyped. Everything we have built is one click away.</p>
        <div className="cta-row">
          <Link href="/" className="btn btn-solid">
            Back home
            <Icon name="arrow" strokeWidth={2} />
          </Link>
          <Link href="/work" className="btn btn-ghost">
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
