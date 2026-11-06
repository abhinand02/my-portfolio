"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, type App } from "@/data/site";

gsap.registerPlugin(ScrollTrigger);

// A phone drawn in code.
// interactive (large screens): starts on the home screen; as the page scrolls out of
// the hero a finger taps the "Abhi" app, it zooms open, and its contents then scroll
// inside the phone in step with the page, reaching "Install" at the bottom.
// static (phones/tablets hero): just the home screen.
// The phone screen is always dark, like a real device, in both site themes.

const brand: [string, string] = ["#74d3ae", "#678d58"];
const ink = "#0e1410"; // text on the mint accent
const phoneColors = { "--accent": "#74d3ae", "--accent-soft": "#a6c48a" } as React.CSSProperties;

function Icon({ name, colors, className = "size-12 text-lg" }: { name: string; colors: [string, string]; className?: string }) {
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-[26%] font-black text-white ${className}`}
      style={{ background: `linear-gradient(140deg, ${colors[0]}, ${colors[1]})` }}
    >
      {name[0]}
      <span className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent to-50%" />
    </span>
  );
}

// Simple glyphs for the dock (phone, messages, browser, camera).
const dockGlyphs = [
  "M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z",
  "M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2z",
  "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.5 6.5-2 5-5 2 2-5z",
  "M9 4 7.5 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.5L15 4zm3 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
];

function HomeScreen() {
  const label = "w-full truncate text-center text-[9px] text-white/80";
  return (
    <div className="ph-home absolute inset-0 flex flex-col px-4 pb-5 pt-12">
      {/* Widget */}
      <div className="rounded-[1.4rem] bg-white/10 p-4 backdrop-blur-md">
        <p className="text-[9px] uppercase tracking-widest text-white/50">Today</p>
        <p className="mt-1 text-base font-black leading-tight">{site.fullName}</p>
        <p className="text-[10px] text-white/60">{site.role}</p>
        <p className="mt-3 flex items-center gap-1.5 text-[10px] text-white/70">
          <span className="size-1.5 rounded-full bg-accent" /> {site.splash.compiled}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-x-3 gap-y-4">
        {/* The app the "user" opens */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="ph-abhi relative">
            <Icon name="A" colors={brand} />
            <span className="ph-tap pointer-events-none absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80 bg-white/30 opacity-0" />
          </span>
          <span className={label}>Abhi</span>
        </div>
        {site.apps.map((a) => (
          <div key={a.name} className="flex flex-col items-center gap-1.5">
            <Icon name={a.name} colors={a.colors} />
            <span className={label}>{a.name}</span>
          </div>
        ))}
        {site.lab.map((l) => (
          <div key={l.name} className="flex flex-col items-center gap-1.5">
            <span className="flex size-12 items-center justify-center rounded-[26%] border border-dashed border-white/30 font-mono text-white/55">
              {l.name[0]}
            </span>
            <span className={`${label} text-white/50`}>{l.name}</span>
          </div>
        ))}
      </div>

      {/* Page dots + dock */}
      <div className="mt-auto flex justify-center gap-1.5 pb-3">
        <span className="size-1.5 rounded-full bg-white" />
        <span className="size-1.5 rounded-full bg-white/35" />
      </div>
      <div className="flex justify-around rounded-[1.6rem] bg-white/12 p-2.5 backdrop-blur-md">
        {dockGlyphs.map((d, i) => (
          <span key={i} className="flex size-11 items-center justify-center rounded-[26%] bg-white/15">
            <svg viewBox="0 0 24 24" className="size-5 fill-white/85" aria-hidden="true">
              <path d={d} />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

const sectionLabel = "mb-2 font-mono text-[9px] uppercase tracking-widest text-accent";

function MiniApp({ app }: { app: App }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/5 py-2.5 last:border-0">
      <Icon name={app.name} colors={app.colors} className="size-9 text-sm" />
      <div className="min-w-0">
        <p className="text-xs font-bold">{app.name}</p>
        <p className="truncate text-[10px] text-white/50">{app.oneLiner}</p>
      </div>
    </div>
  );
}

// The opened "Abhi" app: a header bar and a long column that scrolls with the page.
function AppScreen() {
  const entries = [...site.changelog].reverse();
  return (
    <div className="ph-app absolute inset-0 z-10 flex flex-col overflow-hidden bg-[#0c130f] opacity-0">
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 bg-[#0c130f]/90 px-4 pb-2.5 pt-11 backdrop-blur">
        <p className="text-sm font-black tracking-tight">
          Abhi<span className="text-accent">.</span>
        </p>
        <Icon name="A" colors={brand} className="size-7 text-[11px]" />
      </div>

      <div className="ph-viewport relative flex-1 overflow-hidden">
        <div className="ph-scroll space-y-7 px-4 pb-10 pt-5">
          <section>
            <p className={sectionLabel}>01 · Home</p>
            <p className="text-2xl font-black leading-none tracking-tight">
              Hey, I&apos;m
              <br />
              {site.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-[11px] leading-relaxed text-white/55">{site.splash.quote.replaceAll("*", "")}</p>
          </section>

          <section>
            <p className={sectionLabel}>02 · Onboarding</p>
            <div className="space-y-2">
              {site.onboarding.map((o, i) => (
                <div key={o.title} className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
                  <p className="font-mono text-[9px] text-white/35">0{i + 1} / 03</p>
                  <p className="mt-1 text-sm font-black">{o.title}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-white/50">{o.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className={sectionLabel}>03 · Changelog</p>
            <ul className="space-y-2">
              {entries.map((e, i) => (
                <li
                  key={e.version}
                  className={`rounded-2xl border p-3 ${i === 0 ? "border-accent/40 bg-accent/10" : "border-white/8 bg-white/[0.03]"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-accent">{e.version}</span>
                    <span className="text-[9px] uppercase tracking-wider text-white/40">{e.when}</span>
                  </div>
                  <p className="mt-0.5 text-xs font-bold">{e.title}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className={sectionLabel}>04 · Apps</p>
            <div className="rounded-2xl bg-white/[0.04] px-3">
              {site.apps.map((a) => (
                <MiniApp key={a.name} app={a} />
              ))}
            </div>
          </section>

          <section>
            <p className={sectionLabel}>05 · Settings</p>
            <ul className="overflow-hidden rounded-2xl bg-white/[0.05]">
              {site.settings.map((s) => (
                <li key={s} className="flex items-center justify-between gap-3 border-b border-white/5 px-3 py-2.5 last:border-0">
                  <span className="truncate text-[11px]">{s}</span>
                  <span className="relative h-4 w-7 shrink-0 rounded-full bg-accent">
                    <span className="absolute right-0.5 top-0.5 size-3 rounded-full bg-white" />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className={sectionLabel}>06 · Install</p>
            <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
              <div className="flex items-center gap-3">
                <Icon name="A" colors={brand} className="size-12 text-xl" />
                <div>
                  <p className="font-black">Abhi</p>
                  <p className="text-[10px] text-white/50">{site.install.stats.join(" · ")}</p>
                </div>
              </div>
              <span className="mt-4 block rounded-full bg-accent py-2 text-center text-[11px] font-bold" style={{ color: ink }}>
                INSTALL · EMAIL ME
              </span>
            </div>
          </section>
        </div>
      </div>

      {/* App splash shown while the app is opening */}
      <div className="ph-splash absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0c130f]">
        <Icon name="A" colors={brand} className="size-16 text-3xl" />
        <p className="mt-4 text-base font-black">{site.fullName}</p>
        <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-white/10">
          <div className="ph-bar h-full w-full origin-left rounded-full bg-accent" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>
  );
}

export default function Phone({ interactive = false }: { interactive?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!interactive || !root) return;

    const ctx = gsap.context(() => {
      const screen = root.querySelector<HTMLElement>(".ph-screen")!;
      const icon = root.querySelector<HTMLElement>(".ph-abhi")!;
      const viewport = root.querySelector<HTMLElement>(".ph-viewport")!;
      const column = root.querySelector<HTMLElement>(".ph-scroll")!;
      // Page sections (looked up on the document: selector strings here would be scoped to the phone).
      const hero = document.getElementById("top");
      const first = document.getElementById("onboarding");
      const last = document.getElementById("contact");
      if (!hero || !first || !last) return;

      // Where the Abhi icon sits inside the screen, so the app zooms out of it.
      const iconOrigin = () => {
        let x = icon.offsetWidth / 2;
        let y = icon.offsetHeight / 2;
        let el: HTMLElement | null = icon;
        while (el && el !== screen) {
          x += el.offsetLeft;
          y += el.offsetTop;
          el = el.offsetParent as HTMLElement | null;
        }
        return `${x}px ${y}px`;
      };

      // 1) Hero scrolls away: tap the icon, press it, open the app, finish the splash.
      const open = gsap.timeline({
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom 20%", scrub: 0.6, invalidateOnRefresh: true },
      });
      open
        .fromTo(".ph-tap", { opacity: 0, scale: 1.8 }, { opacity: 1, scale: 1, duration: 0.18 })
        .to(".ph-abhi", { scale: 0.86, duration: 0.08 })
        .to(".ph-tap", { opacity: 0, scale: 0.6, duration: 0.08 }, "<")
        .to(".ph-abhi", { scale: 1, duration: 0.06 })
        .fromTo(
          ".ph-app",
          { opacity: 0, scale: 0.18, borderRadius: "70px", transformOrigin: iconOrigin }, // 70px × 0.18 ≈ the icon's corners
          { opacity: 1, scale: 1, borderRadius: "38px", duration: 0.3, ease: "power2.inOut" },
          "<",
        )
        .to(".ph-home", { scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.inOut" }, "<")
        .to(".ph-bar", { scaleX: 1, duration: 0.2 })
        .to(".ph-splash", { opacity: 0, duration: 0.12 });

      // 2) Rest of the page: scroll the app's contents to the bottom.
      gsap.to(column, {
        y: () => -Math.max(0, column.scrollHeight - viewport.clientHeight),
        ease: "none",
        scrollTrigger: {
          trigger: first,
          start: "top 20%",
          endTrigger: last,
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [interactive]);

  return (
    <div
      ref={rootRef}
      style={phoneColors}
      className="relative h-[580px] w-[280px] rounded-[3rem] bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e] p-[3px] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.75)] xl:h-[620px] xl:w-[300px]"
    >
      {/* Side buttons */}
      <span className="absolute -left-[3px] top-28 h-8 w-[3px] rounded-l bg-[#2a2a2c]" />
      <span className="absolute -left-[3px] top-40 h-14 w-[3px] rounded-l bg-[#2a2a2c]" />
      <span className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-[#2a2a2c]" />

      <div className="relative h-full w-full overflow-hidden rounded-[2.85rem] bg-black p-[9px]">
        <div className="ph-screen relative h-full w-full overflow-hidden rounded-[2.4rem] bg-[#0c130f] text-[#f6e7cb]">
          {/* Wallpaper */}
          <div className="absolute -left-16 -top-10 size-64 rounded-full bg-[#74d3ae]/35 blur-3xl" />
          <div className="absolute -right-20 top-48 size-64 rounded-full bg-[#dd9787]/30 blur-3xl" />
          <div className="absolute -bottom-10 left-6 size-56 rounded-full bg-[#678d58]/40 blur-3xl" />

          <HomeScreen />
          {interactive && <AppScreen />}

          {/* Status bar + Dynamic Island + home indicator */}
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-7 pt-3.5 text-[11px] font-semibold text-white">
            <span>9:41</span>
            <span className="flex items-center gap-1.5">
              <span className="flex items-end gap-[2px]">
                {[4, 6, 8, 10].map((h) => (
                  <span key={h} className="w-[3px] rounded-sm bg-white" style={{ height: h }} />
                ))}
              </span>
              <span className="relative h-[11px] w-[22px] rounded-[3px] border border-white/60 p-[1.5px]">
                <span className="block h-full w-4/5 rounded-[1px] bg-white" />
              </span>
            </span>
          </div>
          <div className="absolute left-1/2 top-2.5 z-30 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute bottom-2 left-1/2 z-30 h-1 w-28 -translate-x-1/2 rounded-full bg-white/60" />
        </div>
      </div>
    </div>
  );
}
