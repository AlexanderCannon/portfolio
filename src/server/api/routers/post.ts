import { count, eq } from "drizzle-orm";
import { off } from "process";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schema";
import { makeStringUrlSafe } from "~/utils/utils";

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
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
      with: {
        comments: true,
      },
    });

    return post ?? null;
  }),

  getPostsWithLimit: publicProcedure
    .input(z.object({ limit: z.number(), offset: z.number().default(0) }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.query.posts.findMany({
        orderBy: (posts, { desc }) => [desc(posts.createdAt)],
        limit: input.limit,
        offset: input.offset,
        with: {
          comments: true,
        },
      });

      return posts;
    }),

  getPostBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.query.posts.findFirst({
        where: eq(posts.slug, input.slug),
        with: {
          comments: true,
        },
      });

      return post ?? null;
    }),

  getTotalPosts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select({ count: count() }).from(posts);
  }),
});
