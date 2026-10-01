"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "~/app/_components/ui/page-shell";
import Button from "~/app/_components/ui/button";
import GithubMeta from "~/app/_components/ui/github-meta";
import { ContourRule, SectionLabel } from "~/app/_components/ui/survey-chrome";
import {
  liveLabel,
  plateNumber,
  projectKinds,
  projects,
  type Thumb,
} from "~/app/projects/data";

function ThumbFrame({
  thumb,
  image,
  title,
}: {
  thumb: Thumb;
  image: string;
  title: string;
}) {
  return (
    <div className="photo-corners relative aspect-[16/10] w-full overflow-hidden bg-secondary">
      {thumb === "phone" ? (
        <div className="absolute inset-y-2 left-1/2 aspect-[3/4] -translate-x-1/2 overflow-hidden border border-ink bg-card">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 40vw, 120px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 288px"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        />
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const [kind, setKind] = useState<(typeof projectKinds)[number]>("All");

  const filtered = useMemo(() => {
    if (kind === "All") return projects.map((p, i) => ({ project: p, index: i }));
    return projects
      .map((p, i) => ({ project: p, index: i }))
      .filter(({ project }) => project.kind === kind);
  }, [kind]);

  return (
    <PageShell>
      <header className="max-w-2xl">
        <SectionLabel>Catalog</SectionLabel>
        <ContourRule />
        <h1 className="engraved mt-5 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          A few of the things I have shipped – apps on phones, tools in terminals,
          and some experiments that stuck around.
        </p>
      </header>

      <div className="mt-10 flex flex-wrap gap-3">
        {projectKinds.map((k) => (
          <Button
            key={k}
            type="button"
            variant={kind === k ? "solid" : "ghost"}
            onClick={() => setKind(k)}
            className={
              kind === k
                ? "border-ink bg-ink text-paper shadow-[0_1px_0_hsl(var(--ink)/0.25)] hover:bg-accent hover:border-accent hover:text-paper"
                : "border-ink bg-paper text-ink shadow-[0_1px_0_hsl(var(--ink)/0.15)] hover:bg-accent hover:border-accent hover:text-paper"
            }
          >
            {k}
          </Button>
        ))}
      </div>

      <ul className="mt-4 divide-y divide-dashed divide-line border-b border-dashed border-line">
        {filtered.map(({ project, index }, i) => (
          <motion.li
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.2) }}
            className="group grid gap-5 py-7 md:grid-cols-[minmax(0,18rem)_1fr] md:items-center md:gap-8"
          >
            <Link href={`/projects/${project.slug}`} className="block">
              <ThumbFrame
                thumb={project.thumb}
                image={project.image}
                title={project.title}
              />
            </Link>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="stamp">{plateNumber(index)}</span>
                <p className="font-label text-ink-muted">{project.kind}</p>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                    project.status === "cooking"
                      ? "text-accent"
                      : "text-ink-muted"
                  }`}
                >
                  {project.status === "cooking" ? "● Cooking" : "✓ Shipped"}
                </span>
              </div>
              <h2 className="engraved mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
                <Link
                  href={`/projects/${project.slug}`}
                  className="hover:text-accent"
                >
                  {project.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-measure text-base leading-relaxed text-ink-muted">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-medium text-accent underline decoration-dashed underline-offset-4 hover:underline"
                >
                  Read more
                </Link>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    {liveLabel(project.live)}
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    Code
                  </a>
                )}
              </div>
              {project.github && (
                <div className="mt-3">
                  <GithubMeta github={project.github} />
                </div>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </PageShell>
  );
}
