import { useState, type FC } from "react";
import Modal from "./Modal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { Badge } from "components/ui/badge";

type IllustrationItemProps = {
  id: string;
  title: string;
  src: string;
};

const Illustration: FC<IllustrationItemProps> = ({
  id,
  title,
  src,
}: IllustrationItemProps) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const ctx = api.useContext();
  const { mutate: deleteMutation } = api.illustrations.delete.useMutation({
    onSuccess: () => {
      void ctx.illustrations.infiniteFeed.invalidate();
      toast.success("Successfully Deleted Illustration");
    },
    onError: (error) => {
      const errorMessage = error.data?.zodError?.fieldErrors.content;

      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Unable to Delete Illustration");
      }
    },
  });
  const { mutate: decrementMutation, isLoading: isDecrementing } =
    api.illustrations.decrement.useMutation({
      onSuccess: () => {
        void ctx.user.getDownloads.invalidate();
      },
      onError: (error) => {
        const errorMessage = error.data?.zodError?.fieldErrors.content;

        if (errorMessage && errorMessage[0]) {
          toast.error(errorMessage[0]);
        } else {
          toast.error("Unable to Decrement Downloads");
        }
      },
    });

  const router = useRouter();

  const { data: user } = api.user.getDownloads.useQuery({
    id: session?.user.id || "",
  });

  function download(src: string, title: string) {
    // Using the Fetch API to get the SVG file
    void fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        // Creating a temporary URL for the SVG file blob
        const url = URL.createObjectURL(blob);

        // Creating a link element
        const link = document.createElement("a");
        link.href = url;
        link.download = title;

        // Appending the link to the document body and triggering the download
        document.body.appendChild(link);
        link.click();

        // Cleanup: removing the link and revoking the temporary URL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
  }

  function handleDownload() {
    if (session?.user.subscription === "PRO") {
      download(src, title);
      setOpen(false);
    }

    if (session?.user.subscription === "FREE" && session?.user.downloads > 0) {
      decrementMutation({ id: session?.user.id });
      download(src, title);
      setOpen(false);
    }

    if (session?.user.subscription === "FREE" && session?.user.downloads <= 0) {
      toast.error("No Free Downloads Remaining");
    }
  }

  function deleteIllustration(id: string) {
    deleteMutation({ id: id });
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <>
      <div className="">
        <a onClick={() => setOpen(true)}>
          <div className="w-full cursor-pointer rounded-md border border-[#e6ebf4] p-3">
            <div className="aspect-[1/1] w-full rounded-lg hover:opacity-90 sm:px-2">
              <Image
                alt={title}
                width={100}
                height={100}
                src={src}
                className="pointer-events-none aspect-[1/1] w-full cursor-pointer"
              />
            </div>

            <div className="inline-flex items-baseline gap-2">
              <h2 className="cursor-pointer text-base font-semibold text-gray-700 sm:text-3xl md:text-xl lg:text-xl">
                {title}
              </h2>
            </div>
          </div>
        </a>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center p-2">
          {session && user ? (
            <>
              {session.user.subscription === "FREE" && user.downloads > 0 && (
                <Badge className="mb-2 rounded-md bg-[#6469ff] px-1 text-sm text-white">
                  Free Downloads Remaining: {user.downloads}
                </Badge>
              )}
              {session.user.subscription === "FREE" && user.downloads <= 0 && (
                <Badge className="mb-2 rounded-md bg-[#6469ff] px-1 text-sm text-white">
                  No Free Downloads Remaining
                </Badge>
              )}
            </>
          ) : (
            <div></div>
          )}
          <Image
            src={src}
            width={100}
            height={100}
            alt={title}
            className="pointer-events-none mb-1 mt-1 aspect-square h-96 w-[80%] rounded-md"
          />
          <h2 className="mb-1 py-1 text-2xl font-bold">{title}</h2>
          <div className="flex space-x-2">
            {session && user ? (
              <>
                {(session?.user.subscription === "PRO" ||
                  (session.user.subscription === "FREE" &&
                    user.downloads > 0)) && (
                  <button
                    className="font-inter py-23 rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleDownload()}
                    disabled={isDecrementing}
                  >
                    Download SVG
                  </button>
                )}
                {session?.user.subscription === "FREE" &&
                  user.downloads <= 0 && (
                    <button
                      className="font-inter py-23 rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => router.push("/pricing")}
                    >
                      Buy Full Access
                    </button>
                  )}
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/sign-in")}
                  className="font-inter py-23 rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign In
                </button>
              </>
            )}
            {session?.user.role === "ADMIN" ? (
              <>
                <button
                  className="font-inter rounded-md bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  onClick={() => deleteIllustration(id)}
                >
                  Delete
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Illustration;
