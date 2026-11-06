"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/data/site";

// Screen 1 — Splash. A loading bar fills to "3+ years compiled", then fades
// into the home screen. Shown once per browser session; skipped for visitors
// who prefer reduced motion. Hero waits for the "splash:done" event.
export default function Splash() {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    const finish = () => {
      root.dataset.splash = "done";
      window.dispatchEvent(new Event("splash:done"));
    };

    let seen = false;
    try {
      seen = sessionStorage.getItem("splash-seen") === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!el || seen || reduced) {
      if (el) el.style.display = "none";
      finish();
      return;
    }

    root.dataset.splash = "running";
    const progress = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          el.style.display = "none";
          try {
            sessionStorage.setItem("splash-seen", "1");
          } catch {}
          finish();
        },
      });
      tl.from(".splash-in", { opacity: 0, y: 16, duration: 0.6, stagger: 0.08, ease: "power3.out" })
        .to(
          progress,
          {
            v: 100,
            duration: 1.4,
            ease: "power2.inOut",
            onUpdate: () => {
              if (barRef.current) barRef.current.style.transform = `scaleX(${progress.v / 100})`;
              if (labelRef.current) labelRef.current.textContent = `Compiling… ${Math.round(progress.v)}%`;
            },
            onComplete: () => {
              if (labelRef.current) labelRef.current.textContent = site.splash.compiled;
            },
          },
          0.2,
        )
        .to(el, { opacity: 0, duration: 0.6, ease: "power2.inOut" }, "+=0.5");
    }, el);

    // Undo everything if React re-runs this effect (dev mode) or the page unmounts.
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="splash fixed inset-0 z-[90] flex flex-col items-center justify-center bg-background px-5"
    >
      <div className="splash-in mb-6 flex size-20 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-accent to-accent-deep text-4xl font-black text-on-accent shadow-[0_20px_60px_-15px] shadow-accent/50">
        A
      </div>
      <p className="splash-in text-2xl font-black tracking-tighter">
        {site.fullName}
        <span className="text-accent">.</span>
      </p>
      <p className="splash-in mt-1 text-center text-[11px] uppercase tracking-[0.2em] text-foreground/40 sm:text-xs sm:tracking-[0.3em]">
        {site.role} · {site.location}
      </p>
      <div className="splash-in mt-10 h-1 w-56 overflow-hidden rounded-full bg-foreground/10">
        <div ref={barRef} className="h-full origin-left rounded-full bg-accent" style={{ transform: "scaleX(0)" }} />
      </div>
      <p
        ref={labelRef}
        className="splash-in mt-4 font-mono text-[11px] uppercase tracking-widest text-foreground/50"
      >
        Compiling… 0%
      </p>
    </div>
  );
}
