import type { TPortfolioItem, TService, TSettings } from "@/types";
import { contactLinks } from "./contact";
import { SITE } from "./site";

const base = () => SITE.url.replace(/\/$/, "");

/**
 * Organization + WebSite, emitted once from the root layout. Search engines use
 * this for the knowledge panel and sitelinks; the social profile list is what
 * ties the site to the agency's Facebook/LinkedIn identities.
 */
export function organizationSchema(settings: TSettings) {
  const c = contactLinks(settings);
  const url = base();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${url}/#organization`,
        name: SITE.name,
        alternateName: SITE.shortName,
        url,
        description: SITE.description,
        logo: `${url}/icon.svg`,
        image: `${url}/opengraph-image`,
        email: settings.contactEmail || SITE.email,
        telephone: settings.contactPhone || SITE.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "BD",
          ...(settings.officeAddress ? { streetAddress: settings.officeAddress } : {}),
        },
        areaServed: "Worldwide",
        priceRange: "$$",
        sameAs: c.socials.length ? c.socials.map((s) => s.url) : [SITE.facebook],
        knowsAbout: [
          "Web development",
          "E-commerce development",
          "Mobile app development",
          "Custom SaaS development",
          "UI/UX design",
          "AI automation",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE.name,
        publisher: { "@id": `${url}/#organization` },
        inLanguage: "en",
      },
    ],
  };
}

export function serviceSchema(service: TService) {
  const url = base();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    url: `${url}/services/${service.slug}`,
    serviceType: service.title,
    provider: { "@type": "Organization", "@id": `${url}/#organization`, name: SITE.name },
    areaServed: "Worldwide",
  };
}

export function caseStudySchema(item: TPortfolioItem) {
  const url = base();
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.description,
    url: `${url}/work/${item.slug}`,
    ...(item.thumbnail ? { image: item.thumbnail } : {}),
    creator: { "@type": "Organization", "@id": `${url}/#organization`, name: SITE.name },
    ...(item.techStack?.length ? { keywords: item.techStack.join(", ") } : {}),
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  const url = base();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${url}${c.path}`,
    })),
  };
}
