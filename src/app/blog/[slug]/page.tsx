import { notFound } from "next/navigation";
import { api } from "~/trpc/server";

interface PageProps {
  params: {
    slug: string;
  };
}

type Post = Awaited<ReturnType<typeof api.post.getPostBySlug>>;

export default async function PostPage({ params }: PageProps) {
  const { slug } = params;
  let post: Post | null = null;

  try {
    post = await api.post.getPostBySlug({ slug });
  } catch (error) {
    console.error(error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl">
        <h1 className="mb-4 text-3xl font-bold">{post.name}</h1>
        <div className="mb-8 text-gray-600">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>

        <div className="mb-12 whitespace-pre-wrap">{post.body}</div>

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
                  {comment.name && (
                    <div className="mb-2 font-semibold">{comment.name}</div>
                  )}
                  <div className="text-gray-700">{comment.body}</div>
                  <div className="mt-2 text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </article>
    </main>
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  let post: Post | null = null;

  try {
    post = await api.post.getPostBySlug({ slug });
    if (!post) {
      throw new Error('Post not found');
    }
    return {
      title: post.name,
      description: post.body?.slice(0, 155),
    };
  } catch {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.',
    };
  }
}