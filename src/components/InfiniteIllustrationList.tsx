import { type FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Illustration from "./Illustration";
import { LoadingSpinner } from "./LoadingSpinner";

type Illustration = {
  id: string;
  title: string;
  src: string;
  link: string;
};

interface InfiniteIllustrationListProps {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNewIllustrations: () => Promise<unknown>;
  illustrations?: Illustration[];
}

const InfiniteIllustrationList: FC<InfiniteIllustrationListProps> = ({
  illustrations,
  isError,
  isLoading,
  fetchNewIllustrations,
  hasMore,
}) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return (
      <h1 className="text-center text-xl font-semibold">
        There has been an error fetching illustrations. Please reload the page.
      </h1>
    );
  }
  if (illustrations == null || illustrations.length === 0) {
    return <h1>No Illustrations</h1>;
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={illustrations.length}
        next={fetchNewIllustrations}
        hasMore={hasMore}
        loader={""}
      >
        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {illustrations?.map((illustration) => (
            <Illustration key={illustration.id} {...illustration} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteIllustrationList;
