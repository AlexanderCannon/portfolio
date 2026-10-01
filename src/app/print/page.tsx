import { type Metadata } from "next";
import Link from "next/link";
import resume from "public/resume.json";

export const metadata: Metadata = {
  title: "Print resume",
  description: "Printable one-pager resume for Alexander Cannon.",
};

export default function PrintResumePage() {
  return (
    <div className="mx-auto max-w-3xl bg-paper px-6 py-10 text-ink print:max-w-none print:px-0 print:py-0">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <p className="font-label text-accent">Print sheet</p>
        <div className="flex gap-4 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            ⌘P / Ctrl+P to print
          </span>
          <Link href="/experience" className="text-ink-muted hover:text-ink">
            ← Experience
          </Link>
        </div>
      </div>

      <header className="border-b border-line pb-6">
        <h1 className="font-display text-4xl font-medium tracking-tight">
          {resume.personalInfo.name}
        </h1>
        <p className="mt-2 text-ink-muted">{resume.professionalSummary}</p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
          {resume.personalInfo.email} · {resume.personalInfo.location}
        </p>
      </header>

      <section className="mt-8">
        <h2 className="font-label text-ink-muted">Stack</h2>
        <p className="mt-2 text-sm leading-relaxed">
          {[
            ...resume.skills.languages,
            ...resume.skills.frameworks,
            ...resume.skills.cloud,
            ...resume.skills.data,
            ...resume.skills.notes,
          ].join(" · ")}
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-label text-ink-muted">Experience</h2>
        <ul className="mt-4 space-y-6">
          {resume.experience.slice(0, 6).map((exp) => (
            <li key={`${exp.company}-${exp.period}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-medium tracking-tight">
                  {exp.company}
                </h3>
                <span className="font-mono text-[11px] text-ink-muted">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-ink-muted">
                {exp.title} · {exp.location}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-muted">
                {exp.responsibilities.slice(0, 3).map((r) => (
                  <li key={r.slice(0, 40)}>{r}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 border-t border-line pt-6">
        <h2 className="font-label text-ink-muted">Education</h2>
        <p className="mt-2 text-sm">
          {resume.education.degree}, {resume.education.institution} (
          {resume.education.graduationYear}) — {resume.education.honors}
        </p>
      </section>

      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted print:mt-6">
        alexandercannon.dev · Edition 2026.09
      </p>
    </div>
  );
}
