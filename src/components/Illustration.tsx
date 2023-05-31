import { useState } from "react";
import { Modal } from "./Modal";
import { signIn, useSession } from "next-auth/react";
// import Image from "next/image";

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
      <div className="rounded-md border border-[#e6ebf4] p-3">
        <a onClick={() => setOpen(true)}>
          <div className="aspect-w-1 aspect-h-1 xl:aspect-w-1 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img
              alt={title}
              src={src}
              className="cursor-pointer group-hover:opacity-75"
            />
          </div>
        </a>
        <div className="mt-4 inline-flex items-baseline gap-2">
          <h2 className="cursor-pointer text-base font-semibold leading-snug text-gray-700 sm:text-3xl md:text-2xl lg:text-xl">
            {title}
          </h2>
          {/*}
          <Link
            href={downloadLink}
            className="font-inter text-base sm:text-2xl md:text-xl lg:text-lg font-medium bg-[#6469ff] text-white px-2 py-1 rounded-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            SVG
          </Link>
          */}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col items-center p-2 sm:p-4">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={src}
            alt={title}
            className="mb-2 h-64 w-full rounded-md object-cover sm:mb-4 sm:h-96"
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
