import type { Metadata } from "next";
import { pageOg } from "@/lib/site";
import { Motion } from "@/components/motion/Motion";
import { CTA } from "@/components/sections/CTA";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { WorkBrowser } from "@/components/sections/WorkBrowser";
import { getPortfolio, getSettings, getTestimonials } from "@/lib/api";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects: e-commerce platforms, inventory systems, SaaS products and AI assistants built by Interactive Software Care.",
  alternates: { canonical: "/work" },
  openGraph: pageOg("/work"),
};

export default async function WorkPage() {
  const [items, testimonials, settings] = await Promise.all([getPortfolio(), getTestimonials(), getSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={
          <>
            Projects that are <span className="grad">live and earning</span>
          </>
        }
        lead="A selection of platforms, products and automations our team has shipped. Some clients are anonymised under NDA; the work is real."
        crumbs={[{ href: "/", label: "Home" }, { label: "Work" }]}
      />
      <section className="section flush-top">
        <div className="wrap">
          <WorkBrowser items={items} />
        </div>
      </section>
      <Testimonials items={testimonials} />
      <CTA settings={settings} title="Want results like these?" />
      <Motion />
    </>
  );
}
