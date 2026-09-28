import type { LegalSection } from "@/components/legal/LegalDoc";
import { SITE } from "./site";

/**
 * Effective date shown on both documents. Bump it whenever the substance
 * changes — not for typo fixes, which would train readers to ignore it.
 */
export const LEGAL_UPDATED = "2026-09-28";

export const TERMS: LegalSection[] = [
  {
    heading: "Who these terms cover",
    body: [
      `${SITE.name} ("we", "us") is a software engineering studio based in ${SITE.address}. These terms govern your use of ${SITE.domain} and any enquiry, proposal or engagement that starts through it.`,
      "They do not replace a signed contract. Where you and we have signed a separate agreement, statement of work or master services agreement, that document takes precedence over anything written here.",
      "Using this site — browsing it, submitting the contact form, or booking a call — means you accept these terms.",
    ],
  },
  {
    heading: "What this website is",
    body: [
      "This site is informational. It describes services we offer and work we have delivered. Nothing on it is a binding offer, a fixed quotation, or a guarantee of availability, price or outcome.",
      "Case studies describe work delivered by our team, both under the agency and individually before it. Metrics and outcomes described are specific to those projects and are not a prediction of your results.",
    ],
  },
  {
    heading: "Enquiries and proposals",
    body: [
      "When you submit the contact form or book a call, you are asking us to assess a project. You are not committing to anything, and neither are we.",
      "We aim to reply within one business day. After an initial call we may issue a written proposal covering scope, deliverables, timeline, assumptions and price. A proposal is valid for 30 days unless stated otherwise, and becomes binding only when both sides accept it in writing and any required deposit has cleared.",
      "You agree that the information you give us about your project is accurate to the best of your knowledge. Scope and price depend on it.",
    ],
  },
  {
    heading: "Fees, invoicing and payment",
    body: [
      "Unless a signed agreement says otherwise, projects are quoted as a fixed price against a defined scope, invoiced in milestones. Retainers and time-and-materials engagements are invoiced monthly in arrears.",
      "Invoices are issued in US dollars and are payable within 14 days of the invoice date. We accept:",
      { list: ["Visa and Mastercard", "Payoneer", "Wise", "PayPal", "Direct bank transfer (SWIFT)"] },
      "Transaction fees charged by the payment provider are borne by the payer. Bank transfers typically settle in two to three business days; card, Payoneer and Wise payments usually clear the same day.",
      "Work does not start until the first milestone payment has cleared. We may pause work on any engagement with an invoice more than 14 days overdue, and will give you written notice before doing so.",
      "Quoted prices exclude taxes, duties and third-party costs (hosting, domains, licences, paid APIs, app-store fees), which are billed at cost or paid by you directly.",
    ],
  },
  {
    heading: "Scope and change requests",
    body: [
      "The proposal defines what is in scope. Anything not described in it is out of scope.",
      "Requests that add to, or materially change, an agreed scope are handled as change requests: we estimate the additional time and cost, you approve it in writing, and the timeline moves accordingly. We will not silently absorb scope, and we will not silently bill for it either.",
      "Each milestone includes two rounds of revisions on the delivered work. Further rounds are billed at our standard hourly rate.",
    ],
  },
  {
    heading: "What we need from you",
    body: [
      "Projects stall on inputs far more often than on engineering. You agree to provide, within a reasonable time:",
      {
        list: [
          "A single named decision-maker empowered to approve work",
          "Content, assets, branding and credentials the build depends on",
          "Access to any third-party accounts, APIs or environments required",
          "Feedback within five business days of a delivery being submitted for review",
        ],
      },
      "You confirm that any content, trademark or data you give us is yours to use, or that you have the licence to use it. You are responsible for the legality of the product you have asked us to build and for how it is used once delivered.",
      "Where you are unresponsive for more than 30 consecutive days, we may treat the engagement as paused and reschedule the remaining work against our then-current availability.",
    ],
  },
  {
    heading: "Timelines",
    body: [
      "Timelines in a proposal are estimates made on stated assumptions, the most important of which is that your inputs and approvals arrive on time.",
      "We will tell you as early as we can when something threatens a date, along with what we propose to do about it. We are not liable for delays caused by late inputs, scope changes, third-party outages, or events outside our reasonable control.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "On full payment of all outstanding invoices for an engagement, ownership of the deliverables built specifically for you transfers to you — source code, designs and documentation produced under that scope.",
      "We retain ownership of anything pre-existing: our internal libraries, tooling, boilerplates, design systems and general know-how. Where such components are embedded in your deliverables, you receive a perpetual, worldwide, non-exclusive licence to use them as part of that product.",
      "Before full payment, all deliverables remain our property and are licensed to you only for review.",
      "Open-source components remain under their own licences. We will tell you which ones a build depends on.",
    ],
  },
  {
    heading: "Confidentiality",
    body: [
      "We treat everything you share about your business, product and users as confidential, and share it only with the people on our team who need it to do the work.",
      "We are happy to sign your NDA before you share details — ask, and we will sign it before the first call rather than after.",
      "This obligation does not cover information that is already public, that you make public, or that we are legally required to disclose.",
    ],
  },
  {
    heading: "Warranty and support",
    body: [
      "We warrant that delivered work will materially perform as described in the accepted scope. For 30 days after a milestone is delivered, we fix defects in that work at no charge.",
      "A defect means the delivered work does not do what the scope says. It does not mean a new requirement, a change of mind, a third-party service changing its behaviour, or a problem caused by changes someone else made to the code.",
      "Beyond that window, ongoing maintenance, monitoring and support are available under a separate retainer.",
      "Except as stated here, the work is provided without further warranties of any kind, to the extent the law allows.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the maximum extent permitted by law, neither party is liable to the other for indirect, incidental, special or consequential losses, or for lost profits, revenue, data or business opportunity, however caused.",
      "Our total aggregate liability arising out of or relating to an engagement is capped at the total fees you have paid us for that engagement in the 12 months preceding the claim.",
      "Nothing in these terms limits liability for fraud, wilful misconduct, or anything else that cannot lawfully be limited.",
    ],
  },
  {
    heading: "Termination",
    body: [
      "Either side may end an engagement with 14 days of written notice.",
      "On termination you pay for all work completed and in progress up to the termination date, plus any non-cancellable third-party costs already committed. Deposits cover work already performed and are non-refundable to that extent; any balance beyond work performed is refunded within 30 days.",
      "On full settlement we hand over the work completed to that point, in whatever state it is in.",
    ],
  },
  {
    heading: "Showing the work",
    body: [
      "Unless you tell us otherwise in writing, we may name you as a client and show non-confidential parts of the work — screenshots, a description, the technology used — in our portfolio and marketing.",
      "If you would rather we did not, say so at any point and we will remove it. We will never publish credentials, user data, internal metrics or anything covered by an NDA.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of Bangladesh, and the courts of Dhaka have exclusive jurisdiction over any dispute arising from them.",
      "Before starting formal proceedings, both sides agree to attempt in good faith to resolve the dispute through direct discussion for at least 30 days.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms as our services change. The version published on this page at the time of your enquiry is the one that applies to it, and the date at the top of this page tells you when it last changed.",
      "Changes never apply retroactively to a signed agreement.",
    ],
  },
  {
    heading: "Contact",
    body: [`Questions about these terms: ${SITE.email}, or write to us at ${SITE.address}.`],
  },
];

export const PRIVACY: LegalSection[] = [
  {
    heading: "Scope of this policy",
    body: [
      `This policy explains what ${SITE.name} does with personal data collected through ${SITE.domain}. It covers visitors to this site and people who contact us through it.`,
      "It does not cover data we process on behalf of a client inside a product we built for them — in that relationship we act as a processor under the client's own privacy policy and our contract with them.",
      `We are the data controller for everything described here. Contact: ${SITE.email}.`,
    ],
  },
  {
    heading: "What we collect",
    body: [
      "We collect only what a business enquiry needs. Specifically:",
      {
        list: [
          "Contact form: your name, email address, and optionally your phone number, the service you are interested in, a budget range, and whatever you write in the message field",
          "The page you submitted the form from, so we know what you were reading when you got in touch",
          "Booking a call: your name, email and chosen time slot, collected by Cal.com rather than by us directly",
          "Server logs: IP address, browser user agent and timestamps, kept by our hosting provider for security and abuse prevention",
          "Analytics, only if enabled: aggregated page views and referrers",
        ],
      },
      "We do not ask for, and have no use for, payment card details through this website. Invoices are paid through the payment providers listed in our terms, each of which handles its own payment data.",
      "We do not knowingly collect special-category data. Please do not put sensitive personal information in the message field.",
    ],
  },
  {
    heading: "Why we use it",
    body: [
      "Your enquiry details are used to reply to you, to scope and quote the work you asked about, and to keep a record of the conversation if it becomes a project.",
      "Server logs are used to keep the site up and to stop abuse — the contact endpoint is rate limited by IP address for that reason.",
      "Analytics, where enabled, are used to understand which pages are useful. They are not used to build a profile of you or to target advertising at you.",
      "We do not sell your data. We do not share it with anyone for their own marketing.",
    ],
  },
  {
    heading: "Legal basis",
    body: [
      "For visitors in the UK, EU and other jurisdictions with equivalent rules, we rely on:",
      {
        list: [
          "Legitimate interests — responding to an enquiry you sent us, and keeping our site secure",
          "Steps prior to entering a contract — preparing a proposal you asked for",
          "Consent — analytics and marketing tags, where those are enabled and you have agreed to them",
          "Legal obligation — keeping financial records for the period tax law requires",
        ],
      },
      "Where we rely on consent, you can withdraw it at any time without affecting processing that already happened.",
    ],
  },
  {
    heading: "Who processes it with us",
    body: [
      "We keep the list of third parties deliberately short. Each one is a processor acting on our instructions:",
      {
        list: [
          "Plunk — sends the notification email to us and the confirmation email to you",
          "Cal.com — runs the booking calendar and issues the meeting invite",
          "MongoDB Atlas — stores enquiry records",
          "Vercel — hosts this website and keeps short-lived request logs",
          "Cloudinary — serves the images on this site; it does not receive your enquiry data",
          "Google Analytics, Google Tag Manager or Meta Pixel — only where an ID has been configured",
        ],
      },
      "We may also disclose data where the law requires it, or to establish or defend a legal claim.",
    ],
  },
  {
    heading: "International transfers",
    body: [
      "We operate from Bangladesh, and the processors above operate in the United States and the European Union. Your data will therefore be transferred outside your own country.",
      "Where data originates in the UK or EEA, those transfers rely on the standard contractual clauses or equivalent safeguards offered by each provider.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiries that do not become projects are deleted within 24 months.",
      "Records relating to an actual engagement are kept for the duration of the relationship and then for as long as tax and accounting law requires.",
      "Server logs are kept for a short rolling window by our host. Analytics data follows the retention setting of the analytics provider.",
      "You can ask us to delete your enquiry sooner. We will, unless we are legally required to keep it.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on where you live, you have the right to:",
      {
        list: [
          "Ask what personal data we hold about you and get a copy",
          "Have inaccurate data corrected",
          "Have your data deleted",
          "Object to, or ask us to restrict, how we use it",
          "Receive your data in a portable format",
          "Withdraw consent for analytics and marketing tags",
          "Complain to your local data protection authority",
        ],
      },
      `To exercise any of these, email ${SITE.email}. We will respond within 30 days and will not charge you for it.`,
    ],
  },
  {
    heading: "Cookies",
    body: [
      "This site sets no cookies of its own. It has no advertising cookies and no cross-site trackers.",
      "If analytics or marketing tags are enabled, those services set their own cookies, and the booking embed sets cookies belonging to Cal.com when you interact with it. You can block or clear these in your browser without breaking the site.",
    ],
  },
  {
    heading: "Security",
    body: [
      "The site is served over HTTPS. The enquiry endpoint is rate limited and validated on the server, and it carries a hidden field that silently discards automated submissions.",
      "Access to stored enquiries is restricted to the people who need it, over authenticated connections.",
      "No system is perfectly secure. If we ever discover a breach affecting your data, we will tell you and the relevant authority as quickly as the law requires.",
    ],
  },
  {
    heading: "Children",
    body: [
      "This is a business-to-business site and is not directed at children. We do not knowingly collect data from anyone under 16. If you believe a child has sent us personal data, contact us and we will delete it.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We update this policy when what we do with data changes. The date at the top of this page shows when it last changed. Material changes affecting people who have already contacted us will be communicated directly.",
    ],
  },
  {
    heading: "Contact",
    body: [`Questions, requests or complaints about privacy: ${SITE.email}, or write to us at ${SITE.address}.`],
  },
];
