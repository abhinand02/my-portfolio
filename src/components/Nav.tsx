"use client";

import { useState } from "react";
import { site } from "@/data/site";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-transparent" />
      <nav className="relative flex items-center justify-between px-5 py-4 md:px-20 md:py-7">
        <a href="#top" className="text-xl font-black tracking-tighter">
          {site.name}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.28em] md:flex">
          {site.nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 text-foreground/50 transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="rounded-full bg-accent px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-on-accent transition-colors duration-300 hover:bg-accent-soft"
          >
            Install
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-px w-5 bg-foreground transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-foreground transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <ul className="relative flex flex-col gap-1 bg-background/95 px-5 pb-8 pt-2 backdrop-blur md:hidden">
          {site.nav.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-3xl font-black tracking-tighter"
              >
                {l.label}
                <span className="text-accent">.</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
