import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-gray flex w-full flex-wrap items-center justify-between border-b border-b-[#e6ebf4] px-4 py-4 sm:px-8">
      <div className="flex items-center">
        <Link href="/">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src="https://cdn.discordapp.com/attachments/881202202000578580/881202233190492180/Logo.png"
            alt="logo"
            className="h-10 w-10"
          />
        </Link>
      </div>
      <div className="mt-4 flex items-center sm:mt-0">
        <Link
          href="/about"
          className="font-inter rounded-md px-4 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
        >
          About
        </Link>
        <Link
          href="/search"
          className="font-inter rounded-md px-4 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
        >
          Search
        </Link>
        <Link
          href="/support"
          className="font-inter rounded-md px-4 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
        >
          Plan
        </Link>
        <Link
          href="/home"
          className="font-inter rounded-md px-4 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-900"
        >
          Browse
        </Link>
        {session ? (
          <>
            <button
              className="font-inter ml-4 rounded-md bg-[#6469ff] px-4 py-2 font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                signOut().catch(console.log);
              }}
            >
              Sign Out
            </button>
          </>
        ) : (
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
  );
}
