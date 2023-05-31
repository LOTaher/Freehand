import { createTRPCRouter, publicProcedure } from "../trpc";

export const illustrationRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.illustration.findMany();
  }),
});
