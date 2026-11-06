import { site } from "@/data/site";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// Screen 2 — Onboarding: who I am, in 3 swipes.
// Side by side on desktop; a swipeable row on phones.
export default function Onboarding() {
  const steps = site.onboarding;
  return (
    <section id="onboarding" className="py-32 md:py-44">
      <Reveal className="px-5 md:px-20">
        <SectionTitle label="Screen 02 · Onboarding" title="Who I am" />
      </Reveal>
      <Reveal
        className="-my-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 py-4 [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-20 [&::-webkit-scrollbar]:hidden"
        stagger={0.12}
      >
        {steps.map((s, i) => (
          <article
            key={s.title}
            className="group flex min-h-[26rem] w-[82%] shrink-0 snap-center flex-col rounded-[2rem] border border-foreground/10 bg-background/60 p-8 backdrop-blur-md transition-colors duration-500 hover:border-accent/40 md:w-auto"
          >
            <p className="font-mono text-xs text-foreground/35">
              0{i + 1} / 0{steps.length}
            </p>
            <h3 className="mt-auto text-4xl font-black leading-[0.95] tracking-tighter md:text-5xl lg:text-4xl xl:text-[2.75rem]">
              {s.title.replace(/\.$/, "")}
              <span className="text-accent">.</span>
            </h3>
            <p className="mt-5 text-base font-light leading-relaxed text-foreground/55">{s.text}</p>
            {/* Onboarding-style progress dots. */}
            <div className="mt-8 flex gap-1.5" aria-hidden="true">
              {steps.map((_, j) => (
                <span
                  key={j}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    j === i ? "w-6 bg-accent" : "w-1.5 bg-foreground/20"
                  }`}
                />
              ))}
            </div>
          </article>
        ))}
      </Reveal>
      <p className="mt-6 px-5 text-center font-mono text-[10px] uppercase tracking-widest text-foreground/30 md:hidden">
        Swipe →
      </p>
    </section>
  );
}
