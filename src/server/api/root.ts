import { createTRPCRouter } from "~/server/api/trpc";
import { illustrationRouter } from "~/server/api/routers/illustrations";
import { checkoutRouter } from "~/server/api/routers/checkout";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  illustrations: illustrationRouter,
  checkout: checkoutRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
