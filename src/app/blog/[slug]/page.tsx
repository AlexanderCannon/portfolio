import Link from "next/link";
import { notFound } from "next/navigation";
import { NewComment } from "~/app/_components/forms/new-comment";
import { MarkdownRenderer } from "~/app/_components/ui/markdown-renderer";
import { type Metadata } from "next";
import { api } from "~/trpc/server";

type BlogPageProps = { params: Promise<{ slug: string }> };

// Helper function to get post data
async function getPostData(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  return await api.post.getPostBySlug({ slug });
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = await getPostData(params);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: post.name,
    description: post.body?.slice(0, 160) ?? "Read this blog post by Alexander Cannon",
  };
}

export default async function PostPage({ params }: BlogPageProps) {
  const post = await getPostData(params);

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/blog" passHref>
        <p className="text-purple-600">← Back to blog</p>
      </Link>
      <br />
      <article className="prose lg:prose-xl max-w-screen-md mx-auto">
        <h1 className="mb-4 text-3xl font-bold">{post.name}</h1>
        <div className="mb-8 text-gray-600">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
        {post.body && <MarkdownRenderer content={post.body} />}
        <Link href="/blog" passHref>
          <p className="text-purple-600">← Read more articles</p>
        </Link>

        {/* {Comments section} */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Comments</h2>
          {post.comments.length === 0 ? (
            <p className="text-gray-600">No comments yet.</p>
          ) : (
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="mb-2 font-semibold">{comment.name ?? "Anonymous"}</div>
                  <div className="text-gray-700">{comment.body}</div>
                  <div className="mt-2 text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
          {
            post.slug && (<NewComment postId={post.id} slug={post.slug} />)
          }
        </section>
      </article>
    </main>
  );
}
