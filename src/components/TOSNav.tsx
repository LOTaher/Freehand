import { Logo } from "./Logo";
import Link from "next/link";

export default function TOSNav() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-50 w-full backdrop-blur">
      <nav className="mx-auto flex max-w-7xl justify-between px-4 py-4 sm:px-8">
        <div className="flex items-center py-2">
          <Link href="/">
            <Logo />
          </Link>
          <Link
            href="/terms-of-service"
            className="px-1 text-2xl font-extrabold text-[#222328]"
          >
            / Terms of Service
          </Link>
        </div>
      </nav>
    </header>
  );
}
