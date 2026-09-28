import type { Metadata } from "next";
import { pageOg } from "@/lib/site";
import { Motion } from "@/components/motion/Motion";
import { CTA } from "@/components/sections/CTA";
import { PageHero } from "@/components/sections/PageHero";
import { Pipeline } from "@/components/sections/Pipeline";
import { ServicesGrid } from "@/components/sections/ServiceCard";
import { getServices, getSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, e-commerce, mobile apps, UI/UX, SaaS products, full stack engineering, AI integration and automation, delivered by one in-house team.",
  alternates: { canonical: "/services" },
  openGraph: pageOg("/services"),
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything a product needs, <span className="grad">under one roof</span>
          </>
        }
        lead="Pick one service or hand us the whole build. Either way it's the same in-house team from scope to support, with no subcontractors in between."
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
      />
      <section className="section flush-top">
        <div className="wrap">
          <ServicesGrid services={services} />
        </div>
      </section>
      <Pipeline />
      <div style={{ height: "var(--sp-7)" }} />
      <CTA settings={settings} />
      <Motion />
    </>
  );
}
