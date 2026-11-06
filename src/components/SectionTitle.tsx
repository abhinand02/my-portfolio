// Small orange label above a huge heading that ends in an orange period.
export default function SectionTitle({
  label,
  title,
  className = "",
}: {
  label: string;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-14 md:mb-20 ${className}`}>
      <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.5em] text-accent">{label}</p>
      <h2 className="text-[clamp(3rem,9vw,8rem)] font-black leading-[0.88] tracking-tighter">
        {title}
        <span className="text-accent">.</span>
      </h2>
    </div>
  );
}

// Turns "I build *fast* sites" into text with "fast" in italic serif.
export function Accent({ text }: { text: string }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") ? (
      <span key={i} className="font-serif italic text-foreground/90">
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  );
}
