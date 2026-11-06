"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { site, type App } from "@/data/site";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

function AppIcon({ app, className = "" }: { app: App; className?: string }) {
  return (
    <span
      className={`relative flex items-center justify-center overflow-hidden rounded-[24%] font-black text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] ${className}`}
      style={{ background: `linear-gradient(140deg, ${app.colors[0]}, ${app.colors[1]})` }}
    >
      {app.icon ? (
        <Image src={app.icon} alt="" fill sizes="96px" className="object-cover" />
      ) : (
        app.name[0]
      )}
      {/* Glossy highlight. */}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent to-50%" />
    </span>
  );
}

// Screen 4 — App Drawer: each project is an app icon that opens a short case study.
export default function AppDrawer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<App | null>(null);

  const show = (app: App) => {
    setOpen(app);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <section id="apps" className="px-5 py-32 md:px-20 md:py-44">
      <Reveal>
        <SectionTitle label="Screen 04 · App Drawer" title="Apps I've shipped" />
      </Reveal>

      <Reveal className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5" stagger={0.08}>
        {site.apps.map((app) => (
          <button
            key={app.name}
            type="button"
            onClick={() => show(app)}
            className="group flex flex-col items-center text-center"
          >
            <AppIcon
              app={app}
              className="size-24 text-4xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105 md:size-28 md:text-5xl"
            />
            <span className="mt-4 text-lg font-bold tracking-tight">{app.name}</span>
            <span className="mt-1 max-w-[16rem] text-sm font-light leading-snug text-foreground/45">
              {app.oneLiner}
            </span>
            <span className="mt-3 text-[10px] uppercase tracking-widest text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              Open case study →
            </span>
          </button>
        ))}
      </Reveal>

      {/* In the lab: concepts, kept apart from shipped work. */}
      <Reveal className="mt-24">
        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.5em] text-foreground/40">In the lab</p>
        <div className="grid gap-4 md:grid-cols-2">
          {site.lab.map((l) => (
            <div key={l.name} className="flex items-start gap-4 rounded-2xl border border-dashed border-foreground/15 p-5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[24%] border border-foreground/15 font-mono text-lg text-foreground/50">
                {l.name[0]}
              </span>
              <div>
                <p className="font-bold tracking-tight">
                  {l.name}
                  <span className="ml-3 rounded-full border border-foreground/10 px-2 py-0.5 align-middle text-[9px] font-medium uppercase tracking-widest text-foreground/45">
                    {l.kind}
                  </span>
                </p>
                <p className="mt-1 text-sm font-light leading-relaxed text-foreground/45">{l.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Case study sheet. Native <dialog>: Esc closes it, and so does clicking the backdrop. */}
      <dialog
        ref={dialogRef}
        data-lenis-prevent
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto w-[min(92vw,40rem)] max-h-[88svh] overflow-y-auto rounded-[2rem] border border-foreground/10 bg-background p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="p-7 md:p-10">
            <div className="flex items-start gap-5">
              <AppIcon app={open} className="size-20 shrink-0 text-3xl" />
              <div className="min-w-0 flex-1">
                <h3 className="text-3xl font-black tracking-tighter">{open.name}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-foreground/45">{open.tech}</p>
                <span className="mt-3 inline-block rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                  {open.status}
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition hover:border-accent hover:text-accent"
              >
                ✕
              </button>
            </div>

            {(
              [
                ["The problem", open.problem],
                ["What I built", open.built],
                ["What I learned", open.learned],
              ] as const
            ).map(([label, text]) => (
              <div key={label} className="mt-8 border-t border-foreground/5 pt-6">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.4em] text-accent">{label}</p>
                <p className="text-base font-light leading-relaxed text-foreground/70">{text}</p>
              </div>
            ))}

            {open.href && (
              <a
                href={open.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-widest text-on-accent transition-colors hover:bg-accent-soft"
              >
                View app ↗
              </a>
            )}
          </div>
        )}
      </dialog>
    </section>
  );
}
