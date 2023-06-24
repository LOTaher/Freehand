import { useState, type FC } from "react";
import Modal from "./Modal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { api } from "~/utils/api";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { Badge } from "components/ui/badge";

type IllustrationItemProps = {
  id: string;
  title: string;
  src: string;
  link: string;
};

const Illustration: FC<IllustrationItemProps> = ({
  id,
  title,
  src,
  link,
}: IllustrationItemProps) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { mutate: deleteMutation } = api.illustrations.delete.useMutation();
  const { mutate: decrementMutation } =
    api.illustrations.decrement.useMutation();
  const router = useRouter();

  function handleDownload() {
    if (session?.user.subscription === "PRO") {
      setOpen(false);
      location.reload();
      // window.open(link, "_blank");
    }

    if (session?.user.subscription === "FREE" && session?.user.downloads > 0) {
      decrementMutation({ id: session?.user.id });
      setOpen(false);
      location.reload();
      // window.open(link, "_blank");
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
    toast.success("Successfully Deleted Illustration");
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
        <Toaster />
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center p-2">
          {session?.user.subscription === "FREE" &&
            session?.user.downloads > 0 && (
              <Badge className="mb-2 rounded-md bg-[#6469ff] px-1 text-sm text-white">
                {session?.user.downloads} Free Downloads Remaining
              </Badge>
            )}
          {session?.user.subscription === "FREE" &&
            session?.user.downloads <= 0 && (
              <Badge className="mb-2 rounded-md bg-[#6469ff] px-1 text-sm text-white">
                No Free Downloads Remaining
              </Badge>
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
            {session ? (
              <>
                {(session?.user.subscription === "PRO" ||
                  (session.user.subscription === "FREE" &&
                    session.user.downloads > 0)) && (
                  <button
                    className="font-inter py-23 rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleDownload()}
                  >
                    Download SVG
                  </button>
                )}
                {session?.user.subscription === "FREE" &&
                  session?.user.downloads <= 0 && (
                    <button
                      className="font-inter py-23 rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => router.push("/pricing")}
                    >
                      Upgrade to PRO
                    </button>
                  )}
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/sign-in")}
                  className="font-inter rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
