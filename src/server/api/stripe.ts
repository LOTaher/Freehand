import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import Stripe from "stripe";
import { buffer } from "micro";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      res.status(400).send(`Webhook Error: ${message}`);
    }

    // Handle the event
    switch (event.type) {
      case "subscription.payment_succeeded":
        const checkoutSessionCompleted = event.data.object as {
          id: string;
          metadata: {
            userId: string;
          };
        };
        // Then define and call a function to handle the event checkout.session.completed
        break;
      case "subscription.payment_failed":
        const subscriptionScheduleCanceled = event.data.object as {
          id: string;
          metadata: {
            userId: string;
          };
        };
        // Then define and call a function to handle the event subscription_schedule.canceled
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ recieved: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default webhook;
