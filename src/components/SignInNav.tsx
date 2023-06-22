import Link from "next/link";
import Image from "next/image";

export function SignInNav() {
  return (
    <div className="mx-auto flex max-w-7xl justify-between py-6 sm:px-8">
      <div className="flex items-center px-4 py-2">
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
          / Sign-In
        </Link>
      </div>
    </div>
  );
}
