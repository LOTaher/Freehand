import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getDownloads: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const downloads = await ctx.prisma.user.findUnique({
        where: { id: input.id },
        select: { downloads: true },
      });
      return downloads;
    }),
});
