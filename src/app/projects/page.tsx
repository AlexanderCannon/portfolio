"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "~/app/_components/ui/page-shell";
import { liveLabel, projects, type Thumb } from "~/app/projects/data";

function ThumbFrame({
  thumb,
  image,
  title,
}: {
  thumb: Thumb;
  image: string;
  title: string;
}) {
  // One footprint for every row → text column never zig-zags.
  // Phones sit in an accent-soft mat so the empty sides feel intentional.
  return (
    <div
      className={
        thumb === "phone"
          ? "relative aspect-[16/10] w-full overflow-hidden rounded-md border border-line bg-accent-soft"
          : "relative aspect-[16/10] w-full overflow-hidden rounded-md border border-line bg-secondary"
      }
    >
      {thumb === "phone" ? (
        <div className="absolute inset-y-2 left-1/2 aspect-[3/4] -translate-x-1/2 overflow-hidden rounded-[0.4rem] border border-line bg-card shadow-sm">
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
  return (
    <PageShell>
      <header className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          Work
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Projects
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          Things I have shipped – apps on phones, tools in terminals, and a few
          experiments that stuck around.
        </p>
      </header>

      <ul className="mt-14 divide-y divide-line border-y border-line">
        {projects.map((project, index) => (
          <motion.li
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.2) }}
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
              <p className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                {project.kind}
              </p>
              <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
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
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-medium text-accent underline-offset-4 hover:underline"
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
            </div>
          </motion.li>
        ))}
      </ul>
    </PageShell>
  );
}
