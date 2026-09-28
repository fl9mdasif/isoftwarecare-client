import type { Metadata } from "next";
import Link from "next/link";
import { BookMeeting } from "@/components/booking/BookMeeting";
import { Motion } from "@/components/motion/Motion";
import { CTA } from "@/components/sections/CTA";
import { PageHero } from "@/components/sections/PageHero";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHead } from "@/components/ui/SectionHead";
import { getPortfolio, getServices, getSettings, getTestimonials } from "@/lib/api";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE, pageOg } from "@/lib/site";
import { categoryName } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.name} is a Dhaka-based software, AI and SaaS engineering team. Six specialists, one accountable group, no subcontracting.`,
  alternates: { canonical: "/about" },
  openGraph: pageOg("/about"),
};

const PRINCIPLES = [
  {
    icon: "scope",
    title: "Scope before code",
    body: "Every engagement starts with a written scope and a fixed quote. You approve what you are buying before anyone opens an editor, and change requests get priced instead of absorbed.",
  },
  {
    icon: "context",
    title: "One team, no handoffs",
    body: "Design, frontend, backend and deployment sit in the same group of six. Nothing falls through the gap between two agencies, and you are never the one relaying messages between vendors.",
  },
  {
    icon: "review",
    title: "An engineer answers you",
    body: "The person who replies to your enquiry is the person who will build the thing. No account manager relaying questions to a team you never meet.",
  },
  {
    icon: "ship",
    title: "Shipped beats perfect",
    body: "We cut v1 down to what proves the idea, get it live, then iterate on real usage. A feature nobody uses is a feature we talked you out of building.",
  },
  {
    icon: "checkCircle",
    title: "Handover, not lock-in",
    body: "We build on conventional, portable tooling and hand over source, designs and documentation. What transfers and when is written into every proposal, so nothing about ownership is a surprise at the end.",
  },
  {
    icon: "architect",
    title: "Readable by the next team",
    body: "Boring, conventional code and documentation that matches it. If you hire in-house engineers next year, they should be able to pick this up without calling us first.",
  },
];

const DISCIPLINES = [
  { label: "Product & UX", detail: "Discovery, user flows, wireframes, design systems" },
  { label: "Frontend", detail: "React, Next.js, TypeScript, accessible component libraries" },
  { label: "Backend", detail: "Node, Express, REST APIs, authentication, role-based access" },
  { label: "Data", detail: "MongoDB, PostgreSQL, schema design, reporting and dashboards" },
  { label: "AI & automation", detail: "RAG assistants, workflow automation, model integration" },
  { label: "Delivery", detail: "CI/CD, cloud deployment, monitoring, handover documentation" },
];

export default async function AboutPage() {
  const [settings, services, work, testimonials] = await Promise.all([
    getSettings(),
    getServices(),
    getPortfolio(),
    getTestimonials(),
  ]);

  const shipped = Math.max(8, work.length);
  const industries = new Set(work.map((w) => categoryName(w.category)).filter(Boolean)).size;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHero
        eyebrow="About us"
        title={
          <>
            A small team that <span className="grad">finishes things</span>
          </>
        }
        lead="Interactive Software Care is six specialists in Dhaka building web platforms, mobile apps, custom SaaS and AI automation for clients who need the thing actually shipped."
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />

      <section className="section flush-top">
        <div className="wrap detail-grid">
          <div className="prose reveal">
            <p>
              Most agencies this size are three people and a network of freelancers. We went the other way: a fixed team
              that covers product, design, frontend, backend and deployment in-house, taking on fewer projects so each
              one gets people who are actually available.
            </p>
            <p>
              The team formed out of work we were already doing independently — e-commerce platforms, inventory systems,
              internal tools for logistics and education businesses. The pattern was always the same. Clients had been
              burned by someone who disappeared at 80%, or who built something nobody on their side could maintain. So
              the agency was set up around fixing that specifically: <strong>a written scope, a fixed price, one team
              accountable end to end, and a handover that leaves you able to maintain what we built.</strong>
            </p>
            <p>
              We work with founders and operators, not procurement departments. That means straight answers about what
              something costs and how long it takes — including when the honest answer is that you do not need us, or
              that the problem is simpler than you have been told.
            </p>
            <p>
              We are based in Dhaka, on GMT+6. That gives us a full working overlap with the Gulf, most of the
              European day, and an early-morning window with the UK. For clients in North America we schedule calls
              into our evening rather than pretending the timezones line up — and we keep written updates detailed
              enough that you are never blocked waiting for one.
            </p>
          </div>

          <aside className="aside-card reveal" aria-labelledby="at-a-glance">
            <h2 id="at-a-glance">At a glance</h2>
            <ul className="facts">
              <li>
                <span>Based in</span>
                <b>Dhaka, Bangladesh</b>
              </li>
              <li>
                <span>Team</span>
                <b>6 specialists, in-house</b>
              </li>
              <li>
                <span>Focus</span>
                <b>Web, mobile, SaaS, AI</b>
              </li>
              <li>
                <span>Engagements</span>
                <b>Fixed-scope or retainer</b>
              </li>
              <li>
                <span>Timezone</span>
                <b>GMT+6 · overlaps Gulf, EU, UK</b>
              </li>
              <li>
                <span>Languages</span>
                <b>English, Bangla</b>
              </li>
            </ul>
            <BookMeeting label="Talk to the team" />
          </aside>
        </div>
      </section>

      <section className="section" id="principles">
        <div className="wrap">
          <SectionHead
            eyebrow="How we work"
            title="Six things we do not compromise on"
            lead="These are not values on a wall. Each one exists because we have watched a project go wrong without it."
          />
          <ul className="principles" data-stagger>
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="principle">
                <span className="principle-ico" aria-hidden="true">
                  <Icon name={p.icon} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Stats
        items={[
          { value: 6, label: "Specialists on team" },
          { value: shipped, label: "Live projects shipped" },
          { value: Math.max(4, industries), suffix: "+", label: "Industries served" },
          { value: "100%", label: "In-house delivery" },
        ]}
      />

      <section className="section" id="disciplines">
        <div className="wrap">
          <div className="sec-head-row">
            <SectionHead
              eyebrow="Covered in-house"
              title="What sits under one roof"
              lead="The whole path from an idea to a maintained product in production, without a single handoff to an outside vendor."
            />
            <Link href="/services" className="btn btn-ghost reveal">
              All services
              <Icon name="arrow" strokeWidth={2} />
            </Link>
          </div>
          <ul className="disciplines" data-stagger>
            {DISCIPLINES.map((d) => (
              <li key={d.label}>
                <Icon name="checkCircle" aria-hidden="true" />
                <div>
                  <b>{d.label}</b>
                  <span>{d.detail}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="disciplines-note reveal">
            Currently offering {services.length} service lines. If what you need is not on the list, ask anyway — we
            will tell you honestly whether it is something we should be doing.
          </p>
        </div>
      </section>

      <Testimonials items={testimonials} />
      <CTA settings={settings} />
      <Motion />
    </>
  );
}
