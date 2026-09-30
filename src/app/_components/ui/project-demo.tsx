/** Lightweight ASCII “demo” plates — no video assets required. */
const demos: Record<string, string[]> = {
  pathranger: [
    "$ pathranger init --shell zsh",
    "$ pr goto portfolio",
    "→ /Users/alexandercannon/fun/portfolio",
    "$ pathranger search path",
    "  1. …/fun/pathranger",
    "  2. …/fun/portfolio",
  ],
  cacheclip: [
    "$ cacheclip daemon &",
    "$ cacheclip search token",
    "  0  sk_live_… (2m ago)",
    "  1  Bearer eyJ… (11m ago)",
    "$ cacheclip restore 0",
    "✓ restored to clipboard",
  ],
  "eurovision-party": [
    "ROOM  EU26 · LIVE",
    "  12  Sweden",
    "  10  France",
    "   8  United Kingdom",
    "   7  …",
    "leaderboard updating…",
  ],
};

export default function ProjectDemo({ slug }: { slug: string }) {
  const lines = demos[slug];
  if (!lines) return null;

  return (
    <section className="mt-16 border-t-2 border-ink pt-12">
      <h2 className="misregister font-display text-3xl font-semibold tracking-tight text-ink">
        Demo strip
      </h2>
      <pre className="mt-6 max-w-2xl overflow-x-auto rounded-sm border-2 border-ink bg-[#12100e] px-4 py-4 font-mono text-[13px] leading-relaxed text-[#e8e2d9]">
        {lines.join("\n")}
      </pre>
    </section>
  );
}
