import Link from "next/link";
import { type Metadata } from "next";
import PageShell from "~/app/_components/ui/page-shell";
import Timeline from "~/app/_components/sections/timeline";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Alexander Cannon — a decade-plus of shipping software and leading teams.",
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <header className="max-w-2xl">
        <p className="font-label text-accent">Expedition log</p>
        <h1 className="engraved mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Professional experience
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          A decade-plus of shipping software and leading teams.
        </p>
        <p className="mt-4 text-sm text-ink-muted">
          Prefer raw data?{" "}
          <Link
            href="/resume.json"
            target="_blank"
            className="text-accent underline decoration-dashed underline-offset-4 hover:underline"
          >
            Download resume.json
          </Link>
        </p>
      </header>

      <section className="mt-14 border-t border-dashed border-line pt-12">
        <h2 className="engraved mb-8 font-display text-3xl tracking-tight text-ink">
          Timeline
        </h2>
        <Timeline />
      </section>
    </PageShell>
  );
}
