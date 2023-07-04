import { api } from "~/utils/api";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import { Footer } from "~/components/Footer";
import InfiniteIllustrationList from "~/components/InfiniteIllustrationList";
import Head from "next/head";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Input } from "../../components/ui/input";
import { useBuySubscription } from "~/hooks/useBuySubscription";
import { useEffect, useState } from "react";
import Modal from "../../src/components/Modal";
import { UploadButton } from "@uploadthing/react";
import toast from "react-hot-toast";
import type { OurFileRouter } from "~/server/uploadthing";
import "@uploadthing/react/styles.css";

function BrowseNav() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [title, setTitle] = useState("");

  const { data: session, status } = useSession();

  const ctx = api.useContext();

  const { mutate: createIllustration, isLoading: creationLoading } =
    api.illustrations.create.useMutation({
      onSuccess: () => {
        setTitle("");
        void ctx.illustrations.infiniteFeed.invalidate();
        toast.success("Successfully Uploaded Illustration");
        setOpen(false);
      },
      onError: (error) => {
        const errorMessage = error.data?.zodError?.fieldErrors.content;

        if (errorMessage && errorMessage[0]) {
          toast.error(errorMessage[0]);
        } else {
          toast.error("Unable to Upload Illustration");
        }
      },
    });

  const { buySubscription } = useBuySubscription();

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
        <Link
          href="/browse"
          className="px-1 text-xl font-extrabold text-[#222328]"
        >
          / Browse
        </Link>
      </div>
      {session && (
        <button
          onClick={() => {
            buySubscription().catch(console.error);
          }}
          className="font-inter rounded-md px-4 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
        >
          Plan
        </button>
      )}
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
                  <a
                    href="https://billing.stripe.com/p/login/test_fZebJw7W95oRfCg3cc"
                    target="_blank"
                  >
                    Tier: {session.user.subscription}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1 border-gray-200" />
                {session.user.role === "ADMIN" && (
                  <DropdownMenuItem className="font-inter rounded-md px-3 py-2 text-center font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
                    <button className="" onClick={() => setOpen(true)}>
                      Upload
                    </button>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="my-1 border-gray-200" />
                <DropdownMenuItem className="font-inter rounded-md bg-[#6469ff] px-3 py-2 text-center font-semibold text-white transition-colors duration-200 hover:bg-indigo-500 focus:outline-none">
                  <button
                    className="focus:outline-none"
                    onClick={() => {
                      signOut({
                        callbackUrl: "/",
                      }).catch(console.log);
                    }}
                  >
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Modal open={open} onClose={() => setOpen(false)}>
              <div>
                {/* I am a bad frontend dev lol */}
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div>
                  <h1 className="text-center text-[40px] font-extrabold">
                    File Upload Guide
                  </h1>
                  <p className="text-center text-[20px]">
                    Make the file&apos;s name the title of the illustration
                  </p>
                  <p className="text-center text-[20px]">
                    The name of the file must be less than 23 characters
                  </p>
                  <p className="pb-3 text-center text-[20px]">
                    .SVG files only please
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="flex w-full max-w-sm items-center space-x-2 pr-4">
                      <Input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Illustration Title"
                        className="w-30 mx-auto mb-3 mt-1"
                        disabled={creationLoading}
                      />
                      <div className="pt-4">
                        <UploadButton<OurFileRouter>
                          endpoint="illustrationUpload"
                          onClientUploadComplete={(res) => {
                            console.log("Files: ", res?.[0]?.fileUrl);
                            if (res?.[0]?.fileUrl) {
                              // const filename = file.name.substring(0, file.name.lastIndexOf("."));
                              createIllustration({
                                src: res?.[0]?.fileUrl,
                                title: title,
                              });
                            } else {
                              toast.error("ERROR! No file uploaded");
                            }
                            // Do something with the response
                          }}
                          onUploadError={(error: Error) => {
                            // Do something with the error.
                            toast.error(`ERROR! ${error.message}`);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
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

const Browse: NextPage = () => {
  const illustrations = api.illustrations.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  // const { data: session } = useSession();
  const FADE_DOWN_ANIMATION_VARIANT = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <>
      <Head>
        <title>NoNameYet • Browse</title>
        <meta name="description" content="DESCRIPTION HERE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BrowseNav />
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
        <div className="mx-auto max-w-7xl px-7 py-6">
          <motion.h1
            variants={FADE_DOWN_ANIMATION_VARIANT}
            className="text-[40px] font-extrabold text-[#222328]"
          >
            Illustrations
          </motion.h1>
          <motion.p
            variants={FADE_DOWN_ANIMATION_VARIANT}
            className="mt-2 max-w-[500px] text-[20px] text-gray-500"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </motion.p>
        </div>
      </motion.div>
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-3 lg:max-w-7xl lg:px-7">
        <InfiniteIllustrationList
          illustrations={illustrations.data?.pages.flatMap(
            (page) => page.illustrations
          )}
          isError={illustrations.isError}
          isLoading={illustrations.isLoading}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          hasMore={illustrations.hasNextPage!}
          fetchNewIllustrations={illustrations.fetchNextPage}
        />
      </div>
      <div className="flex justify-center py-2">
        <p className="mt-2 max-w-[500px] text-[20px] text-gray-500">
          Nothing else to see here! Back to{" "}
          <button
            className="font-semibold"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            top
          </button>
          .
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Browse;
