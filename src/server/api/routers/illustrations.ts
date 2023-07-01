import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "../trpc";
import { z } from "zod";

export const illustrationRouter = createTRPCRouter({
  infiniteFeed: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), created_at: z.date() }).optional(),
      })
    )
    .query(async ({ input: { limit = 12, cursor }, ctx }) => {
      const data = await ctx.prisma.illustration.findMany({
        take: limit + 1,
        cursor: cursor ? { created_at_id: cursor } : undefined,
        orderBy: [{ created_at: "desc" }, { id: "desc" }],
        select: {
          id: true,
          title: true,
          src: true,
          created_at: true,
        },
      });

      let nextCursor: typeof cursor | undefined;
      if (data.length > limit) {
        const nextItem = data.pop();
        if (nextItem != null) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          nextCursor = { id: nextItem.id, created_at: nextItem.created_at! };
        }
      }

      return {
        illustrations: data.map((illustration) => {
          return {
            id: illustration.id,
            title: illustration.title,
            src: illustration.src,
          };
        }),
        nextCursor,
      };
    }),
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(3).max(23),
        src: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const illustration = await ctx.prisma.illustration.create({
        data: {
          title: input.title,
          src: input.src,
        },
      });

      return illustration;
    }),
  delete: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const deletedIllustration = await ctx.prisma.illustration.delete({
        where: {
          id: input.id,
        },
      });

      return deletedIllustration;
    }),
  decrement: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const downloads = await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          downloads: {
            decrement: 1,
          },
        },
      });

      return downloads;
    }),
});
