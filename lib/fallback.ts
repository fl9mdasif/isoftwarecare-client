import type { TPortfolioItem, TService, TSettings, TTestimonial } from "@/types";
import { SITE } from "./site";

const svc = (
  order: number,
  slug: string,
  icon: string,
  title: string,
  shortDescription: string,
  fullDescription: string,
): TService => ({
  _id: `fallback-svc-${slug}`,
  order,
  slug,
  icon,
  title,
  shortDescription,
  fullDescription,
  isActive: true,
});

export const FALLBACK_SERVICES: TService[] = [
  svc(
    1,
    "web-development",
    "web",
    "Web Development",
    "Dynamic, 3D, Custom Business sites, landing pages and web platforms built for real traffic, not demo day. Fast, indexed, easy to update, and handed over with documentation instead of a mystery codebase.",
    "We build marketing sites, landing pages and full web platforms on a modern stack (Next.js, Node, Postgres or MongoDB).\n\nEvery build ships with performance budgets, technical SEO, analytics wired in, and a CMS or admin panel so your team can update content without calling us. You get the repository, the documentation and the deployment, not a black box.",
  ),
  svc(
    2,
    "e-commerce",
    "ecommerce",
    "E-commerce",
    "Storefronts with checkout, inventory sync and order tracking that hold up when orders actually start coming in.",
    "Custom storefronts and headless commerce with local payment gateways, courier integrations, inventory sync and order tracking.\n\nWe design for the day orders spike: caching, queueing and an admin that your operations team can actually run the business from.",
  ),
  svc(
    3,
    "app-development",
    "app",
    "App Development",
    "Android and iOS builds from a shared codebase, shipped to the stores with the backend and release process handled.",
    "Cross-platform mobile apps built from one codebase, with the API, push notifications, analytics and store submission handled end to end.\n\nWe set up the release pipeline so updates ship in hours, not weeks.",
  ),
  svc(
    4,
    "ui-ux-design",
    "uiux",
    "UI/UX Design",
    "Interfaces designed for clarity first and decoration second, with prototypes you review before a line of code is written.",
    "Research, wireframes, a design system and clickable prototypes you can put in front of real users before development starts.\n\nEvery screen is designed with the build in mind, so what you approve is what ships.",
  ),
  svc(
    5,
    "saas-products",
    "saas",
    "SaaS Products",
    "Multi-tenant products with billing, roles and dashboards. From an idea on a call to a working v1 your users can pay for.",
    "We take a SaaS idea from scope to a paying v1: multi-tenancy, subscription billing, roles and permissions, onboarding and an admin console.\n\nThe architecture is chosen so v2 is an iteration, not a rewrite.",
  ),
  svc(
    6,
    "full-stack-development",
    "fullstack",
    "Full Stack Development",
    "Frontend, backend, database and infrastructure handled together, so nothing falls into the gap between two vendors.",
    "One team owns the whole stack: interface, API, database, infrastructure and CI/CD.\n\nThat means one person to call when something needs to change, and no finger-pointing between a frontend agency and a backend contractor.",
  ),
  svc(
    7,
    "ai-integration",
    "ai",
    "AI Integration",
    "RAG pipelines, model APIs and AI features built into your existing product, grounded in your own data instead of guesswork.",
    "We add AI where it earns its place: retrieval-augmented search over your documents, classification and extraction, summarisation and agent workflows.\n\nEverything is grounded in your own data, evaluated before launch and monitored after it.",
  ),
  svc(
    8,
    "ai-chatbot-automation",
    "chatbot",
    "AI Chatbot & Automation",
    "Chatbots for Messenger, WhatsApp and your site that answer from your own content, plus workflow automation that ends the repetitive manual work.",
    "Customer-facing chatbots on Messenger, WhatsApp and your website that answer from your own knowledge base and hand over to a human when needed.\n\nBehind the scenes, we automate the repetitive work: order updates, lead routing, reporting and data entry between the tools you already use.",
  ),
];

export const FALLBACK_PORTFOLIO: TPortfolioItem[] = [
  {
    _id: "fallback-work-courier",
    title: "Courier & E-commerce Platform",
    slug: "courier-ecommerce-platform",
    client: "E-commerce client",
    description: "Multi-tenant storefront with order tracking, inventory sync and a delivery dashboard.",
    techStack: ["Next.js", "Node", "Postgres"],
    thumbnail: "",
    category: { _id: "fallback-cat-ecom", name: "E-commerce / SaaS", slug: "ecommerce" },
    isFeatured: true,
    order: 1,
  },
  {
    _id: "fallback-work-inventory",
    title: "Smart Inventory System",
    slug: "smart-inventory-system",
    client: "Distribution business",
    description: "Variant-level stock and roll tracking for a distribution business, replacing spreadsheets.",
    techStack: ["React", "REST API", "Dashboard"],
    thumbnail: "",
    category: { _id: "fallback-cat-inv", name: "Internal Tools", slug: "internal-tools" },
    isFeatured: true,
    order: 2,
  },
  {
    _id: "fallback-work-ai",
    title: "AI Reply Assistant",
    slug: "ai-reply-assistant",
    description: "RAG-powered assistant that drafts customer replies from a company's own knowledge base.",
    techStack: ["RAG", "Vector DB", "Automation"],
    thumbnail: "",
    category: { _id: "fallback-cat-ai", name: "AI / SaaS", slug: "ai" },
    isFeatured: true,
    order: 3,
  },
];

export const FALLBACK_TESTIMONIALS: TTestimonial[] = [
  {
    _id: "fallback-t1",
    clientName: "Abu Baker",
    clientCompany: "CEO, Hydraazone",
    quote: "They rebuilt our order flow in three phases and tested each one before moving on. Zero surprises at launch.",
    rating: 5,
    isApproved: true,
    isFeatured: true,
  },
  {
    _id: "fallback-t2",
    clientName: "Razu Ahmed",
    clientCompany: "Founder, Sultan Bazar",
    quote: "Finally a dev team that explains the tradeoffs instead of just saying yes to everything.",
    rating: 5,
    isApproved: true,
    isFeatured: true,
  },
];

export const FALLBACK_SETTINGS: TSettings = {
  contactEmail: SITE.email,
  contactPhone: SITE.phone,
  whatsappNumber: SITE.whatsapp,
  officeAddress: SITE.address,
  socialLinks: [{ platform: "facebook", url: SITE.facebook }],
};
