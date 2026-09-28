import type { ReactNode, SVGProps } from "react";

const P: Record<string, ReactNode> = {
  web: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  ecommerce: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h3l2.6 12.4a1.6 1.6 0 0 0 1.6 1.3h8.5a1.6 1.6 0 0 0 1.6-1.3L22 7H6" />
    </>
  ),
  app: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  uiux: (
    <>
      <path d="m15 5 4 4" />
      <path d="M13 7 8.7 2.7a2.4 2.4 0 0 0-3.4 0L2.7 5.3a2.4 2.4 0 0 0 0 3.4L7 13" />
      <path d="m8 13 8 8 5-5-8-8z" />
    </>
  ),
  saas: (
    <>
      <path d="M20 17.6A4.5 4.5 0 0 0 17.5 9h-1.3A7 7 0 1 0 4 15.7" />
      <path d="M12 12v9M8.5 17.5 12 21l3.5-3.5" />
    </>
  ),
  fullstack: <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />,
  ai: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 8V5M9 2h6M9 14h.01M15 14h.01M9.5 17.5h5" />
    </>
  ),
  chatbot: (
    <>
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.8-.8L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z" />
      <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
    </>
  ),
  scope: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  research: (
    <>
      <path d="M4 19.5V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z" />
      <path d="M8 7h7M8 11h7" />
    </>
  ),
  plan: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M8 2v4M16 2v4M3 10h18M8 14h.01M12 14h.01M8 18h.01M12 18h.01" />
    </>
  ),
  architect: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M17.5 14v7M14 17.5h7" />
    </>
  ),
  context: (
    <>
      <path d="M12 3 3 8l9 5 9-5-9-5z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  review: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  test: (
    <>
      <rect x="8" y="6" width="8" height="13" rx="4" />
      <path d="M8 11H4M20 11h-4M8 16H5M19 16h-3M9 6 7.5 3.5M15 6l1.5-2.5" />
    </>
  ),
  ship: (
    <>
      <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2 2 0 0 0-2.9-.1z" />
      <path d="M12 15 9 12a11 11 0 0 1 2-6c2.4-3.2 5.6-3.6 8.4-3.4.3 2.8-.2 6-3.4 8.4a11 11 0 0 1-6 2z" />
    </>
  ),
  scale: (
    <>
      <path d="M3 20h18" />
      <path d="M7 20v-7M12 20V7M17 20v-11" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  external: <path d="M7 17 17 7M8 7h9v9" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.3z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.2-1.8-1-1 .8a4 4 0 0 1-2.5-2.5l.8-1-1-1.8z" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  loader: <path d="M21 12a9 9 0 1 1-6.2-8.6" />,
  back: <path d="M19 12H5M11 18l-6-6 6-6" />,
};

const FILLED: Record<string, ReactNode> = {
  quote: (
    <path d="M9.5 5C6.5 6.5 4.5 9.5 4.5 13v6h7v-7H8c0-2.5 1-4 3-5zM20.5 5c-3 1.5-5 4.5-5 8v6h7v-7H19c0-2.5 1-4 3-5z" />
  ),
  star: <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z" />,
};

export type IconName = keyof typeof P | keyof typeof FILLED;

export const SERVICE_ICON_KEYS = ["web", "ecommerce", "app", "uiux", "saas", "fullstack", "ai", "chatbot"] as const;

type Props = SVGProps<SVGSVGElement> & { name: string; strokeWidth?: number };

export function Icon({ name, strokeWidth = 1.8, ...rest }: Props) {
  if (FILLED[name]) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...rest}>
        {FILLED[name]}
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {P[name] ?? P.fullstack}
    </svg>
  );
}

const SLUG_HINTS: [RegExp, string][] = [
  [/chat|bot|automat/, "chatbot"],
  [/\bai\b|\bml\b|\brag\b|llm|intelligen/, "ai"],
  [/commerce|shop|store/, "ecommerce"],
  [/\bapps?\b|mobile|android|\bios\b/, "app"],
  [/\bui\b|\bux\b|design/, "uiux"],
  [/saas|cloud|product/, "saas"],
  [/full|stack|backend|api/, "fullstack"],
  [/web|site|landing/, "web"],
];

export function resolveServiceIcon(icon: string | undefined, slug: string) {
  if (icon && (SERVICE_ICON_KEYS as readonly string[]).includes(icon)) return icon;
  const hay = `${icon ?? ""} ${slug}`.toLowerCase();
  return SLUG_HINTS.find(([re]) => re.test(hay))?.[1] ?? "fullstack";
}
