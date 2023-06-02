import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env.mjs";
import Stripe from "stripe";

const stripe = new Stripe(`${env.STRIPE_SECRET_KEY}`, {
  apiVersion: "2022-11-15",
});

export const checkoutRouter = createTRPCRouter({
  createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
    return stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      metadata: {
        userId: ctx.session.user.id,
      },
      line_items: [{ price: env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${env.HOST_NAME}`,
      cancel_url: `${env.HOST_NAME}`,
    });
  }),
});
