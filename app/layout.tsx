import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Ambient } from "@/components/layout/Ambient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { Analytics, GtmNoScript } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/ui/JsonLd";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { organizationSchema } from "@/lib/schema";
import { getServices, getSettings } from "@/lib/api";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

// Next.js allows either `metadata` or `generateMetadata` in a file, not both.
// The verification tag comes from the admin-editable settings document, so the
// whole object is built here rather than declared statically.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    metadataBase: new URL(SITE.url),
    title: { default: `${SITE.name} | Software, AI & SaaS Partner`, template: `%s | ${SITE.name}` },
    description: SITE.description,
    applicationName: SITE.name,
    keywords: [
      "software agency Bangladesh",
      "web development Dhaka",
      "custom SaaS development",
      "mobile app development agency",
      "e-commerce development",
      "AI automation agency",
    ],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    publisher: SITE.name,
    alternates: { canonical: "/" },
    openGraph: { type: "website", siteName: SITE.name, locale: "en_US", url: SITE.url },
    twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    formatDetection: { telephone: false },
    ...(settings.searchConsoleTag ? { verification: { google: settings.searchConsoleTag } } : {}),
  };
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06070A" },
    { media: "(prefers-color-scheme: light)", color: "#F4F6FB" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <GtmNoScript gtmId={settings.gtmId} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <Ambient />
          <Header />
          <main id="main">{children}</main>
          <Footer settings={settings} services={services} />
        </Providers>
        <JsonLd data={organizationSchema(settings)} />
        <Analytics settings={settings} />
      </body>
    </html>
  );
}
