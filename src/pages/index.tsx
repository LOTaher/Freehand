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
import { useEffect, useState } from "react";
import { Card } from "components/ui/card";

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

function HomeNav() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = `mx-auto flex max-w-7xl justify-between px-4 sm:px-8 py-4 ${
    isScrolled ? "bg-white bg-opacity-70" : ""
  } ${isScrolled ? "sticky top-0 z-50" : ""}`;

  return (
    <header className={headerClass}>
      <div className="flex items-center py-2">
        <Link href="/">
          <Image
            src="https://cdn.discordapp.com/attachments/881202202000578580/881202233190492180/Logo.png"
            alt="logo"
            className=""
            height={40}
            width={40}
          />
        </Link>
      </div>
      <div className="mt-4 flex items-center sm:mt-0">
        <Link
          href="/browse"
          className="font-inter rounded-md px-4 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
        >
          Browse
        </Link>
        <Link
          href="/pricing"
          className="font-inter rounded-md px-4 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
        >
          Pricing
        </Link>
        {status === "loading" && (
          <div>
            <svg
              aria-hidden="true"
              className="mr-2 h-8 w-8 animate-spin fill-[#6469ff] text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
        {status === "authenticated" && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="border-transparent focus:outline-none">
                <div className="px-4 focus:outline-none">
                  <Image
                    src={session.user.image as string}
                    width={40}
                    height={40}
                    alt="Profile Picture"
                    className="transform rounded-full transition-transform duration-200 hover:scale-105"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mx-auto my-1 rounded-md border bg-white px-2 py-1">
                <DropdownMenuItem className="font-inter rounded-md px-3 py-2 text-center font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
                  <Link href="/pricing">Tier: {session.user.subscription}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1 border-gray-200" />
                <DropdownMenuSeparator className="my-1 border-gray-200" />
                <DropdownMenuItem className="font-inter rounded-md bg-[#6469ff] px-3 py-2 text-center font-semibold text-white transition-colors duration-200 hover:bg-indigo-500 focus:outline-none">
                  <button
                    className="focus:outline-none"
                    onClick={() => {
                      signOut({ callbackUrl: "/" }).catch(console.log);
                    }}
                  >
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link
              className="font-inter ml-4 rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              href="/sign-in"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

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

      {/* Pricing */}
      <div className="max-w-screen mx-auto flex content-center justify-center bg-white text-center dark:bg-gray-900 lg:px-12">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 sm:gap-y-2 lg:mx-0">
          <div className="flex items-center justify-center">
            <Image
              src="https://uploadthing.com/f/2b492cf3-1abe-4f12-8ddf-e931b72fd95f_undraw_in_love_q0bn.svg"
              alt="Placeholder"
              className="pointer-events-none mt-2 aspect-square"
              width={400}
              height={400}
            />
          </div>
          <div className="flex flex-col content-start items-center justify-center px-4">
            <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
              Pricing
            </h1>
            <p className="mx-2 mb-2 mt-3 text-lg font-normal text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam a
              nunc eget odio ultricies aliquet. Nulla facilisi. Donec
              vestibulum, nunc eget aliquam ultricies, nunc velit ultrices
              augue, eget aliquam nisl nunc eget odio. Nulla facilisi. Donec
              vestibulum, nunc eget aliquam ultricies, nunc velit ultrices
            </p>
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
