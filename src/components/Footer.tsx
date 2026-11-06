import { site } from "@/data/site";

// Footer styled like the end of an app: a dock of contact "apps", a huge wordmark
// and a version line. Icons are inline SVG paths (24×24).
const icons = {
  mail: "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.4l8 5.1 8-5.1V7zm16 2.8-7.5 4.8a1 1 0 0 1-1 0L4 9.8V17h16z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM9.5 9.75h3.8v1.55h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65V21h-4z",
  cv: "M6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V9h5.5zM8 13h8v1.5H8zm0 3.5h8V18H8zm0-7h3V11H8z",
  whatsapp:
    "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-3.3-2.9c-.25-.43.25-.4.71-1.33.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48a.92.92 0 0 0-.67.31 2.8 2.8 0 0 0-.87 2.08 4.9 4.9 0 0 0 1.02 2.6c.13.16 1.75 2.68 4.25 3.76 1.58.68 2.2.74 2.99.62.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.15-1.18-.06-.1-.23-.17-.48-.29z",
};

export default function Footer() {
  const latest = site.changelog[site.changelog.length - 1];
  const dock = [
    { label: "Email", href: `mailto:${site.email}`, icon: icons.mail, colors: ["#74d3ae", "#3f8f73"] },
    { label: "LinkedIn", href: site.linkedin, icon: icons.linkedin, colors: ["#3b82c4", "#1d4f86"], external: true },
    { label: "CV", href: site.resumeUrl, icon: icons.cv, colors: ["#a6c48a", "#678d58"], download: true },
    ...(site.whatsapp
      ? [{ label: "WhatsApp", href: `https://wa.me/${site.whatsapp}`, icon: icons.whatsapp, colors: ["#3fd17a", "#1f9d55"], external: true }]
      : []),
  ];

  return (
    <footer className="relative overflow-hidden border-t border-foreground/10 px-5 pb-10 pt-24 md:px-20">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative flex flex-col items-center text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-accent">End of app</p>
        <h2 className="mt-5 text-4xl font-black tracking-tighter md:text-6xl">
          Thanks for installing <span className="font-serif font-normal italic">Abhi</span>
          <span className="text-accent">.</span>
        </h2>

        {/* Dock */}
        <nav aria-label="Contact" className="mt-12 flex items-end gap-3 rounded-[2rem] border border-foreground/10 bg-foreground/[0.04] p-3 backdrop-blur-xl md:gap-4 md:p-4">
          {dock.map((d) => (
            <a
              key={d.label}
              href={d.href}
              {...(d.external ? { target: "_blank", rel: "noreferrer" } : {})}
              {...(d.download ? { download: true } : {})}
              className="group flex flex-col items-center gap-2"
            >
              <span
                className="relative flex size-14 items-center justify-center overflow-hidden rounded-[26%] shadow-lg transition-transform duration-300 ease-out group-hover:-translate-y-3 group-hover:scale-110 group-focus-visible:-translate-y-3 md:size-16"
                style={{ background: `linear-gradient(140deg, ${d.colors[0]}, ${d.colors[1]})` }}
              >
                <svg viewBox="0 0 24 24" className="size-6 fill-white md:size-7" aria-hidden="true">
                  <path d={d.icon} />
                </svg>
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 to-transparent to-50%" />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-foreground/55 group-hover:text-foreground">
                {d.label}
              </span>
            </a>
          ))}
        </nav>
        <a href={`mailto:${site.email}`} className="mt-5 text-sm text-foreground/45 transition-colors hover:text-accent">
          {site.email}
        </a>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-foreground/40">
          {site.nav.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className="transition-colors hover:text-foreground">
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>

      {/* Huge wordmark */}
      <p
        aria-hidden="true"
        className="ghost relative mt-16 select-none text-center text-[19vw] font-black uppercase leading-[0.8] tracking-tighter md:mt-20"
      >
        {site.name}
      </p>

      <div className="relative mt-8 flex flex-col items-center justify-between gap-3 border-t border-foreground/10 pt-6 font-mono text-[10px] uppercase tracking-widest text-foreground/40 sm:flex-row">
        <p className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_0_4px] shadow-accent/20" />
          {latest.version} · build {site.year} · {site.location} · Available for work
        </p>
        <p>
          © {site.year} {site.fullName}
        </p>
      </div>
    </footer>
  );
}
