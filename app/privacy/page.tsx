import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/legal/LegalDoc";
import { Motion } from "@/components/motion/Motion";
import { PageHero } from "@/components/sections/PageHero";
import { LEGAL_UPDATED, PRIVACY } from "@/lib/legal";
import { SITE, pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `What ${SITE.name} collects through this website, why, who processes it, how long it is kept and how to have it deleted.`,
  alternates: { canonical: "/privacy" },
  openGraph: pageOg("/privacy"),
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Privacy <span className="grad">policy</span>
          </>
        }
        lead="What we collect when you contact us, who else touches it, how long we keep it, and how to make us delete it."
        crumbs={[{ href: "/", label: "Home" }, { label: "Privacy" }]}
      />
      <LegalDoc
        sections={PRIVACY}
        updated={LEGAL_UPDATED}
        intro={
          <p>
            Short version: we collect what an enquiry needs, we use it to reply to you, we do not sell it, and you can
            have it deleted by asking. The detail is below, and our <Link href="/terms">terms</Link> cover the
            commercial side.
          </p>
        }
      />
      <Motion />
    </>
  );
}
