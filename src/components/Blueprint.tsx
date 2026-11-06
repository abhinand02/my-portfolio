// Background: a faint blueprint grid with Dart/Flutter snippets that fade in and out.
// Purely decorative (aria-hidden in Scene). Edit `snippets` to change the code shown.

type Tok = [text: string, kind?: "kw" | "str" | "fn" | "cm" | "num"];

const snippets: { code: Tok[][]; pos: string }[] = [
  {
    pos: "left-[6%] top-[14%]",
    code: [[["void ", "kw"], ["main", "fn"], ["() => "], ["runApp", "fn"], ["(const "], ["Abhi", "fn"], ["());"]]],
  },
  {
    pos: "left-[38%] top-[30%] hidden md:block",
    code: [
      [["class ", "kw"], ["Abhi ", "fn"], ["extends ", "kw"], ["StatelessWidget", "fn"], [" {"]],
      [["  @override", "cm"]],
      [["  Widget ", "kw"], ["build", "fn"], ["(context) => "], ["Portfolio", "fn"], ["();"]],
      [["}"]],
    ],
  },
  {
    pos: "left-[8%] top-[52%]",
    code: [[["final ", "kw"], ["years = "], ["3", "num"], [";  "], ["// and counting", "cm"]]],
  },
  {
    pos: "left-[30%] top-[72%] hidden md:block",
    code: [
      [["await ", "kw"], ["ship", "fn"], ["(app, to: ["]],
      [["  Store.play, Store.appStore,"]],
      [["]);"]],
    ],
  },
  {
    pos: "left-[5%] top-[86%]",
    code: [[["BlocProvider", "fn"], ["(create: (_) => "], ["CareerCubit", "fn"], ["())"]]],
  },
  {
    pos: "right-[8%] top-[8%] hidden lg:block",
    code: [[["$ ", "cm"], ["flutter build ipa --release", "str"]]],
  },
  {
    pos: "right-[30%] top-[90%] hidden lg:block",
    code: [[["if ", "kw"], ["(crash) "], ["fix", "fn"], ["();  "], ["// Crashlytics", "cm"]]],
  },
];

const color: Record<NonNullable<Tok[1]>, string> = {
  kw: "text-accent",
  fn: "text-foreground/80",
  str: "text-glow-2",
  num: "text-glow-2",
  cm: "text-foreground/40",
};

// Small "+" markers at grid intersections (multiples of 96px).
const marks = [
  [192, 96], [480, 288], [768, 192], [96, 480], [672, 576], [1056, 384], [288, 768], [960, 672], [1248, 864],
];

export default function Blueprint() {
  return (
    <>
      <div className="blueprint absolute inset-0" />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,black,transparent)]">
        {marks.map(([x, y]) => (
          <span key={`${x}-${y}`} className="absolute text-[11px] leading-none text-accent/40" style={{ left: x - 4, top: y - 6 }}>
            +
          </span>
        ))}
      </div>

      <div className="code-layer absolute inset-0">
        {snippets.map((s, i) => (
          <pre
            key={i}
            className={`code-fade absolute font-mono text-[11px] leading-relaxed text-foreground/60 md:text-xs ${s.pos}`}
            style={{ animationDelay: `${i * 2.3}s` }}
          >
            {s.code.map((line, j) => (
              <div key={j}>
                {line.map(([text, kind], k) => (
                  <span key={k} className={kind ? color[kind] : undefined}>
                    {text}
                  </span>
                ))}
                {j === s.code.length - 1 && <span className="code-caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-accent/70" />}
              </div>
            ))}
          </pre>
        ))}
      </div>
    </>
  );
}
