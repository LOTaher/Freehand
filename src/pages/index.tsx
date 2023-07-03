import { type NextPage } from "next";
import Head from "next/head";
import { HomeNav } from "~/components/HomeNav";
import { motion } from "framer-motion";
import { Footer } from "~/components/Footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CheckmarkIcon } from "~/components/Icons";

const Landing: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const FADE_DOWN_ANIMATION_VARIANT = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  const FADE_UP_ANIMATION_VARIANT = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <>
      <Head>
        <title>NoNameYet</title>
        <meta name="description" content="DESCRIPTION HERE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <HomeNav />

      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-900">
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
          <div className="mx-auto max-w-screen-xl px-4 pb-1 pt-8 text-center lg:px-12">
            <motion.h1
              variants={FADE_DOWN_ANIMATION_VARIANT}
              className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl"
            >
              Beautiful Open Source Illustrations
            </motion.h1>
            <motion.p
              variants={FADE_DOWN_ANIMATION_VARIANT}
              className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-4 md:px-16 lg:text-xl xl:px-48"
            >
              Explore a curated collection of exquisite, free, and instantly
              usable handmade illustrations, designed to elevate your next
              project.
            </motion.p>
            <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
              {session ? (
                <motion.button
                  onClick={() => router.push("/browse")}
                  variants={FADE_DOWN_ANIMATION_VARIANT}
                  className="font-inter ml-4 rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Started
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => router.push("/sign-in")}
                  variants={FADE_DOWN_ANIMATION_VARIANT}
                  className="font-inter ml-4 rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Started
                </motion.button>
              )}
              <motion.button
                onClick={() => router.push("/about")}
                variants={FADE_DOWN_ANIMATION_VARIANT}
                className="font-inter rounded-md px-4 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-screen mx-auto flex content-center justify-center bg-white text-center dark:bg-gray-900 lg:px-12">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 sm:gap-y-2 lg:mx-0">
          <div className="flex items-center justify-center px-4">
            <motion.div
              initial="hidden"
              animate={"show"}
              viewport={{ once: false }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <motion.img
                src="https://uploadthing.com/f/2b492cf3-1abe-4f12-8ddf-e931b72fd95f_undraw_in_love_q0bn.svg"
                alt="Placeholder"
                className="pointer-events-none mt-2 aspect-square"
                variants={FADE_UP_ANIMATION_VARIANT}
                width={400}
                height={400}
              />
            </motion.div>
          </div>
          <div className="flex items-center justify-center">
            <motion.div
              initial="hidden"
              animate={"show"}
              viewport={{ once: false }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <motion.h1
                variants={FADE_UP_ANIMATION_VARIANT}
                className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white"
              >
                License
              </motion.h1>
              <motion.p
                variants={FADE_UP_ANIMATION_VARIANT}
                className="mx-2 mb-2 mt-3 text-lg font-normal text-gray-500 dark:text-gray-400"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et odit
                nostrum, cupiditate inventore labore suscipit id iure molestias
                maxime ullam perferendis quam praesentium, eligendi consectetur
                voluptas deserunt quasi assumenda mollitia.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-screen mx-auto flex content-center justify-center bg-white text-center dark:bg-gray-900 lg:px-12">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 sm:gap-y-2 lg:mx-0">
          <div className="flex flex-col content-start items-center justify-center px-4">
            <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
              Lorem
            </h1>
            <p className="mx-2 mb-2 mt-3 text-lg font-normal text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
              nunc eget odio ultricies aliquet. Nulla facilisi. Donec
              vestibulum, nunc eget aliquam ultricies, nunc velit ultrices
              augue, eget aliquam nisl nunc eget odio. Nulla facilisi. Donec
              vestibulum, nunc eget aliquam ultricies, nunc velit ultrices
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://uploadthing.com/f/e364008e-5e45-45e4-88ee-d47bb7e70f7a_undraw_drink_coffee_jdqb.svg"
              alt="Placeholder"
              className="pointer-events-none mt-2 aspect-square"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Unlock Full Access
            </h2>
            <p className="mt-4 text-lg font-normal text-gray-600">
              Support us and get complete access to our collection.
            </p>
          </div>

          {/* One-Time Payment */}
          <div className="mt-12 flex items-center justify-center">
            <div className="max-w-md overflow-hidden rounded-lg bg-white shadow-md">
              <div className="p-6">
                <h3 className="text-center text-2xl font-bold text-gray-900">
                  One-Time Payment
                </h3>
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
                  {session ? (
                    <button
                      className="inline-block rounded-md bg-[#6469ff] px-6 py-3 text-lg font-medium text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => router.push("/browse")}
                    >
                      Get it Now
                    </button>
                  ) : (
                    <button
                      className="inline-block rounded-md bg-[#6469ff] px-6 py-3 text-lg font-medium text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => router.push("/sign-in")}
                    >
                      Get it Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Landing;
