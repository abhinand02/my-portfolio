"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Phone from "./Phone";
import Blueprint from "./Blueprint";

gsap.registerPlugin(ScrollTrigger);

// Fixed background behind the whole page:
// - a blueprint grid with fading Dart snippets and two soft glows (all screen sizes)
// - on large screens, a phone on the right that opens the "Abhi" app as you scroll
//   (see Phone.tsx), tilting gently with scroll and the mouse.
export default function Scene() {
  const tiltRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  // Motion: entrance after the splash, scroll tilt, mouse tilt.
  useEffect(() => {
    const phone = phoneRef.current;
    const tilt = tiltRef.current;
    if (!phone || !tilt || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const intro = gsap.from(phone, { y: 120, opacity: 0, rotateZ: 6, duration: 1.4, ease: "power3.out", paused: true });
      const play = () => intro.play();
      if (document.documentElement.dataset.splash === "running") {
        window.addEventListener("splash:done", play, { once: true });
      } else {
        play();
      }

      // Code snippets drift up slowly as the page scrolls (parallax).
      gsap.to(".code-layer", { yPercent: -12, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 1 } });

      gsap.fromTo(
        phone,
        { rotateY: -18, rotateX: 8 },
        { rotateY: 14, rotateX: -4, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 1.2 } },
      );
    });

    const rx = gsap.quickTo(tilt, "rotateX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(tilt, "rotateY", { duration: 0.8, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      ry((e.clientX / window.innerWidth - 0.5) * 14);
      rx((0.5 - e.clientY / window.innerHeight) * 10);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Soft glows behind the grid */}
      <div className="orb-a absolute -right-[20%] -top-[35%] size-[60rem]" />
      <div className="orb-b absolute -bottom-[40%] -left-[20%] size-[54rem]" />
      <Blueprint />

      {/* Phone (large screens only) */}
      <div className="absolute inset-y-0 right-16 hidden items-center [perspective:1400px] lg:flex xl:right-28">
        <div ref={tiltRef} className="[transform-style:preserve-3d]">
          <div ref={phoneRef} className="phone-float [transform-style:preserve-3d]">
            <Phone interactive />
          </div>
        </div>
      </div>
    </div>
  );
}
