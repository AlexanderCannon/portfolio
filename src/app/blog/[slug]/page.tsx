import Link from "next/link";
import { notFound } from "next/navigation";
import { NewComment } from "~/app/_components/forms/new-comment";
import { MarkdownRenderer } from "~/app/_components/ui/markdown-renderer";
// import { Metadata } from "next/types";
import { api } from "~/trpc/server";


type Post = Awaited<ReturnType<typeof api.post.getPostBySlug>>;


type BlogPageProps = Promise<{ slug: string }>;


export default async function PostPage({
  params,
}: {
  params: BlogPageProps
}) {
  const { slug } = await params;
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

  void api.post.getPostBySlug.prefetch({ slug });

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
    </main >
  );
}

// // Generate metadata for the page
// export async function generateMetadata(,
// ): Promise<Metadata> {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const { slug } = props.params as any;
//   let post: Post | null = null;

//   try {
//     post = await api.post.getPostBySlug({ slug });
//     if (!post) {
//       throw new Error('Post not found');
//     }
//     return {
//       title: post.name,
//       description: post.body?.slice(0, 155),
//     };
//   } catch {
//     return {
//       title: 'Post Not Found',
//       description: 'The requested post could not be found.',
//     };
//   }
// }