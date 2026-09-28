"use client";

import { useEffect, useState } from "react";

/**
 * Reads the live theme from the <html> element and tracks changes to it.
 *
 * The attribute is the single source of truth — ThemeScript sets it before
 * paint and ThemeToggle mutates it — so anything that needs to react to the
 * theme (third-party embeds, canvas, charts) observes the attribute rather
 * than keeping a second copy of the state.
 */
export function useTheme(): "light" | "dark" {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const el = document.documentElement;
    const read = () => setTheme(el.getAttribute("data-theme") === "light" ? "light" : "dark");
    read();

    const observer = new MutationObserver(read);
    observer.observe(el, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}
