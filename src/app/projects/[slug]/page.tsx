import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import PageShell from "~/app/_components/ui/page-shell";
import Button from "~/app/_components/ui/button";
import GithubMeta from "~/app/_components/ui/github-meta";
import ProjectDemo from "~/app/_components/ui/project-demo";
import {
  getProjectBySlug,
  liveLabel,
  projects,
  roleLabel,
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
        <header className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
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
          <h1 className="engraved mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted sm:text-xl">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {project.live && (
              <Button
                link={project.live}
                target="_blank"
                rel="noopener noreferrer"
              >
                {liveLabel(project.live)}
              </Button>
            )}
            {project.github && (
              <Button
                link={project.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="link"
              >
                View code
              </Button>
            )}
          </div>
          {project.github && (
            <div className="mt-3">
              <GithubMeta github={project.github} />
            </div>
          )}
        </header>

        <div
          className={
            project.thumb === "phone"
              ? "photo-corners relative mt-12 aspect-[16/10] max-w-md overflow-hidden bg-secondary"
              : "photo-corners relative mt-12 aspect-[16/10] max-w-2xl overflow-hidden bg-secondary"
          }
        >
          {project.thumb === "phone" ? (
            <div className="absolute inset-y-3 left-1/2 aspect-[3/4] -translate-x-1/2 overflow-hidden border border-ink bg-card">
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

        <div className="mt-12 max-w-measure space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
          {project.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <ProjectDemo slug={project.slug} />

        <section className="mt-16 pt-12">
          <h2 className="engraved font-display text-3xl tracking-tight text-ink">
            Built with
          </h2>
          <p className="mt-5 max-w-measure text-lg leading-relaxed text-ink sm:text-xl">
            {project.stack.join(" · ")}
          </p>
        </section>

        <section className="mt-16 pt-12">
          <h2 className="engraved font-display text-3xl tracking-tight text-ink">
            Where it got hard
          </h2>
          <ol className="mt-8 max-w-2xl divide-y divide-dashed divide-line border-y border-dashed border-line">
            {project.challenges.map((item, index) => (
              <li
                key={item.slice(0, 48)}
                className="grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6"
              >
                <span className="stamp self-start">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-base leading-relaxed text-ink-muted sm:text-lg">
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 pt-12">
          <h2 className="engraved font-display text-3xl tracking-tight text-ink">
            Role
          </h2>
          <p className="engraved mt-5 max-w-measure font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
            {roleLabel(project)}
          </p>
        </section>
      </article>
    </PageShell>
  );
}
