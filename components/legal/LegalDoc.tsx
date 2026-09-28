import type { ReactNode } from "react";
import { slugify } from "@/utils/slugify";

export type LegalSection = {
  heading: string;
  /** Paragraphs, or a nested list rendered as bullets. */
  body: (string | { list: string[] })[];
};

/**
 * Shared rendering for Terms and Privacy.
 *
 * The contents list is derived from the section headings rather than maintained
 * by hand, so a section can never be added without appearing in the index —
 * the usual way legal pages rot.
 *
 * The nav sits first in the DOM and is placed left on desktop, top on mobile,
 * so reading order and visual order agree at every width.
 */
export function LegalDoc({
  sections,
  updated,
  intro,
}: {
  sections: LegalSection[];
  /** ISO date, rendered in a <time> so it is machine readable. */
  updated: string;
  intro: ReactNode;
}) {
  const ids = sections.map((s) => slugify(s.heading));
  const updatedLabel = new Date(updated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="section flush-top">
      <div className="wrap legal-grid">
        <nav className="legal-toc reveal" aria-label="Sections of this document">
          <h2>On this page</h2>
          <ol>
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#${ids[i]}`}>
                  <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="legal-body reveal">
          <p className="legal-updated">
            Last updated <time dateTime={updated}>{updatedLabel}</time>
          </p>
          <div className="prose legal-intro">{intro}</div>

          <ol className="legal-sections">
            {sections.map((s, i) => (
              <li key={s.heading} id={ids[i]}>
                <h2>
                  <span className="legal-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </h2>
                <div className="prose">
                  {s.body.map((block, j) =>
                    typeof block === "string" ? (
                      <p key={j}>{block}</p>
                    ) : (
                      <ul key={j} className="legal-list">
                        {block.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
