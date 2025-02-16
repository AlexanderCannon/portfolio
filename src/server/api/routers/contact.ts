import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { contacts } from "~/server/db/schema";

export const contactRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        message: z.string().min(1),
        company: z.string().optional(),
        jobTitle: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(contacts).values({
        name: input.name,
        email: input.email,
        message: input.message,
        company: input.company,
        jobTitle: input.jobTitle,
      });
    }),

  emailSignup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(contacts).values({
        email: input.email,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const contact = await ctx.db.query.contacts.findMany({
      orderBy: (contacts, { desc }) => [desc(contacts.createdAt)],
    });

    return contact;
  }),
});
