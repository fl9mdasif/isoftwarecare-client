import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2";
};

export function SectionHead({ eyebrow, title, lead, as: H = "h2" }: Props) {
  return (
    <div className="sec-head reveal">
      <span className="eyebrow">{eyebrow}</span>
      <H>{title}</H>
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}
