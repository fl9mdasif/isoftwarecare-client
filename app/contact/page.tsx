import type { Metadata } from "next";
import { BookMeeting } from "@/components/booking/BookMeeting";
import { CalInline } from "@/components/booking/CalInline";
import { LeadForm } from "@/components/forms/LeadForm";
import { Motion } from "@/components/motion/Motion";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { LocationMap } from "@/components/ui/LocationMap";
import { getServices, getSettings } from "@/lib/api";
import { contactLinks } from "@/lib/contact";
import { CAL, pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you're building. You'll get a clear scope and timeline back within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: pageOg("/contact"),
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const [{ service }, services, settings] = await Promise.all([searchParams, getServices(), getSettings()]);
  const c = contactLinks(settings);
  const preselected = services.find((s) => s.slug === service || s._id === service)?._id;

  const channels = [
    c.email && { icon: "mail", label: "Email", value: c.email.label, href: c.email.href },
    c.whatsapp && { icon: "whatsapp", label: "WhatsApp", value: c.whatsapp.label, href: c.whatsapp.href, external: true },
    c.phone && { icon: "phone", label: "Phone", value: c.phone.label, href: c.phone.href },
  ].filter(Boolean) as { icon: string; label: string; value: string; href: string; external?: boolean }[];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s scope <span className="grad">your project</span>
          </>
        }
        lead="Tell us what you're building. You'll get a clear scope and timeline back within one business day, not a sales pitch."
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
      />

      <section className="section flush-top">
        <div className="wrap contact-grid">
          <div className="reveal">
            <h2 style={{ fontSize: "1.5rem" }}>Prefer to talk directly?</h2>
            <p className="book-note">Pick a slot for a 30-minute Google Meet call. The invite lands in your calendar straight away.</p>
            <BookMeeting label="Book a Google Meet call" />
            <ul className="channels">
              {channels.map((ch) => (
                <li key={ch.label}>
                  <a href={ch.href} {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <span className="ch-ico">
                      <Icon name={ch.icon} />
                    </span>
                    <span>
                      <small>{ch.label}</small>
                      <b>{ch.value}</b>
                    </span>
                  </a>
                </li>
              ))}
              {c.address && (
                <li>
                  <a href={`https://maps.google.com/?q=${encodeURIComponent(c.address)}`} target="_blank" rel="noopener noreferrer">
                    <span className="ch-ico">
                      <Icon name="pin" />
                    </span>
                    <span>
                      <small>Office</small>
                      <b>{c.address}</b>
                    </span>
                  </a>
                </li>
              )}
            </ul>
            <ul className="promise">
              {[
                "Reply within one business day, from an engineer, not a sales rep.",
                "Written scope and fixed quote before any work starts.",
                "Happy to sign an NDA before you share details.",
              ].map((p) => (
                <li key={p}>
                  <Icon name="checkCircle" />
                  {p}
                </li>
              ))}
            </ul>
            <LocationMap />
          </div>

          <div className="reveal">
            <LeadForm services={services.map((s) => ({ id: s._id, title: s.title }))} defaultServiceId={preselected} />
          </div>
        </div>
      </section>

      {CAL.link && (
        <section className="section flush-top" id="book">
          <div className="wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Or pick a slot now</span>
              <h2>
                Open times this <span className="grad">week</span>
              </h2>
              <p>A 30-minute Google Meet call. The invite lands in your calendar as soon as you confirm.</p>
            </div>
            <CalInline />
          </div>
        </section>
      )}
      <Motion />
    </>
  );
}
