import Link from "next/link";
import { api } from "~/trpc/server";
import { type Metadata } from "next";
import PageShell from "~/app/_components/ui/page-shell";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and articles from Alexander Cannon",
};

export default async function PostsPage() {
  const offset = 0;
  const limit = 100;
  const [posts, totalPosts] = await Promise.all([
    api.post.getPostsWithLimit({ limit, offset }),
    api.post.getTotalPosts(),
  ]);

  if (!totalPosts?.[0]) {
    throw new Error("Failed to fetch total posts count");
  }

  const [{ count }] = totalPosts;

  void (await api.post.getPostsWithLimit.prefetch({ limit }));
  void api.post.getTotalPosts.prefetch();

  return (
    <PageShell>
      <header className="max-w-measure">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          Writing
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
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
        <ul className="mt-12 divide-y divide-line border-y border-line">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-8 transition-transform duration-200 hover:translate-x-1"
              >
                <time
                  dateTime={post.createdAt.toISOString()}
                  className="text-xs uppercase tracking-[0.12em] text-ink-muted"
                >
                  {new Date(post.createdAt).toLocaleDateString()}
                </time>
                <h2 className="mt-2 font-display text-2xl text-ink group-hover:text-accent sm:text-3xl">
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
        Showing {Math.min(offset + 1, count)}–
        {Math.min(offset + limit, count)} of {count}
      </p>
    </PageShell>
  );
}
