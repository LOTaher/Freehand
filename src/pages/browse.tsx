// import { prisma } from "../server/db";
import { api } from "~/utils/api";
import { BrowseNav } from "../components/BrowseNav";
import Illustration from "~/components/Illustration";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import { Footer } from "~/components/Footer";
import InfiniteIllustrationList from "~/components/InfiniteIllustrationList";
// import { getSession } from "next-auth/react";
// import { useSession } from "next-auth/react";

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
