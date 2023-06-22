import { type NextPage } from "next";
import { SignInNav } from "~/components/SignInNav";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
          <button
            onClick={() => {
              signIn("github", { callbackUrl: "/browse" }).catch(console.log);
            }}
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-lg font-medium text-white hover:bg-blue-600"
          >
            Continue with Github
          </button>
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
