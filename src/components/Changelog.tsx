import { site } from "@/data/site";
import Reveal from "./Reveal";
import SectionTitle, { Accent } from "./SectionTitle";

// Screen 3 — Changelog: the career told as version history, newest first.
export default function Changelog() {
  const entries = [...site.changelog].reverse();
  return (
    <section id="changelog" className="px-5 py-32 md:px-20 md:py-44">
      <Reveal>
        <SectionTitle label="Screen 03 · Changelog" title="Version history" />
        <p className="-mt-6 mb-20 max-w-4xl text-2xl font-light leading-snug text-foreground/70 md:-mt-10 md:text-4xl">
          <Accent text={site.thread} />
        </p>
      </Reveal>

      <ol className="relative border-l border-foreground/10 md:ml-[7.5rem]">
        {entries.map((e, i) => (
          <li key={e.version} className="relative pb-16 pl-8 last:pb-0 md:pl-12">
            <Reveal>
              {/* Timeline dot; the latest version glows. */}
              <span
                className={`absolute -left-[5px] top-2 size-[9px] rounded-full ${
                  i === 0 ? "bg-accent shadow-[0_0_0_6px] shadow-accent/20" : "bg-foreground/30"
                }`}
              />
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 md:-ml-[11.5rem]">
                <span className="shrink-0 font-mono text-sm text-accent md:w-28 md:text-right">{e.version}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 md:hidden">
                  {e.when}
                </span>
              </div>
              <h3 className="mt-2 flex flex-wrap items-center gap-3 text-3xl font-black tracking-tighter md:text-5xl">
                {e.title}
                {i === 0 && (
                  <span className="rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-accent">
                    Latest
                  </span>
                )}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-widest text-foreground/40">
                <span className="hidden md:inline">{e.when}</span>
                {e.where && (
                  <>
                    <span className="hidden md:inline"> · </span>
                    {e.where}
                  </>
                )}
              </p>
              <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-foreground/55 md:text-base">
                {e.text}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
