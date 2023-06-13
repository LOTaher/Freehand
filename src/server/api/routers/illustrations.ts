import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const illustrationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.illustration.findMany();
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3).max(16),
        src: z.string().url(),
        link: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const illustration = await ctx.prisma.illustration.create({
        data: {
          title: input.title,
          src: input.src,
          link: input.link,
        },
      });

      return illustration;
    }),
});
