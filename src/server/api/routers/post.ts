import { count, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { makeStringUrlSafe } from "~/utils/utils";
import { withCaching } from "~/lib/with-timeout";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), body: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
        body: input.body,
        slug: makeStringUrlSafe(input.name),
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await withCaching(
      async () => {
        const post = await ctx.db.query.posts.findFirst({
          orderBy: (posts, { desc }) => [desc(posts.createdAt)],
          with: {
            comments: true,
          },
        });
        return post ?? null;
      },
      {
        timeoutMs: 5000,
        fallback: null,
        cacheKey: 'getLatest'
      }
    );
  }),

  getPostsWithLimit: publicProcedure
    .input(z.object({ limit: z.number(), offset: z.number().default(0) }))
    .query(async ({ ctx, input }) => {
      return await withCaching(
        async () => {
          const posts = await ctx.db.query.posts.findMany({
            orderBy: (posts, { desc }) => [desc(posts.createdAt)],
            limit: input.limit,
            offset: input.offset,
            with: {
              comments: true,
            },
          });
          return posts;
        },
        {
          timeoutMs: 5000,
          fallback: [],
          cacheKey: `getPostsWithLimit-${input.limit}-${input.offset}`
        }
      );
    }),

  getPostBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await withCaching(
        async () => {
          const post = await ctx.db.query.posts.findFirst({
            where: eq(posts.slug, input.slug),
            with: {
              comments: true,
            },
          });
          return post ?? null;
        },
        {
          timeoutMs: 5000,
          fallback: null,
          cacheKey: `getPostBySlug-${input.slug}`
        }
      );
    }),

  getTotalPosts: publicProcedure.query(async ({ ctx }) => {
    return await withCaching(
      async () => {
        return await ctx.db.select({ count: count() }).from(posts);
      },
      {
        timeoutMs: 5000,
        fallback: [{ count: 0 }],
        cacheKey: 'getTotalPosts'
      }
    );
  }),
});
