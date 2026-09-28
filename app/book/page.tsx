import type { Metadata } from "next";
import { CalInline } from "@/components/booking/CalInline";
import { LeadForm } from "@/components/forms/LeadForm";
import { Motion } from "@/components/motion/Motion";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { getServices, getSettings } from "@/lib/api";
import { contactLinks } from "@/lib/contact";
import { CAL, SITE, pageOg } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a meeting",
  description: `Pick a 30-minute slot with the ${SITE.name} team. Google Meet, no sales pitch — you get a straight read on scope, timeline and cost.`,
  alternates: { canonical: "/book" },
  openGraph: pageOg("/book"),
};

const EXPECT = [
  {
    icon: "checkCircle",
    t: "You talk, we listen first",
    d: "Fifteen minutes on what you're building, who it's for and what's blocking it. No slide deck from our side.",
  },
  {
    icon: "scope",
    t: "A straight read on scope",
    d: "Rough phases, what we'd cut from v1, and where the real risk sits. Honest even when the answer is \"this is simpler than you think\".",
  },
  {
    icon: "plan",
    t: "Real numbers, out loud",
    d: "A budget range and a timeline before you leave the call. If we aren't the right fit, we'll say so and point you elsewhere.",
  },
];

export default async function BookPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  const c = contactLinks(settings);

  return (
    <>
      <PageHero
        eyebrow="Book a meeting"
        title={
          <>
            Thirty minutes, <span className="grad">one engineer</span>
          </>
        }
        lead="Pick any open slot. You'll get a Google Meet invite in your calendar straight away, and a person who has actually built this kind of thing on the other end."
        crumbs={[{ href: "/", label: "Home" }, { label: "Book a meeting" }]}
      />

      <section className="section flush-top">
        <div className="wrap book-layout">
          <aside className="book-aside reveal">
            <h2>What the call covers</h2>
            <ul className="expect">
              {EXPECT.map((e) => (
                <li key={e.t}>
                  <span className="expect-ico">
                    <Icon name={e.icon} />
                  </span>
                  <div>
                    <b>{e.t}</b>
                    <span>{e.d}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="book-alt">
              <small>Rather not book a slot?</small>
              <div className="book-alt-links">
                {c.whatsapp && (
                  <a href={c.whatsapp.href} target="_blank" rel="noopener noreferrer">
                    <Icon name="whatsapp" /> WhatsApp
                  </a>
                )}
                {c.email && (
                  <a href={c.email.href}>
                    <Icon name="mail" /> Email
                  </a>
                )}
              </div>
            </div>
          </aside>

          <div className="book-main reveal">
            {CAL.link ? (
              <CalInline />
            ) : (
              <>
                <h2 className="book-fallback-head">Send us the details instead</h2>
                <p className="book-note">
                  Live booking is being set up. Leave your project details and we&apos;ll come back with times that
                  suit you, within one business day.
                </p>
                <LeadForm services={services.map((s) => ({ id: s._id, title: s.title }))} />
              </>
            )}
          </div>
        </div>
      </section>
      <Motion />
    </>
  );
}
