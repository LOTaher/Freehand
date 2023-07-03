import { type NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GithubIcon, GoogleIcon } from "~/components/Icons";
import Link from "next/link";
import Image from "next/image";

function SignInNav() {
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

const SignIn: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    void router.push("/browse");
  }

  return (
    <>
      <Head>
        <title>NoNameYet • Sign-In</title>
        <meta name="description" content="DESCRIPTION HERE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <SignInNav />

      {/* Sign in section */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="mx-auto mt-8 w-full rounded-md px-6 py-8 shadow-lg sm:max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-800">Sign-In</h1>
        <p className="mt-2 text-lg text-gray-500">To continue to NoNameYet</p>
        {session && <div></div>}
        {!session && (
          <div>
            <button
              onClick={() => {
                signIn("github", { callbackUrl: "/browse" }).catch(console.log);
              }}
              className="mt-4 inline-flex rounded-md bg-[#171515] px-4 py-2 text-lg font-medium text-white hover:bg-[#211e1e]"
            >
              <div className="pr-2 pt-1">
                <GithubIcon />
              </div>{" "}
              Continue with Github
            </button>
            <button>
              <div
                className="mt-4 inline-flex rounded-md bg-[#bf4337] px-4 py-2 text-lg font-medium text-white hover:bg-[#d14c3b]"
                onClick={() => {
                  signIn("google", { callbackUrl: "/browse" }).catch(
                    console.log
                  );
                }}
              >
                <div className="pr-2 pt-1">
                  <GoogleIcon />
                </div>{" "}
                Continue with Google
              </div>
            </button>
          </div>
        )}
        <p className="mt-2 pt-2 text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <a className="text-blue-500" href="/tos">
            Terms of Service.
          </a>
        </p>
      </div>
    </>
  );
};

export default SignIn;
