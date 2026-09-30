import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import PageShell from "~/app/_components/ui/page-shell";
import Button from "~/app/_components/ui/button";
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
          <p className="text-xs uppercase tracking-[0.14em] text-ink-muted">
            {project.kind}
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
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
        </header>

        <div
          className={
            project.thumb === "phone"
              ? "relative mt-12 aspect-[16/10] max-w-md overflow-hidden rounded-md border border-line bg-accent-soft"
              : "relative mt-12 aspect-[16/10] max-w-2xl overflow-hidden rounded-md border border-line bg-secondary"
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

        <div className="mt-12 max-w-measure space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
          {project.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        <section className="mt-16 border-t border-line pt-12">
          <h2 className="font-display text-3xl text-ink">Built with</h2>
          <p className="mt-5 max-w-measure text-lg leading-relaxed text-ink sm:text-xl">
            {project.stack.join(" · ")}
          </p>
        </section>

        <section className="mt-16 border-t border-line pt-12">
          <h2 className="font-display text-3xl text-ink">Where it got hard</h2>
          <ol className="mt-8 max-w-2xl divide-y divide-line border-y border-line">
            {project.challenges.map((item, index) => (
              <li
                key={item.slice(0, 48)}
                className="grid grid-cols-[3rem_1fr] gap-4 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6"
              >
                <span className="font-display text-2xl text-accent sm:text-3xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-base leading-relaxed text-ink-muted sm:text-lg">
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 border-t border-line pt-12">
          <h2 className="font-display text-3xl text-ink">Role</h2>
          <p className="mt-5 max-w-measure font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl">
            {roleLabel(project)}
          </p>
        </section>
      </article>
    </PageShell>
  );
}
