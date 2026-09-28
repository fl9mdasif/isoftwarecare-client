import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Motion } from "@/components/motion/Motion";
import { CTA } from "@/components/sections/CTA";
import { PageHero } from "@/components/sections/PageHero";
import { TestimonialCard } from "@/components/sections/Testimonials";
import { WorkGrid } from "@/components/sections/WorkCard";
import { CldImg } from "@/components/ui/CldImg";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPortfolio, getPortfolioItem, getSettings, getTestimonials } from "@/lib/api";
import { cld } from "@/lib/cloudinary";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import { pageOg } from "@/lib/site";
import { categoryId, categoryName } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await getPortfolio();
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);
  if (!item) return {};
  const image = item.thumbnail ? cld(item.thumbnail, { w: 1200, h: 630 }) : undefined;
  return {
    title: item.metaTitle || item.title,
    description: item.metaDescription || item.description,
    alternates: { canonical: `/work/${item.slug}` },
    openGraph: pageOg(`/work/${item.slug}`, image ? { images: [{ url: image, width: 1200, height: 630 }] } : {}),
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);
  if (!item) notFound();

  const [all, testimonials, settings] = await Promise.all([getPortfolio(), getTestimonials(), getSettings()]);
  const cat = categoryName(item.category);
  const catId = categoryId(item.category);
  const more = all
    .filter((w) => w.slug !== item.slug)
    .sort((a, b) => Number(categoryId(b.category) === catId) - Number(categoryId(a.category) === catId))
    .slice(0, 3);
  const quote = testimonials.find((t) => {
    const ref = t.relatedPortfolioItem;
    return ref && (typeof ref === "string" ? ref === item._id : ref._id === item._id || ref.slug === item.slug);
  });

  return (
    <>
      <JsonLd data={caseStudySchema(item)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: item.title, path: `/work/${item.slug}` },
        ])}
      />
      <PageHero
        eyebrow={cat ?? "Case study"}
        title={item.title}
        lead={item.description}
        crumbs={[{ href: "/", label: "Home" }, { href: "/work", label: "Work" }, { label: item.title }]}
      />

      <section className="section flush-top">
        <div className="wrap">
          {item.thumbnail ? (
            <div className="case-cover reveal">
              <CldImg src={item.thumbnail} alt={`${item.title} preview`} w={1600} h={900} sizes="(max-width: 1240px) 100vw, 1192px" priority />
            </div>
          ) : (
            <div className="case-cover work-vis w1 reveal" aria-hidden="true" style={{ minHeight: 0 }} />
          )}

          <div className="detail-grid">
            <div>
              <div className="prose reveal">
                {item.description
                  .split(/\n\s*\n/)
                  .filter(Boolean)
                  .map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
              </div>

              {item.gallery && item.gallery.length > 0 && (
                <div className="gallery" data-stagger>
                  {item.gallery.map((src, i) => (
                    <figure key={src} style={{ position: "relative" }}>
                      <CldImg src={src} alt={`${item.title} screen ${i + 1}`} w={900} h={560} sizes="(max-width: 620px) 100vw, 50vw" />
                    </figure>
                  ))}
                </div>
              )}

              {quote && (
                <div style={{ marginTop: 56 }} className="reveal">
                  <TestimonialCard t={quote} />
                </div>
              )}
            </div>

            <aside className="aside-card reveal" aria-label="Project facts">
              <ul className="facts">
                {item.client && (
                  <li>
                    <span>Client</span>
                    <b>{item.client}</b>
                  </li>
                )}
                {cat && (
                  <li>
                    <span>Category</span>
                    <b>{cat}</b>
                  </li>
                )}
                {item.liveUrl && (
                  <li>
                    <span>Live</span>
                    <b>
                      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                        Visit site ↗
                      </a>
                    </b>
                  </li>
                )}
              </ul>
              {item.techStack?.length > 0 && (
                <>
                  <h3 style={{ fontSize: ".7rem", fontFamily: "var(--mono)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-dim)", fontWeight: 500, margin: "18px 0 12px" }}>
                    Stack
                  </h3>
                  <div className="chips">
                    {item.techStack.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              )}
              <Link href="/contact" className="btn btn-solid" style={{ marginTop: 24 }}>
                Build something similar
                <Icon name="arrow" strokeWidth={2} />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section flush-top">
          <div className="wrap">
            <h2 className="sub-h reveal" style={{ marginTop: 0 }}>
              More projects
            </h2>
            <WorkGrid items={more} />
          </div>
        </section>
      )}

      <CTA settings={settings} />
      <Motion />
    </>
  );
}
