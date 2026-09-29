"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { BookMeeting } from "@/components/booking/BookMeeting";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <header className={cn("site-header", (stuck || open) && "stuck")}>
        <div className="wrap">
          <nav className="site-nav" aria-label="Primary">
            <Link href="/" className="brand" onClick={() => setOpen(false)}>
              <Logo />
              {SITE.name}
            </Link>
            <div className="nav-links">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="nav-actions">
              <ThemeToggle />
              <BookMeeting className="btn-sm" />
              <button
                type="button"
                className="burger"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-panel"
                onClick={() => setOpen((v) => !v)}
              >
                <Icon name={open ? "close" : "menu"} strokeWidth={2} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div className={cn("mobile-panel", open && "open")} id="mobile-panel" aria-hidden={!open} inert={!open}>
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            aria-current={isActive(n.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {n.label}
          </Link>
        ))}
        <ThemeToggle className="mobile-theme" />
        <BookMeeting className="mobile-cta" onOpen={() => setOpen(false)} />
      </div>
    </>
  );
}
