import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Motion } from "@/components/motion/Motion";
import { CTA } from "@/components/sections/CTA";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { WorkGrid } from "@/components/sections/WorkCard";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPortfolio, getService, getServices, getSettings } from "@/lib/api";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { pageOg } from "@/lib/site";
import { categoryId } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle || s.title,
    description: s.metaDescription || s.shortDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: pageOg(`/services/${s.slug}`),
  };
}

const paragraphs = (text: string) =>
  text
    .split(/\n\s*\n|\r\n\s*\r\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const [services, work, settings] = await Promise.all([getServices(), getPortfolio(), getSettings()]);
  const catId = categoryId(service.category);
  const related = catId ? work.filter((w) => categoryId(w.category) === catId).slice(0, 3) : [];
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);
  const body = paragraphs(service.fullDescription || service.shortDescription);

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <PageHero
        eyebrow="Service"
        title={service.title}
        lead={service.shortDescription}
        crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: service.title }]}
      />

      <section className="section flush-top">
        <div className="wrap detail-grid">
          <div className="prose reveal">
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <aside className="aside-card reveal" aria-label="Start this project">
            <h3>Start your {service.title} project</h3>
            <p>Share a few lines about what you need. You&apos;ll get scope, timeline and a fixed quote within one business day.</p>
            <Link href={`/contact?service=${encodeURIComponent(service.slug)}`} className="btn btn-solid">
              Get a free quote
              <Icon name="arrow" strokeWidth={2} />
            </Link>
            <ul className="facts" style={{ marginTop: 22 }}>
              <li>
                <span>Team</span>
                <b>In-house</b>
              </li>
              <li>
                <span>Updates</span>
                <b>Staging URL, weekly demos</b>
              </li>
              <li>
                <span>Handover</span>
                <b>Code, docs, support</b>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section flush-top">
          <div className="wrap">
            <h2 className="sub-h reveal" style={{ marginTop: 0 }}>
              Related work
            </h2>
            <WorkGrid items={related} />
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="section flush-top">
          <div className="wrap">
            <h2 className="sub-h reveal" style={{ marginTop: 0 }}>
              Other services
            </h2>
            <div className="svc-grid">
              {others.map((s) => (
                <ServiceCard key={s._id} service={s} index={services.indexOf(s)} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA settings={settings} href={`/contact?service=${encodeURIComponent(service.slug)}`} />
      <Motion />
    </>
  );
}
