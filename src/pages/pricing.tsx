import { type NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { CheckmarkIcon } from "~/components/Icons";
import { useBuySubscription } from "~/hooks/useBuySubscription";
import { Footer } from "~/components/Footer";
import { motion } from "framer-motion";
import PricingNav from "~/components/PricingNav";
import { useSession } from "next-auth/react";

const Pricing: NextPage = () => {
  const { buySubscription } = useBuySubscription();

  const { data: session } = useSession();

  const FADE_DOWN_ANIMATION_VARIANT = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <>
      <Head>
        <title>Freehand • Pricing</title>
        <meta
          name="description"
          content="🖋️ Open Source Illustrations designed to elevate your next project."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PricingNav />

      <div className="mb-6 mt-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial="hidden"
              animate="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <motion.h2
                className="text-4xl font-extrabold text-gray-900"
                variants={FADE_DOWN_ANIMATION_VARIANT}
              >
                Unlock Full Access
              </motion.h2>
              <motion.p
                className="mt-4 text-lg font-normal text-gray-600"
                variants={FADE_DOWN_ANIMATION_VARIANT}
              >
                Support us and get complete access to our collection.
              </motion.p>
            </motion.div>
          </div>

          {/* One-Time Payment */}
          <div className="mt-7 flex items-center justify-center">
            <div className="max-w-md overflow-hidden rounded-lg bg-white shadow-md">
              <div className="p-6">
                <h3 className="text-center text-2xl font-bold text-gray-900">
                  One-Time Payment
                </h3>
                <p className="mt-2 text-center text-3xl font-bold text-gray-900 dark:text-white">
                  $4.99
                </p>
                <div className="mt-4 flex items-center">
                  <CheckmarkIcon />
                  <p className="ml-2 text-gray-600">
                    Full access to the entire collection of illustrations.
                  </p>
                </div>
                <div className="mt-4 flex items-center">
                  <CheckmarkIcon />
                  <p className="ml-2 text-gray-600">Support our team.</p>
                </div>
                <div className="mt-8 text-center">
                  {session && session.user.subscription === "FREE" && (
                    <button
                      className="font-inter ml-4 inline-block rounded-md bg-[#3299AF] px-4 py-2 font-medium text-white hover:bg-[#2f8ca1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => {
                        buySubscription().catch(console.error);
                      }}
                    >
                      Checkout with Stripe
                    </button>
                  )}
                  {session && session.user.subscription === "PRO" && (
                    <button
                      className="font-inter ml-4 inline-block rounded-md bg-[#3299AF] px-4 py-2 font-medium text-white hover:cursor-not-allowed hover:bg-[#2f8ca1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={true}
                    >
                      Purchased
                    </button>
                  )}
                  {!session && (
                    <Link
                      className="font-inter ml-4 inline-block rounded-md bg-[#3299AF] px-4 py-2 font-medium text-white hover:bg-[#2f8ca1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      href={"/sign-in"}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Another line break incident */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
};

export default Pricing;
