import { useState } from "react";
import { Modal } from "./Modal";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

type IllustrationItemProps = {
  title: string;
  src: string;
  link: string;
};

export function Illustration({ title, src, link }: IllustrationItemProps) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <div>
        <a onClick={() => setOpen(true)}>
          <div className="w-full cursor-pointer rounded-md border border-[#e6ebf4] p-3">
            <div className="relative aspect-[1/1] w-full rounded-lg hover:opacity-90">
              <Image
                alt={title}
                fill
                src={src}
                className="pointer-events-none aspect-[1/1] w-full cursor-pointer"
              />
            </div>

            <div className="mt-4 inline-flex items-baseline gap-2">
              <h2 className="cursor-pointer text-base font-semibold leading-snug text-gray-700 sm:text-3xl md:text-2xl lg:text-xl">
                {title}
              </h2>
            </div>
          </div>
        </a>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center p-2 sm:p-4">
          <Image
            src={src}
            width={540}
            height={540}
            alt={title}
            className="pointer-events-none mb-2 h-64 w-full rounded-md object-cover sm:mb-4 sm:h-96"
          />
          <h2 className="mb-1 py-1 text-2xl font-bold">{title}</h2>
          {session ? (
            <>
              <a
                href={link}
                download
                className="font-inter rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
}
