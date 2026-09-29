import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import PageShell from "~/app/_components/ui/page-shell";
import {
  getProjectBySlug,
  liveLabel,
  projects,
} from "~/app/projects/data";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell>
      <Link
        href="/projects"
        className="text-sm text-accent underline-offset-4 hover:underline"
      >
        ← Back to projects
      </Link>

      <article className="mt-8">
        <p className="text-xs uppercase tracking-[0.14em] text-ink-muted">
          {project.kind}
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-measure text-lg leading-relaxed text-ink-muted">
          {project.description}
        </p>

        <div
          className={
            project.thumb === "phone"
              ? "relative mt-10 aspect-[16/10] max-w-md overflow-hidden rounded-md border border-line bg-accent-soft"
              : "relative mt-10 aspect-[16/10] max-w-2xl overflow-hidden rounded-md border border-line bg-secondary"
          }
        >
          {project.thumb === "phone" ? (
            <div className="absolute inset-y-3 left-1/2 aspect-[3/4] -translate-x-1/2 overflow-hidden rounded-[0.4rem] border border-line bg-card shadow-sm">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 50vw, 200px"
                className="object-cover object-top"
                priority
              />
            </div>
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover object-center"
              priority
            />
          )}
        </div>

        <div className="mt-10 max-w-measure space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
          {project.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 hover:underline"
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
      </article>
    </PageShell>
  );
}
