"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/data/site";
import { Accent } from "./SectionTitle";
import Phone from "./Phone";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tl: gsap.core.Timeline | undefined;
    const ctx = gsap.context(() => {
      tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
      tl.from(".hero-line", { yPercent: 110, duration: 1.1 }, 0.2)
        .from(".hero-letter", { y: 100, opacity: 0, rotateX: -40, stagger: 0.06, duration: 1.2 }, 0.3)
        .from(".hero-fade", { opacity: 0, y: 20, duration: 1, stagger: 0.1 }, 0.8);
    }, ref);

    // Play once the splash screen has faded out (see Splash.tsx).
    const play = () => tl?.play();
    if (document.documentElement.dataset.splash === "running") {
      window.addEventListener("splash:done", play, { once: true });
    } else {
      play();
    }
    return () => {
      window.removeEventListener("splash:done", play);
      ctx.revert();
    };
  }, []);

  return (
    <section id="top" ref={ref} className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Small phone on phones/tablets (large screens get the floating one from Scene). */}
      <div
        aria-hidden="true"
        className="hero-fade pointer-events-none absolute inset-x-0 top-20 flex justify-center [mask-image:linear-gradient(to_bottom,black_45%,transparent_85%)] lg:hidden [@media(max-height:780px)]:top-16 [@media(max-height:600px)]:hidden"
      >
        <div className="phone-float origin-top -rotate-6 scale-[0.6] sm:scale-75 [@media(max-height:780px)]:scale-[0.42]">
          <Phone />
        </div>
      </div>
      <div className="relative mt-auto px-5 pb-16 pt-32 md:px-20 md:pb-20">
        <p className="hero-fade mb-6 text-[10px] font-medium uppercase tracking-[0.5em] text-accent">
          {site.role} · {site.location}
        </p>
        <h1 className="text-[clamp(3.5rem,13vw,12rem)] lg:text-[clamp(4rem,9.5vw,10rem)] font-black leading-[0.85] tracking-tighter">
          <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
            <span className="hero-line ghost block">Hey, I&apos;m</span>
          </span>
          <span className="block [perspective:1000px]" aria-label={`${site.name}.`}>
            {site.name.split("").map((ch, i) => (
              <span key={i} className="hero-letter inline-block" aria-hidden="true">
                {ch === " " ? "\u00a0" : ch}
              </span>
            ))}
            <span className="hero-letter inline-block text-accent" aria-hidden="true">.</span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-base font-light leading-relaxed text-foreground/50 md:text-lg">
            <Accent text={site.splash.quote} />
          </p>
          <a
            href="#onboarding"
            className="hero-fade group inline-flex w-fit items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-foreground/60 transition-colors hover:text-foreground"
          >
            Open the app
            <span className="flex size-10 items-center justify-center rounded-full border border-foreground/15 transition group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
