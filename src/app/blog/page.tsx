import Link from "next/link";
import { api } from "~/trpc/server";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read Alexander Cannon's latest blog posts and articles",
};

export default async function PostsPage() {
  const offset = 0;
  const limit = 100;
  const [posts, totalPosts] = await Promise.all([
    api.post.getPostsWithLimit({ limit, offset }),
    api.post.getTotalPosts(),
  ]);

  if (!totalPosts?.[0]) {
    throw new Error('Failed to fetch total posts count');
  }

  const [{ count }] = totalPosts

  void await api.post.getPostsWithLimit.prefetch({ limit });
  void api.post.getTotalPosts.prefetch();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Blog Posts</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-300 hover:shadow-lg"
            >
              <article>
                <h2 className="mb-3 text-2xl font-semibold group-hover:text-blue-600">
                  {post.name}
                </h2>

                <p className="mb-4 text-gray-600">
                  {post.body?.slice(0, 150)}
                  {post.body && post.body.length > 150 ? "..." : ""}
                </p>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <time dateTime={post.createdAt.toISOString()}>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </time>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">•</span>
                    <span>{post.comments.length} comments</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
      <p>Posts {offset + 1} to {count < offset + limit ? count : offset + limit} of {count}</p>
    </main>
  );
}