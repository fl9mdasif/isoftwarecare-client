import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";

const LINES = ["WE BUILD SOFTWARE", "YOUR BUSINESS"];
const GRAD_LINE = "ACTUALLY NEEDS";

const TERM = [
  ["web", "sites · e-commerce · platforms"],
  ["apps", "Android · iOS · cross-platform"],
  ["saas", "multi-tenant · billing · dashboards"],
  ["ai", "chatbots · RAG · automation"],
  ["stack", "Next.js · Node · Postgres · Python"],
  ["deploy", "CI/CD · monitored · documented"],
];

const chars = (text: string) =>
  text.split("").map((ch, i) => (
    <span key={i} className="char">
      {ch === " " ? " " : ch}
    </span>
  ));

/**
 * Groups a line's characters by word before wrapping lands on them.
 *
 * Each char is its own inline-block span (so GSAP can animate it individually),
 * but with nothing marking word boundaries, the browser treats every single
 * character as an equally valid break point — on a narrow phone it can wrap
 * mid-word ("SOFTWAR" / "E") instead of between words. Wrapping each word's
 * characters in their own inline-block with `white-space: nowrap` (see
 * `.hero h1 .word` in globals.css) makes a word one atomic unit again, so a
 * forced wrap can only fall on an actual space.
 */
const words = (text: string) =>
  text.split(" ").map((word, i, arr) => (
    <span key={i} className="word">
      {chars(word)}
      {i < arr.length - 1 ? <span className="char"> </span> : null}
    </span>
  ));

export function Hero({ projects, specialists = 6 }: { projects: number; specialists?: number }) {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">Software · AI · SaaS · Automation</span>
          <h1 id="hero-title" aria-label={`${LINES.join(" ")} ${GRAD_LINE}`}>
            {LINES.map((l) => (
              <span key={l} className="line" aria-hidden="true">
                {words(l)}
              </span>
            ))}
            <span className="line" aria-hidden="true">
              <span className="grad char">{GRAD_LINE}</span>
            </span>
          </h1>
          <p className="hero-sub" data-fade>
            A product and engineering team building web platforms, e-commerce, mobile apps, custom SaaS and AI
            automation. One accountable team from first sketch to launch, instead of three outsourced ones. Based in
            Dhaka, working with clients worldwide.
          </p>
          <div className="hero-cta" data-fade>
            <Link href="/contact" className="btn btn-solid">
              Start a project
              <Icon name="arrow" strokeWidth={2} />
            </Link>
            <Link href="/work" className="btn btn-ghost">
              See our work
            </Link>
          </div>
          <div className="hero-meta" data-fade>
            <div>
              <b data-count={specialists}>{specialists}</b>
              <span>Specialists on team</span>
            </div>
            <div>
              <b data-count={projects}>{projects}</b>
              <span>Live projects shipped</span>
            </div>
            <div>
              <b>100%</b>
              <span>In-house, no outsourcing</span>
            </div>
          </div>
        </div>

        <div className="hero-panel" data-tilt aria-hidden="true">
          <div className="panel-bar">
            <i className="dot" />
            <i className="dot" />
            <i className="dot" />
            <span>{SITE.domain}</span>
          </div>
          <div className="term">
            <div>
              <span className="c">{"// what we ship"}</span>
            </div>
            {TERM.map(([k, v]) => (
              <div key={k}>
                <span className="k">{k}</span>: <span className="v">{v}</span>
              </div>
            ))}
          </div>
          <div className="float-stat">
            <span className="pulse" />
            <div>
              <small>Currently building</small>
              <b>Courier &amp; E-commerce SaaS</b>
            </div>
          </div>
          <div className="chips">
            {["Web", "E-commerce"].map((c) => (
              <span key={c} className="chip on">
                {c}
              </span>
            ))}
            {["App", "UI/UX", "SaaS", "Full stack", "AI chatbot", "Automation"].map((c) => (
              <span key={c} className="chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
