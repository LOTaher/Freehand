import { type NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GithubIcon, GoogleIcon } from "~/components/Icons";
import Link from "next/link";
import SignInNav from "~/components/SignInNav";

const SignIn: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    void router.push("/browse");
  }

  return (
    <>
      <Head>
        <title>Freehand • Sign-In</title>
        <meta
          name="description"
          content="🖋️ Open Source Illustrations designed to elevate your next project."
        />
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
        <p className="mt-2 text-lg text-gray-500">To continue to Freehand</p>
        {session && <div></div>}
        {!session && (
          <div className="flex flex-col">
            <button
              onClick={() => {
                signIn("github", { callbackUrl: "/browse" }).catch(console.log);
              }}
              className="mt-4 flex items-center rounded-md bg-[#171515] px-4 py-2 text-lg font-medium text-white hover:bg-[#211e1e]"
            >
              <div className="pr-2">
                <GithubIcon />
              </div>
              <span>Continue with Github</span>
            </button>
            <button
              onClick={() => {
                signIn("google", { callbackUrl: "/browse" }).catch(console.log);
              }}
              className="mt-4 flex items-center rounded-md bg-[#bf4337] px-4 py-2 text-lg font-medium text-white hover:bg-[#d14c3b]"
            >
              <div className="pr-2">
                <GoogleIcon />
              </div>
              <span>Continue with Google</span>
            </button>
          </div>
        )}
        <p className="mt-2 pt-2 text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <Link className="text-blue-500" href="/terms-of-service">
            Terms of Service.
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignIn;
