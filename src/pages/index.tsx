import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const Landing: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>NoNameYet</title>
        <meta name="description" content="DESCRIPTION HERE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="mx-auto flex max-w-7xl justify-between py-5 sm:px-8">
        <div className="flex items-center">
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
                    <Link href="/plan">Tier: {session.user.subscription}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 border-gray-200" />
                  <DropdownMenuSeparator className="my-1 border-gray-200" />
                  <DropdownMenuItem className="font-inter rounded-md bg-[#6469ff] px-3 py-2 text-center font-semibold text-white transition-colors duration-200 hover:bg-indigo-500 focus:outline-none">
                    <button
                      className="focus:outline-none"
                      onClick={() => {
                        signOut().catch(console.log);
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
              <button
                className="font-inter ml-4 rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  signIn("github").catch(console.log);
                }}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            We invest in the world’s potential
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
          <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
            <button>Test</button>
            <button>Test2</button>
          </div>
        </div>
      </section>
      {/* Detal Section */}

      {/* Pricing Section */}
    </>
  );
};

export default Landing;
