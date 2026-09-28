"use client";

import { useEffect, type MouseEvent } from "react";
import Link from "next/link";
import { getCalApi } from "@calcom/embed-react";
import { CAL } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MeetLogo } from "./MeetLogo";

const NAMESPACE = "meet";
const CONFIG = JSON.stringify({ layout: "month_view", theme: "dark" });

let ready: Promise<unknown> | null = null;

function initCal() {
  ready ??= getCalApi({ namespace: NAMESPACE }).then((cal) => {
    cal("ui", {
      theme: "dark",
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: {
        light: { "cal-brand": "#2EE6C5" },
        dark: { "cal-brand": "#2EE6C5" },
      },
    });
    return cal;
  });
  return ready;
}

type Props = {
  className?: string;
  label?: string;
  onOpen?: () => void;
};

export function BookMeeting({ className, label = "Book a meeting", onOpen }: Props) {
  useEffect(() => {
    if (CAL.link) initCal();
  }, []);

  const content = (
    <>
      <span className="meet-ico">
        <MeetLogo size={14} />
      </span>
      {label}
    </>
  );

  // No booking link configured, or JS-less/crawler rendering: /book is a real
  // page that works without the embed, so the CTA is never a dead button.
  if (!CAL.link) {
    return (
      <Link href="/book" className={cn("btn btn-solid btn-meet", className)} onClick={onOpen}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={cn("btn btn-solid btn-meet", className)}
      data-cal-namespace={NAMESPACE}
      data-cal-link={CAL.link}
      data-cal-origin={CAL.origin}
      data-cal-config={CONFIG}
      aria-haspopup="dialog"
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        onOpen?.();
        e.currentTarget.blur();
      }}
    >
      {content}
    </button>
  );
}
