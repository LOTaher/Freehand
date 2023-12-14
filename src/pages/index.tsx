import { type NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Footer } from "~/components/Footer";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Card } from "components/ui/card";
import { Logo } from "~/components/Logo";
import HomeNav from "~/components/HomeNav";

// #269e91
// #25998d hover

const testimonials = [
  {
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis iure reiciendis aut cum nobis molestias cumque, fuga nesciunt",
    url: "https://twitter.com/splattedev",
    date: "9:15 PM · Jul 5, 2023",
    author: {
      name: "Laith Taher",
      image:
        "https://pbs.twimg.com/profile_images/1608530508128059394/ENgqYiIu_400x400.jpg",
      handle: "@SplatteDev",
    },
  },
  {
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis iure reiciendis aut cum nobis molestias cumque, fuga nesciunt",
    url: "https://twitter.com/splattedev",
    date: "9:15 PM · Jul 5, 2023",
    author: {
      name: "Laith Taher",
      image:
        "https://pbs.twimg.com/profile_images/1608530508128059394/ENgqYiIu_400x400.jpg",
      handle: "@SplatteDev",
    },
  },
  {
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis iure reiciendis aut cum nobis molestias cumque, fuga nesciunt",
    url: "https://twitter.com/splattedev",
    date: "9:15 PM · Jul 5, 2023",
    author: {
      name: "Laith Taher",
      image:
        "https://pbs.twimg.com/profile_images/1608530508128059394/ENgqYiIu_400x400.jpg",
      handle: "@SplatteDev",
    },
  },
];

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
        <title>Freehand</title>
        <meta
          name="description"
          content="🖋️ Open Source Illustrations designed to elevate your next project."
        />
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
              Explore a curated collection of exquisite and instantly usable
              handmade illustrations, designed to elevate your next project.
            </motion.p>
            <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
              {session ? (
                <motion.button
                  onClick={() => router.push("/browse")}
                  variants={FADE_DOWN_ANIMATION_VARIANT}
                  className="font-inter ml-4 rounded-md bg-[#3299AF] px-4 py-2 font-medium text-white hover:bg-[#2f8ca1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get Started
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => router.push("/sign-in")}
                  variants={FADE_DOWN_ANIMATION_VARIANT}
                  className="font-inter ml-4 rounded-md bg-[#3299AF] px-4 py-2 font-medium text-white hover:bg-[#2f8ca1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

      {/* About */}
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
                About
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

      {/* License */}
      <div className="max-w-screen mx-auto flex content-center justify-center bg-white text-center dark:bg-gray-900 lg:px-12">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 sm:gap-y-2 lg:mx-0">
          <div className="flex flex-col content-start items-center justify-center px-4">
            <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
              License
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
              src="https://uploadthing.com/f/2b492cf3-1abe-4f12-8ddf-e931b72fd95f_undraw_in_love_q0bn.svg"
              alt="Placeholder"
              className="pointer-events-none mt-2 aspect-square"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="mb-6 mt-10 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Join Our Community
            </h2>
            <p className="mt-4 text-lg font-normal text-gray-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
              iure reiciendis aut cum nobis molestias cumque, fuga nesciunt
              laudantium sed incidunt, sint asperiores odit ratione porro
              veritatis quia quas saepe?
            </p>
          </div>
        </div>
        <div className="mx-auto flex content-center justify-center pt-6">
          <div className="grid justify-center gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {testimonials.map((testimonial) => (
              <a
                href={testimonial.url}
                key={testimonial.author.name}
                target="_blank"
                className="text-gray-900"
              >
                <Card className="flex h-[210px] w-[310px] flex-col rounded-lg border border-gray-200 p-4">
                  <div className="mb-3 flex items-center">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={testimonial.author.image}
                      alt={testimonial.author.name}
                      width={40}
                      height={40}
                    />
                    <div className="ml-3">
                      <div className="font-bold">{testimonial.author.name}</div>
                      <div>{testimonial.author.handle}</div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-md text-gray-700">
                          {testimonial.content}
                        </p>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <p className="text-xs text-gray-500">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Landing;
