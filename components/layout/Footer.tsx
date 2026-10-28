import Link from "next/link";
import type { TService, TSettings } from "@/types";
import { SITE } from "@/lib/site";
import { contactLinks } from "@/lib/contact";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export function Footer({ settings, services }: { settings: TSettings; services: TService[] }) {
  const c = contactLinks(settings);
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-about">
            <Link href="/" className="brand">
              <Logo />
              {SITE.name}
            </Link>
            <p>
              A software team building custom websites, e-commerce platforms, mobile apps, SaaS products and AI chatbots for businesses worldwide.
            </p>

            {/* WP + FB icon only */}
            <ul className="foot-icons">
              {c.whatsapp && (
                <li>
                  <a
                    href={c.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with us on WhatsApp"
                    title="WhatsApp"
                  >
                    <Icon name="whatsapp" />
                  </a>
                </li>
              )}
              {c.socials
                .filter((s) => s.platform.toLowerCase() === "facebook")
                .map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform} title={s.platform}>
                      <Icon name={s.icon} />
                    </a>
                  </li>
                ))}
            </ul>

            {/* Email icon + text */}
            <a href="mailto:hello@isoftwarecare.com" className="foot-contact-row">
              <Icon name="mail" />
              hello@isoftwarecare.com
            </a>

            {/* Location */}
            {c.address && (
              <p className="foot-contact-row">
                <Icon name="pin" />
                {c.address}
              </p>
            )}

            <Link href="/contact" className="btn btn-ghost btn-sm foot-contact-btn">
              Contact us
              <Icon name="arrow" strokeWidth={2} />
            </Link>
          </div>

          <div>
            <h2>Services</h2>
            <ul>
              {services.slice(0, 8).map((s) => (
                <li key={s._id}>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/#process">Process</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/about">About us</Link>
              </li>
              <li>
                <Link href="/book">Book a meeting</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-bot">
          <span>
            © {year} {SITE.name}. All rights reserved.
          </span>
          <nav className="foot-legal" aria-label="Legal">
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
