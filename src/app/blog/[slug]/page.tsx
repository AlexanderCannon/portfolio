import Link from "next/link";
import { notFound } from "next/navigation";
import { NewComment } from "~/app/_components/forms/new-comment";
import { MarkdownRenderer } from "~/app/_components/ui/markdown-renderer";
import PageShell from "~/app/_components/ui/page-shell";
import { type Metadata } from "next";
import { api } from "~/trpc/server";

type BlogPageProps = { params: Promise<{ slug: string }> };

async function getPostData(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  return await api.post.getPostBySlug({ slug });
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const post = await getPostData(params);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: post.name,
    description:
      post.body?.slice(0, 160) ?? "Read this blog post by Alexander Cannon",
  };
}

export default async function PostPage({ params }: BlogPageProps) {
  const post = await getPostData(params);

  if (!post) {
    notFound();
  }

  return (
    <PageShell narrow>
      <Link
        href="/blog"
        className="text-sm text-accent underline-offset-4 hover:underline"
      >
        ← Back to blog
      </Link>

      <article className="mt-8">
        <time
          dateTime={post.createdAt.toISOString()}
          className="text-xs uppercase tracking-[0.12em] text-ink-muted"
        >
          {new Date(post.createdAt).toLocaleDateString()}
        </time>
        <h1 className="engraved mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {post.name}
        </h1>
        <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
          {post.body && <MarkdownRenderer content={post.body} />}
        </div>
      </article>

      <section className="mt-16 border-t border-dashed border-line pt-10">
        <h2 className="engraved font-display text-2xl tracking-tight text-ink">
          Comments
        </h2>
        {post.comments.length === 0 ? (
          <p className="mt-4 text-ink-muted">No comments yet.</p>
        ) : (
          <div className="mt-6 space-y-6">
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b border-dashed border-line pb-5"
              >
                <div className="font-medium text-ink">
                  {comment.name ?? "Anonymous"}
                </div>
                <div className="mt-1 text-ink-muted">{comment.body}</div>
                <div className="mt-2 text-xs text-ink-muted">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
        {post.slug && <NewComment postId={post.id} slug={post.slug} />}
      </section>
    </PageShell>
  );
}
