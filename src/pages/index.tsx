import { type NextPage } from "next";
import Head from "next/head";
import { HomeNav } from "~/components/HomeNav";

const Landing: NextPage = () => {
  return (
    <>
      <Head>
        <title>NoNameYet</title>
        <meta name="description" content="DESCRIPTION HERE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <HomeNav />

      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-12 lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            We invest in the world’s potential
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
          <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
            <button>Test</button>
            <button>Test2</button>
          </div>
        </div>
      </section>
      {/* Detal Section */}

      {/* Pricing Section */}
    </>
  );
};

export default Landing;
