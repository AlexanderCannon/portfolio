import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { comments } from "~/server/db/schema";

export const commentRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        postId: z.number(),
        body: z.string().min(1),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(comments).values({
        postId: input.postId,
        body: input.body,
        name: input.name,
      });
    }),

  getByPostId: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.query.comments.findMany({
        where: eq(comments.postId, input.postId),
        orderBy: (comments, { desc }) => [desc(comments.createdAt)],
      });
    }),
});
