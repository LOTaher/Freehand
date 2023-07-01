import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getUserDownloads: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input: { id }, ctx }) => {
      const data = await ctx.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          downloads: true,
        },
      });
      return {
        downloads: data?.downloads,
      };
    }),
});
