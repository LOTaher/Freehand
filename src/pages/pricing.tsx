import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Head from "next/head";
import { CheckmarkIcon } from "~/components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useBuySubscription } from "~/hooks/useBuySubscription";
import { Footer } from "~/components/Footer";

function PricingNav() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className={headerClass}>
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
        <Link
          href="/sign-in"
          className="px-1 text-xl font-extrabold text-[#222328]"
        >
          / Pricing
        </Link>
      </div>
      <div className="mt-4 flex items-center sm:mt-0">
        <Link
          href="/browse"
          className="font-inter rounded-md px-4 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
        >
          Browse
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
    </div>
  );
}

const Pricing: NextPage = () => {
  const { buySubscription } = useBuySubscription();

  const { data: session } = useSession();

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
            <h2 className="text-4xl font-extrabold text-gray-900">
              Unlock Full Access
            </h2>
            <p className="mt-4 text-lg font-normal text-gray-600">
              Support us and get complete access to our collection.
            </p>
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
                      className="font-inter ml-4 inline-block rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => {
                        buySubscription().catch(console.error);
                      }}
                    >
                      Checkout with Stripe
                    </button>
                  )}
                  {session && session.user.subscription === "PRO" && (
                    <button
                      className="font-inter ml-4 inline-block rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:cursor-not-allowed hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={true}
                    >
                      Purchased
                    </button>
                  )}
                  {!session && (
                    <Link
                      className="font-inter ml-4 inline-block rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
