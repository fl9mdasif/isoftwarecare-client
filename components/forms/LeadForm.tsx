"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { Icon } from "@/components/ui/Icon";
import { useCreateLeadMutation } from "@/redux/api/leadApi";
import { BUDGETS } from "@/lib/site";
import type { TLeadInput } from "@/types";

type Option = { id: string; title: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const OBJECT_ID = /^[a-f\d]{24}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: TLeadInput): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please tell us your name.";
  else if (v.name.trim().length > 100) e.name = "Keep it under 100 characters.";
  if (!EMAIL.test(v.email.trim())) e.email = "Enter a valid email so we can reply.";
  if (!v.message.trim()) e.message = "A couple of lines about the project is enough.";
  else if (v.message.trim().length > 2000) e.message = "Keep it under 2000 characters.";
  return e;
}

export function LeadForm({ services, defaultServiceId }: { services: Option[]; defaultServiceId?: string }) {
  const uid = useId();
  const pathname = usePathname();
  const formRef = useRef<HTMLFormElement>(null);
  const [createLead, { isLoading }] = useCreateLeadMutation();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const [sent, setSent] = useState(false);

  const id = (k: string) => `${uid}-${k}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const str = (k: string) => String(fd.get(k) ?? "").trim();

    const payload: TLeadInput = {
      name: str("name"),
      email: str("email"),
      phone: str("phone") || undefined,
      message: str("message"),
      budget: str("budget") || undefined,
      source: pathname,
      website: str("website"),
    };
    const svc = str("service");
    if (OBJECT_ID.test(svc)) payload.serviceInterested = svc;
    else if (svc) payload.message = `[Service: ${services.find((s) => s.id === svc)?.title ?? svc}]\n\n${payload.message}`;

    const found = validate(payload);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("Please fix the highlighted fields.");
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("");
    const res = await createLead(payload);
    if ("error" in res) {
      const err = res.error as { status?: number; data?: string };
      const msg =
        err.status === 429
          ? "Too many submissions from this device. Please try again in a few minutes."
          : typeof err.data === "string" && err.status && err.status < 500
            ? err.data
            : "We couldn't send that right now. Please email or WhatsApp us instead.";
      setStatus(msg);
      toast.error(msg);
      return;
    }
    setSent(true);
    toast.success("Message sent. We'll reply within one business day.");
  }

  if (sent) {
    return (
      <div className="form-card">
        <div className="sent" role="status">
          <div className="sent-ico">
            <Icon name="check" strokeWidth={2.2} />
          </div>
          <h3>Thanks, we&apos;ve got it.</h3>
          <p>You&apos;ll hear back within one business day with next steps, a rough scope and questions if we have any.</p>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setSent(false);
              setErrors({});
            }}
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <span className="field-err" id={id(`${k}-err`)}>
        {errors[k]}
      </span>
    ) : null;

  return (
    <form ref={formRef} className="form-card" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <div className="field">
          <label htmlFor={id("name")}>
            Name <em>*</em>
          </label>
          <input
            className="input"
            id={id("name")}
            name="name"
            autoComplete="name"
            placeholder="Your name"
            maxLength={100}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? id("name-err") : undefined}
          />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor={id("email")}>
            Email <em>*</em>
          </label>
          <input
            className="input"
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? id("email-err") : undefined}
          />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor={id("phone")}>Phone / WhatsApp</label>
          <input className="input" id={id("phone")} name="phone" type="tel" autoComplete="tel" placeholder="+880…" />
        </div>
        <div className="field">
          <label htmlFor={id("service")}>Service</label>
          <select className="input" id={id("service")} name="service" defaultValue={defaultServiceId ?? ""}>
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={id("budget")}>Budget</label>
          <select className="input" id={id("budget")} name="budget" defaultValue="">
            <option value="">Prefer not to say</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div className="field full">
          <label htmlFor={id("message")}>
            Project details <em>*</em>
          </label>
          <textarea
            className="input"
            id={id("message")}
            name="message"
            maxLength={2000}
            placeholder="What are you building, who is it for, and when do you need it?"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? id("message-err") : undefined}
          />
          {err("message")}
        </div>
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="form-foot">
        <small>Reply within one business day. No spam, ever.</small>
        <button type="submit" className="btn btn-solid" disabled={isLoading}>
          {isLoading ? (
            <>
              Sending
              <Icon name="loader" className="spin" strokeWidth={2} />
            </>
          ) : (
            <>
              Send message
              <Icon name="arrow" strokeWidth={2} />
            </>
          )}
        </button>
      </div>
      <p className="form-status" role="alert" aria-live="assertive">
        {status}
      </p>
    </form>
  );
}
