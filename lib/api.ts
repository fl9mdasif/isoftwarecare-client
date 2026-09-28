import "server-only";
import type { TPortfolioItem, TService, TSettings, TTestimonial } from "@/types";
import { FALLBACK_PORTFOLIO, FALLBACK_SERVICES, FALLBACK_SETTINGS, FALLBACK_TESTIMONIALS } from "./fallback";
import { API_URL } from "./site";

const REVALIDATE = 300;

type Envelope<T> = { success: boolean; data: T };

async function get<T>(path: string, tag: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: REVALIDATE, tags: [tag] },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as Envelope<T>;
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

const orFallback = <T>(list: T[] | null, fallback: T[]) => (list && list.length ? list : fallback);

export async function getServices() {
  return orFallback(await get<TService[]>("/services", "services"), FALLBACK_SERVICES);
}

export async function getService(slug: string) {
  const live = await get<TService>(`/services/${encodeURIComponent(slug)}`, "services");
  return live ?? FALLBACK_SERVICES.find((s) => s.slug === slug) ?? null;
}

export async function getPortfolio(params: { featured?: boolean } = {}) {
  const qs = params.featured ? "?isFeatured=true" : "";
  const live = await get<TPortfolioItem[]>(`/portfolio${qs}`, "portfolio");
  if (live && live.length) return live;
  if (params.featured) {
    const all = await get<TPortfolioItem[]>("/portfolio", "portfolio");
    if (all && all.length) return all.slice(0, 3);
  }
  return FALLBACK_PORTFOLIO;
}

export async function getPortfolioItem(slug: string) {
  const live = await get<TPortfolioItem>(`/portfolio/${encodeURIComponent(slug)}`, "portfolio");
  return live ?? FALLBACK_PORTFOLIO.find((p) => p.slug === slug) ?? null;
}

export async function getTestimonials() {
  return orFallback(await get<TTestimonial[]>("/testimonials", "testimonials"), FALLBACK_TESTIMONIALS);
}

export async function getSettings(): Promise<TSettings> {
  const live = await get<TSettings>("/settings", "settings");
  const merged = { ...FALLBACK_SETTINGS };
  if (live) {
    for (const [k, v] of Object.entries(live)) {
      if (v !== undefined && v !== null && v !== "" && !(Array.isArray(v) && v.length === 0)) {
        (merged as Record<string, unknown>)[k] = v;
      }
    }
  }
  return merged;
}
