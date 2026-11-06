import { site } from "@/data/site";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// Screen 5 — Settings: skills shown as toggles, all switched on.
export default function Settings() {
  return (
    <section id="settings" className="px-5 py-32 md:px-20 md:py-44">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-24">
        <Reveal>
          <SectionTitle label="Screen 05 · Settings" title="Skills" />
          <p className="max-w-sm text-sm font-light leading-relaxed text-foreground/50 md:text-base">
            Everything I work with day to day. All switched on.
          </p>
        </Reveal>
        <Reveal>
          <ul className="overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-background/60 backdrop-blur-md">
            {site.settings.map((s) => (
              <li
                key={s}
                className="flex items-center justify-between gap-6 border-b border-foreground/5 px-6 py-5 last:border-0"
              >
                <span className="text-base font-medium tracking-tight md:text-lg">{s}</span>
                {/* Decorative "on" switch. */}
                <span aria-hidden="true" className="relative h-7 w-12 shrink-0 rounded-full bg-accent">
                  <span className="absolute right-0.5 top-0.5 size-6 rounded-full bg-white shadow-md" />
                </span>
                <span className="sr-only">On</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
