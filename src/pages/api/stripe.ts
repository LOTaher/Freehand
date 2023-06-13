import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { env } from "~/env.mjs";
import { buffer } from "micro";
import { prisma } from "~/server/db";

const stripe = new Stripe(`${env.STRIPE_SECRET_KEY}`, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("here");
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        `${env.STRIPE_WEBHOOK_SECRET}`
      );
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object as {
          id: string;
          metadata: {
            userId: string;
          };
        };

        await prisma.user.update({
          where: {
            id: checkoutSessionCompleted.metadata.userId,
          },
          data: {
            subscription: "PRO",
          },
        });
        break;

      case "subscription.payment_succeeded":
        const subscriptionPaymentSucceeded = event.data.object as {
          id: string;
          metadata: {
            userId: string;
          };
        };

        await prisma.user.update({
          where: {
            id: subscriptionPaymentSucceeded.metadata.userId,
          },
          data: {
            subscription: "PRO",
          },
        });
        break;

      case "subscription.payment_failed":
        const subscriptionPaymentFailed = event.data.object as {
          id: string;
          metadata: {
            userId: string;
          };
        };

        await prisma.user.update({
          where: {
            id: subscriptionPaymentFailed.metadata.userId,
          },
          data: {
            subscription: "FREE",
          },
        });
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhook;
