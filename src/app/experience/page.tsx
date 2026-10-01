import Link from "next/link";
import { type Metadata } from "next";
import PageShell from "~/app/_components/ui/page-shell";
import { ContourRule, SectionLabel } from "~/app/_components/ui/survey-chrome";
import Timeline from "~/app/_components/sections/timeline";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Alexander Cannon – software and teams over the last decade-plus.",
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <header className="max-w-2xl">
        <SectionLabel>Expedition log</SectionLabel>
        <ContourRule />
        <h1 className="engraved mt-5 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Professional experience
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Roles and projects from the last decade-plus.
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

      <section className="mt-16 pt-4">
        <SectionLabel>Timeline</SectionLabel>
        <ContourRule />
        <div className="mt-8">
          <Timeline />
        </div>
      </section>
    </PageShell>
  );
}
