"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

function setupStack(stack: HTMLElement) {
  const list = stack.querySelector<HTMLElement>(".stack-list");
  const items = gsap.utils.toArray<HTMLElement>(".stack-item", stack);
  const counter = stack.querySelector<HTMLElement>("#stack-cur");
  if (!list || !items.length) return () => {};

  const pad = (n: number) => String(n).padStart(2, "0");
  items.forEach((item, i) => item.style.setProperty("--i", String(i)));

  // Sticky items report their stuck position, so trigger points are derived
  // from the (non-sticky) list plus the heights of the items above.
  const naturalTop = (k: number) => {
    const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
    let y = list.getBoundingClientRect().top + window.scrollY;
    for (let j = 0; j < k; j++) y += items[j].offsetHeight + gap;
    return y;
  };

  const setTop = (k: number) => {
    const idx = Math.max(0, Math.min(items.length - 1, k));
    if (counter) counter.textContent = pad(idx + 1);
    items.forEach((it, j) => it.classList.toggle("is-top", j === idx));
  };
  setTop(0);

  const mm = gsap.matchMedia();
  mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (ctx) => {
    const minScale = ctx.conditions?.mobile ? 0.97 : 0.94;
    const vars = getComputedStyle(stack);
    const top = parseFloat(vars.getPropertyValue("--stack-top")) || 96;
    const step = parseFloat(vars.getPropertyValue("--stack-step")) || 18;
    const vh = () => window.innerHeight;

    items.forEach((item, i) => {
      const card = item.querySelector(".stack-card");
      const inner = item.querySelectorAll(".stack-cat, .stack-title, .stack-desc, .stack-tags, .stack-link");
      const vis = item.querySelector(".stack-vis-inner");

      gsap
        .timeline({ scrollTrigger: { start: () => naturalTop(i) - vh() * 0.9, invalidateOnRefresh: true } })
        .from(card, { y: 60, opacity: 0, duration: 0.6, ease: "power3.out", clearProps: "transform,opacity" })
        .from(inner, { y: 14, opacity: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }, "-=0.2");

      gsap.fromTo(
        vis,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            start: () => naturalTop(i) - vh(),
            end: () => naturalTop(i) + item.offsetHeight,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        },
      );

      const next = items[i + 1];
      if (next) {
        gsap.fromTo(
          card,
          { "--stack-s": 1, "--stack-b": 1 },
          {
            "--stack-s": minScale,
            "--stack-b": 0.55,
            ease: "none",
            scrollTrigger: {
              start: () => naturalTop(i + 1) - vh(),
              end: () => naturalTop(i + 1) - (top + (i + 1) * step),
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      ScrollTrigger.create({
        start: () => naturalTop(i) - vh() * 0.55,
        end: "max",
        invalidateOnRefresh: true,
        onToggle: (self) => setTop(self.isActive ? i : i - 1),
      });
    });
  });

  return () => mm.revert();
}

function setupServiceCards(grid: HTMLElement) {
  const cards = gsap.utils.toArray<HTMLElement>(".svc", grid);
  const cleanups: (() => void)[] = [];

  const rowTops = Array.from(new Set(cards.map((c) => c.offsetTop)));
  const colIndex = (card: HTMLElement) => cards.filter((c) => c.offsetTop === card.offsetTop).indexOf(card);

  cards.forEach((card) => {
    const ico = card.querySelector(".svc-ico");
    const shapes = card.querySelectorAll(".svc-ico svg > *");
    const text = card.querySelectorAll("h3, p, .svc-more");
    const num = card.querySelector(".num");
    const row = rowTops.indexOf(card.offsetTop);

    const tl = gsap.timeline({
      delay: colIndex(card) * 0.09,
      scrollTrigger: { trigger: card, start: "top 88%" },
    });
    tl.from(card, {
      opacity: 0,
      y: 40,
      scale: 0.96,
      rotateX: row === 0 ? 6 : 4,
      transformOrigin: "50% 100%",
      duration: 0.7,
      ease: "power3.out",
      clearProps: "transform,opacity",
    })
      .from(ico, { scale: 0.5, rotate: -12, opacity: 0, duration: 0.55, ease: "back.out(2.2)", clearProps: "transform,opacity" }, "-=0.45")
      .from(shapes, { drawSVG: "0%", duration: 0.8, ease: "power2.inOut", stagger: 0.08 }, "-=0.3")
      .from(text, { opacity: 0, y: 10, duration: 0.4, stagger: 0.06, ease: "power2.out" }, "-=0.75")
      .from(num, { opacity: 0, x: 8, duration: 0.4, ease: "power2.out" }, "<");
  });

  // Scroll-linked layers use CSS variables (translate/scale/filter) so they never
  // fight the entrance tween or the hover tilt, which both own `transform`.
  const mm = gsap.matchMedia();
  mm.add({ threeCol: "(min-width: 941px)", twoCol: "(min-width: 621px) and (max-width: 940px)" }, (ctx) => {
    if (!ctx.conditions?.threeCol && !ctx.conditions?.twoCol) return;
    const lefts = Array.from(new Set(cards.map((c) => c.offsetLeft))).sort((a, b) => a - b);
    const tl = gsap.timeline({
      scrollTrigger: { trigger: grid, start: "top bottom", end: "bottom top", scrub: 1 },
    });
    cards.forEach((card) => {
      const drift = lefts.indexOf(card.offsetLeft) * 38;
      tl.fromTo(card, { "--svc-py": `${drift + 24}px` }, { "--svc-py": "0px", ease: "power2.out", duration: 1 }, 0).to(
        card,
        { "--svc-py": `${-drift * 0.55}px`, ease: "power1.in", duration: 1 },
        1,
      );
    });
  });
  cleanups.push(() => mm.revert());

  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { "--svc-exit-s": 1, "--svc-exit-b": 1 },
      {
        "--svc-exit-s": 0.955,
        "--svc-exit-b": 0.62,
        ease: "none",
        scrollTrigger: { trigger: card, start: "top 14%", end: "bottom top", scrub: 0.6 },
      },
    );
  });

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    cards.forEach((card) => {
      const rx = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
      const ry = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
      const y = gsap.quickTo(card, "y", { duration: 0.45, ease: "power3" });
      const enter = () => {
        card.classList.add("is-tilt");
        y(-6);
      };
      const move = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 6);
        rx(((e.clientY - r.top) / r.height - 0.5) * -6);
      };
      const leave = () => {
        rx(0);
        ry(0);
        y(0);
      };
      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
        card.classList.remove("is-tilt");
      });
    });
  }

  return () => cleanups.forEach((fn) => fn());
}

function setupSpine(spine: HTMLElement) {
  const fill = spine.querySelector<HTMLElement>("#spine-fill");
  const list = spine.querySelector<HTMLElement>(".steps");
  const steps = gsap.utils.toArray<HTMLElement>(".step", spine);
  const mm = gsap.matchMedia();

  mm.add({ stacked: "(max-width: 767px)", split: "(min-width: 768px)" }, (ctx) => {
    const stacked = !!ctx.conditions?.stacked;

    if (fill && list) {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 75%", end: "bottom 84%", scrub: 0.8 },
        },
      );
    }

    steps.forEach((step) => {
      const stub = step.querySelector(".step-stub");
      const node = step.querySelector(".step-node");
      const motion = step.querySelector(".step-motion");
      const inner = step.querySelectorAll(".step-num, .step-ico, .step-title, .step-desc");
      const bar = step.querySelector(".step-bar i");
      const pushX = stacked || step.classList.contains("is-right") ? -40 : 40;

      gsap
        .timeline({
          scrollTrigger: { trigger: step, start: "top 84%", toggleActions: "play none none reverse" },
        })
        .from(stub, { scaleX: 0, duration: 0.35, ease: "power2.out" })
        .from(node, {
          scale: 0,
          backgroundColor: "rgba(255,255,255,.085)",
          boxShadow: "0 0 0 0px rgba(0,0,0,0)",
          duration: 0.4,
          ease: "back.out(2)",
          clearProps: "backgroundColor,boxShadow",
        })
        .from(motion, { opacity: 0, scale: 0.96, x: pushX, duration: 0.65, ease: "power3.out" }, "-=0.15")
        .from(inner, { opacity: 0, y: 8, duration: 0.35, stagger: 0.05, ease: "power2.out" }, "-=0.3")
        .from(bar, { scaleX: 0, duration: 0.6, ease: "power2.out" }, "+=0.15");
    });

    let active: HTMLElement | null = null;
    const setActive = (el: HTMLElement | null) => {
      if (el === active) return;
      active?.classList.remove("active");
      el?.classList.add("active");
      active = el;
    };
    const pickNearest = () => {
      const mid = window.innerHeight / 2;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const s of steps) {
        const r = s.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist && r.bottom > 0 && r.top < window.innerHeight) {
          best = s;
          bestDist = d;
        }
      }
      setActive(best);
    };

    ScrollTrigger.create({
      trigger: list ?? spine,
      start: "top 60%",
      end: "bottom 40%",
      onUpdate: pickNearest,
      onToggle: (self) => (self.isActive ? pickNearest() : setActive(null)),
    });

    return () => setActive(null);
  });

  return () => mm.revert();
}

// Rendered once at the end of each page so ScrollTriggers are reverted before React removes that page's DOM.
export function Motion() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onSpot = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>("[data-spot]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onSpot, { passive: true });

    if (reduce) {
      return () => document.removeEventListener("pointermove", onSpot);
    }

    document.body.classList.add("gsap-ready");
    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const title = document.getElementById("hero-title");
      if (title) {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(title.querySelectorAll(".char"), { yPercent: 110, opacity: 0, rotateX: -45, duration: 0.8, stagger: 0.014 })
          .from("[data-fade]", { y: 22, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=.5")
          .from(".hero-panel", { y: 34, opacity: 0, scale: 0.97, duration: 0.9 }, "-=.75")
          .from(".float-stat", { y: 16, opacity: 0, duration: 0.6 }, "-=.4");
      } else {
        gsap.from("[data-fade]", { y: 22, opacity: 0, duration: 0.7, stagger: 0.1, ease: "expo.out", delay: 0.05 });
      }

      gsap.to("[data-blob]", {
        yPercent: (i: number) => [-16, 12, -10][i] ?? 0,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1.2 },
      });

      const panel = document.querySelector<HTMLElement>("[data-tilt]");
      if (panel && window.matchMedia("(hover:hover)").matches) {
        const qx = gsap.quickTo(panel, "rotationY", { duration: 0.6, ease: "power3" });
        const qy = gsap.quickTo(panel, "rotationX", { duration: 0.6, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = panel.getBoundingClientRect();
          qx(((e.clientX - r.left) / r.width - 0.5) * 7);
          qy(((e.clientY - r.top) / r.height - 0.5) * -7);
        };
        const leave = () => {
          qx(0);
          qy(0);
        };
        panel.addEventListener("pointermove", move);
        panel.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          panel.removeEventListener("pointermove", move);
          panel.removeEventListener("pointerleave", leave);
        });
      }

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 86%" } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((grid) => {
        gsap.from(grid.children, {
          opacity: 0,
          y: 22,
          scale: 0.96,
          duration: 0.55,
          ease: "back.out(1.3)",
          stagger: { each: 0.07, from: "start", grid: "auto" },
          scrollTrigger: { trigger: grid, start: "top 82%" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseFloat(el.dataset.count ?? "0");
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
          onUpdate: () => {
            el.textContent = Math.round(obj.v) + suffix;
          },
          onComplete: () => {
            el.textContent = target + suffix;
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".svc-grid").forEach((grid) => cleanups.push(setupServiceCards(grid)));

      const stack = document.getElementById("stack");
      if (stack) cleanups.push(setupStack(stack));

      const spine = document.getElementById("spine");
      if (spine) cleanups.push(setupSpine(spine));
    });

    const mq = document.getElementById("marquee");
    let last = window.scrollY;
    const onScroll = () => {
      if (!mq) return;
      const y = window.scrollY;
      mq.style.animationDirection = y >= last ? "normal" : "reverse";
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let alive = true;
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());

    return () => {
      alive = false;
      document.removeEventListener("pointermove", onSpot);
      window.removeEventListener("scroll", onScroll);
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return null;
}
