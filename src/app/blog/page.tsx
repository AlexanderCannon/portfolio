import Link from "next/link";
import { count } from "drizzle-orm";
import { type Metadata } from "next";
import PageShell from "~/app/_components/ui/page-shell";
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
        <p className="font-label text-accent">Writing</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tighter text-ink sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          New writing lives on{" "}
          <a
            href="https://alexandercannon.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Substack
          </a>
          . Older notes stay here.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-12 text-ink-muted">No posts yet.</p>
      ) : (
        <ul className="mt-12 divide-y divide-line border-y-2 border-ink">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block py-8">
                <time
                  dateTime={post.createdAt.toISOString()}
                  className="font-label text-ink-muted"
                >
                  {post.createdAt.toLocaleDateString()}
                </time>
                <h2 className="misregister mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {post.name}
                </h2>
                <p className="mt-2 max-w-measure text-ink-muted">
                  {post.body?.slice(0, 160)}
                  {post.body && post.body.length > 160 ? "…" : ""}
                </p>
                <p className="mt-3 text-sm text-ink-muted">
                  {post.comments.length} comments
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-sm text-ink-muted">
        Showing {Math.min(offset + 1, postCount)}–
        {Math.min(offset + limit, postCount)} of {postCount}
      </p>
    </PageShell>
  );
}
