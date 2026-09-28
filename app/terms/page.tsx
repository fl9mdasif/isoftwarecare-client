import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { Motion } from "@/components/motion/Motion";
import { PageHero } from "@/components/sections/PageHero";
import { LEGAL_UPDATED, TERMS } from "@/lib/legal";
import { SITE, pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern enquiries, proposals and engagements with ${SITE.name} — scope, payment, intellectual property and liability.`,
  alternates: { canonical: "/terms" },
  openGraph: pageOg("/terms"),
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms &amp; <span className="grad">conditions</span>
          </>
        }
        lead="Plain-English terms covering how we quote, what you own, how we get paid and what happens when something goes wrong."
        crumbs={[{ href: "/", label: "Home" }, { label: "Terms" }]}
      />
      <LegalDoc
        sections={TERMS}
        updated={LEGAL_UPDATED}
        intro={
          <p>
            We have tried to write these in language you can actually read. If anything here is unclear, ask before you
            sign — see also our <Link href="/privacy">privacy policy</Link>.
          </p>
        }
      />
      <Motion />
    </>
  );
}
