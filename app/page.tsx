import Link from "next/link";
import { Motion } from "@/components/motion/Motion";
import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Pipeline } from "@/components/sections/Pipeline";
import { ServicesGrid } from "@/components/sections/ServiceCard";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProjectStack } from "@/components/sections/ProjectStack";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { getPortfolio, getServices, getSettings, getTestimonials } from "@/lib/api";
import { categoryName } from "@/lib/utils";

export default async function HomePage() {
  const [services, featured, allWork, testimonials, settings] = await Promise.all([
    getServices(),
    getPortfolio({ featured: true }),
    getPortfolio(),
    getTestimonials(),
    getSettings(),
  ]);

  const shipped = Math.max(8, allWork.length);
  const industries = new Set(allWork.map((w) => categoryName(w.category)).filter(Boolean)).size;

  return (
    <>
      <Hero projects={shipped} />
      <Marquee items={services.map((s) => s.title)} />

      <section className="section" id="services">
        <div className="wrap">
          <SectionHead
            eyebrow="What we do"
            title="Full-cycle software, one team"
            lead="From the first sketch to the day it's live and growing. No handoffs between agencies, no one juggling five roles at once."
          />
          <ServicesGrid services={services} />
        </div>
      </section>

      <Pipeline />


      {/* projects  */}
      {/* <section className="section" id="work">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead
              eyebrow="Recent work"
              title="Selected projects"
              lead="Work delivered by our team, both under the agency and individually before it."
            />
            <Link href="/work" className="btn btn-ghost reveal">
              All projects
              <Icon name="arrow" strokeWidth={2} />
            </Link>
          </div>
          <ProjectStack items={featured.slice(0, 5)} />
        </div>
      </section> */}

      <Stats
        items={[
          { value: 6, label: "Specialists on team" },
          { value: shipped, label: "Live projects shipped" },
          { value: Math.max(4, industries), suffix: "+", label: "Industries served" },
          { value: "100%", label: "In-house delivery" },
        ]}
      />
      <Testimonials items={testimonials} />
      <CTA settings={settings} />
      <Motion />
    </>
  );
}
