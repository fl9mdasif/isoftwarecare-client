"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const read = (): Theme => {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
};

export function ThemeToggle({ className }: { className?: string }) {
  // Starts undefined so the server render and the first client render agree;
  // ThemeScript has already set the real theme on <html> by this point.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(read());

    // Follow the OS only while the visitor has not made an explicit choice.
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem("theme")) return;
      } catch {
        /* storage blocked — fall through and follow the system */
      }
      const next: Theme = e.matches ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };
    mq.addEventListener("change", onSystemChange);
    return () => mq.removeEventListener("change", onSystemChange);
  }, []);

  const toggle = () => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice just will not persist */
    }
  };

  const isDark = theme !== "light";

  return (
    <button
      type="button"
      className={cn("theme-toggle", className)}
      onClick={toggle}
      // Until the effect runs, `theme` is null and the label would be a guess.
      aria-label={theme ? `Switch to ${isDark ? "light" : "dark"} theme` : "Switch theme"}
      title={theme ? `Switch to ${isDark ? "light" : "dark"} theme` : "Switch theme"}
    >
      {/* Both icons are always present; CSS shows one. That keeps the button a
          stable size and avoids a layout shift when the theme flips. */}
      <svg className="ico-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className="ico-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
