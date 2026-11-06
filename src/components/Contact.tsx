import { site } from "@/data/site";
import Reveal from "./Reveal";
import { Accent } from "./SectionTitle";

// Screen 6 — Contact, styled as an app-store listing with an "Install" button.
export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 py-32 md:px-20 md:py-44">
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <Reveal className="relative mx-auto max-w-3xl">
        <p className="mb-10 text-center text-[10px] font-medium uppercase tracking-[0.5em] text-accent">
          Screen 06 · Install
        </p>
        <div className="rounded-[2rem] border border-foreground/10 bg-background/70 p-7 backdrop-blur-xl md:p-10">
          <div className="flex items-center gap-5">
            <span className="flex size-20 shrink-0 items-center justify-center rounded-[24%] bg-gradient-to-br from-accent to-accent-deep text-4xl font-black text-on-accent md:size-24">
              A
            </span>
            <div className="min-w-0">
              <h2 className="text-3xl font-black tracking-tighter md:text-4xl">
                Abhi<span className="text-accent">.</span>
              </h2>
              <p className="text-sm text-foreground/50">
                {site.fullName} · {site.role}
              </p>
              <p className="mt-1 text-xs text-foreground/35">{site.location}</p>
            </div>
          </div>

          <ul className="mt-8 grid grid-cols-3 divide-x divide-foreground/10 border-y border-foreground/10 py-4 text-center">
            {site.install.stats.map((s) => (
              <li key={s} className="px-2 text-xs font-medium uppercase tracking-widest text-foreground/60">
                {s}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-2xl font-light leading-snug md:text-3xl">
            <Accent text={site.install.pitch} />
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${site.email}`}
              className="flex-1 rounded-full bg-accent py-4 text-center text-sm font-bold uppercase tracking-widest text-on-accent transition-colors duration-300 hover:bg-accent-soft"
            >
              Install · Email me
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-foreground/15 px-6 py-4 text-center text-sm font-bold uppercase tracking-widest text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
            >
              LinkedIn ↗
            </a>
            <a
              href={site.resumeUrl}
              download
              className="rounded-full border border-foreground/15 px-6 py-4 text-center text-sm font-bold uppercase tracking-widest text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
            >
              Download CV
            </a>
          </div>
          <p className="mt-5 text-center text-xs text-foreground/35">{site.email}</p>
        </div>
      </Reveal>
    </section>
  );
}
