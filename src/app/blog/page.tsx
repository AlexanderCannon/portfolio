import Link from "next/link";
import { count } from "drizzle-orm";
import { type Metadata } from "next";
import PageShell from "~/app/_components/ui/page-shell";
import { ContourRule, SectionLabel } from "~/app/_components/ui/survey-chrome";
import { db } from "~/server/db";
import { posts as postsTable } from "~/server/db/schema";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and articles from Alexander Cannon",
};

// ponytail: skip RSC tRPC (headers() → always dynamic + artificial delay). ISR the list.
export const revalidate = 3600;

export default async function PostsPage() {
  const limit = 100;
  const offset = 0;

  const [posts, totals] = await Promise.all([
    db.query.posts.findMany({
      orderBy: (p, { desc }) => [desc(p.createdAt)],
      limit,
      offset,
      columns: {
        id: true,
        name: true,
        slug: true,
        body: true,
        createdAt: true,
      },
      with: {
        comments: { columns: { id: true } },
      },
    }),
    db.select({ count: count() }).from(postsTable),
  ]);

  const postCount = totals[0]?.count ?? 0;

  return (
    <PageShell>
      <header className="max-w-measure">
        <SectionLabel>Field notes</SectionLabel>
        <ContourRule />
        <h1 className="engraved mt-5 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          I write about engineering, leadership and building things on{" "}
          <a
            href="https://alexandercannon.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline decoration-dashed underline-offset-4 hover:underline"
          >
            Substack
          </a>
          . This is the archive of earlier notes, from before I moved there.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-12 text-ink-muted">No posts yet.</p>
      ) : (
        <section className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <SectionLabel>Earlier notes</SectionLabel>
              <ContourRule />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              {postCount} {postCount === 1 ? "post" : "posts"}
            </span>
          </div>
          <ul className="mt-6 divide-y divide-dashed divide-line border-b border-dashed border-line">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-x-10 gap-y-2 py-8 transition-colors hover:bg-accent-soft/40 sm:grid-cols-[9rem_1fr_auto] sm:px-3"
                >
                  <time
                    dateTime={post.createdAt.toISOString()}
                    className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted sm:pt-2"
                  >
                    {post.createdAt.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <div>
                    <h3 className="engraved font-display text-2xl tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
                      {post.name}
                    </h3>
                    <p className="mt-2 max-w-measure text-ink-muted">
                      {post.body?.slice(0, 160)}
                      {post.body && post.body.length > 160 ? "…" : ""}
                    </p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                      {post.comments.length}{" "}
                      {post.comments.length === 1 ? "comment" : "comments"}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="hidden pt-1 text-2xl text-ink-muted transition-all group-hover:translate-x-1 group-hover:text-accent sm:block"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
        Showing {Math.min(offset + 1, postCount)}–
        {Math.min(offset + limit, postCount)} of {postCount}
      </p>
    </PageShell>
  );
}
