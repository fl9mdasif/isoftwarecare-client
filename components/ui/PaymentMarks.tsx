/**
 * Payment method marks.
 *
 * Every mark is inline SVG on a shared 48x30 card viewBox so the whole strip
 * shares one optical weight — mixing real brand assets at their native
 * proportions is what makes footer payment rows look bolted on.
 *
 * Marks are simplified representations for identification, not official brand
 * assets. If a provider's brand guidelines require their supplied artwork,
 * swap the individual `mark` here; nothing else needs to change.
 */

type Method = {
  id: string;
  /** Read by screen readers and used as the tooltip. */
  label: string;
  mark: React.ReactNode;
};

const card = { width: 48, height: 30, viewBox: "0 0 48 30" } as const;

/** Rounded card plate every mark sits on, so they align to one silhouette. */
const Plate = ({ children, fill = "#FFFFFF" }: { children: React.ReactNode; fill?: string }) => (
  <>
    <rect width="48" height="30" rx="4.5" fill={fill} />
    {children}
  </>
);

/**
 * var() is unreliable inside SVG presentation attributes, so the font goes
 * through `style` where custom properties are guaranteed to resolve. The
 * concrete fallbacks keep the marks legible even if the webfont never loads.
 */
const MARK_FONT = {
  fontFamily: "var(--font-display), 'Space Grotesk', 'Segoe UI', system-ui, sans-serif",
} as const;

const wordmark = (text: string, color: string, extra?: Partial<React.SVGProps<SVGTextElement>>) => (
  <text
    x="24"
    y="15"
    textAnchor="middle"
    dominantBaseline="central"
    fontWeight="700"
    fontSize="11"
    letterSpacing="-0.4"
    fill={color}
    style={MARK_FONT}
    {...extra}
  >
    {text}
  </text>
);

const METHODS: Method[] = [
  {
    id: "visa",
    label: "Visa",
    mark: <Plate>{wordmark("VISA", "#1434CB", { fontStyle: "italic", letterSpacing: "0.2", fontSize: "11.5" })}</Plate>,
  },
  {
    id: "mastercard",
    label: "Mastercard",
    mark: (
      <Plate>
        <circle cx="19.5" cy="15" r="7.4" fill="#EB001B" />
        <circle cx="28.5" cy="15" r="7.4" fill="#F79E1B" />
        {/* The intersection is a third colour in the real mark, not a blend. */}
        <path
          d="M24 9.4a7.39 7.39 0 0 1 0 11.2 7.39 7.39 0 0 1 0-11.2Z"
          fill="#FF5F00"
        />
      </Plate>
    ),
  },
  {
    id: "payoneer",
    label: "Payoneer",
    mark: <Plate>{wordmark("payoneer", "#FF4800", { fontSize: "9.2", letterSpacing: "-0.2" })}</Plate>,
  },
  {
    id: "wise",
    label: "Wise",
    mark: (
      <Plate fill="#163300">
        {wordmark("WISE", "#9FE870", { fontSize: "10.5", letterSpacing: "0.3" })}
      </Plate>
    ),
  },
  {
    id: "paypal",
    label: "PayPal",
    mark: (
      <Plate>
        <text
          x="24"
          y="15"
          textAnchor="middle"
          dominantBaseline="central"
          fontWeight="700"
          fontSize="10"
          fontStyle="italic"
          letterSpacing="-0.3"
          style={MARK_FONT}
        >
          <tspan fill="#003087">Pay</tspan>
          <tspan fill="#009CDE">Pal</tspan>
        </text>
      </Plate>
    ),
  },
  {
    id: "bank",
    label: "Bank transfer (SWIFT)",
    mark: (
      <Plate fill="#12151D">
        {/* Classic columned-bank glyph: reads at 30px where a wordmark would not. */}
        <g stroke="#B4BCCB" strokeWidth="1.4" strokeLinecap="round" fill="none">
          <path d="M15 12.6 24 8l9 4.6" strokeLinejoin="round" />
          <path d="M17 14v6M21.5 14v6M26.5 14v6M31 14v6" />
          <path d="M14.5 22h19" />
        </g>
      </Plate>
    ),
  },
];

export function PaymentMarks({ heading = "Payments accepted" }: { heading?: string }) {
  return (
    <div className="pay-strip">
      <h2 className="pay-head">{heading}</h2>
      <ul className="pay-list" role="list">
        {METHODS.map((m) => (
          <li key={m.id}>
            <span className="pay-mark" title={m.label}>
              <svg {...card} role="img" aria-label={m.label} focusable="false">
                {m.mark}
              </svg>
            </span>
          </li>
        ))}
      </ul>
      <p className="pay-note">
        Invoices are issued in USD. Bank transfers settle in 2–3 business days; card and Payoneer payments clear same
        day.
      </p>
    </div>
  );
}
