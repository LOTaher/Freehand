import { useState, type FC } from "react";
import Modal from "./Modal";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";

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

  /*
  const FADE_UP_ANIMATION_VARIANT = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  const { ref: ref, inView: inView } = useInView({
    triggerOnce: true,
  });
  */

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

            <div className="mt-4 inline-flex items-baseline gap-2">
              <h2 className="cursor-pointer text-base font-semibold text-gray-700 sm:text-3xl md:text-xl lg:text-xl">
                {title}
              </h2>
            </div>
          </div>
        </a>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center p-2">
          <Image
            src={src}
            width={100}
            height={100}
            alt={title}
            className="pointer-events-none mb-2 aspect-square h-96 w-[80%] rounded-md"
          />
          <h2 className="mb-1 py-1 text-2xl font-bold">{title}</h2>
          {session ? (
            <>
              <a
                className="font-inter rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                download
                href={link}
              >
                Download SVG
              </a>
            </>
          ) : (
            <>
              <button
                onClick={() => signIn("github").catch(console.log)}
                className="font-inter rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Illustration;
