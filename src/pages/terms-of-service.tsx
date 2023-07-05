import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Footer } from "~/components/Footer";
import { useState, useEffect } from "react";

function TOSNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = `mx-auto flex max-w-7xl justify-between px-4 sm:px-8 py-4 ${
    isScrolled ? "bg-white bg-opacity-70" : ""
  } ${isScrolled ? "sticky top-0 z-50" : ""}`;

  return (
    <div className={headerClass}>
      <div className="flex items-center py-2">
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
          href="/terms-of-service"
          className="px-1 text-xl font-extrabold text-[#222328]"
        >
          / Terms of Service
        </Link>
      </div>
    </div>
  );
}

const TOS: NextPage = () => {
  return (
    <>
      <Head>
        <title>NoNameYet • Terms of Service</title>
        <meta name="description" content="DESCRIPTION HERE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navbar */}
      <TOSNav />

      {/* Terms of Service section */}
      <div className="mx-auto mt-8 max-w-3xl px-6 py-8">
        <h1 className="mb-8 text-4xl font-extrabold text-gray-800">
          Terms of Service
        </h1>

        <p>
          This Terms of Service Agreement (&quot;Agreement&quot;) is entered
          into between [Your Company Name] (&quot;Company&quot;), a company
          incorporated under the laws of [Your Jurisdiction], and the user
          (&quot;User&quot;) who intends to use the services offered by the
          Company. By accessing or using the services offered by the Company,
          User acknowledges that they have read, understood, and agree to be
          bound by the terms and conditions of this Agreement. If User does not
          agree to these terms, User may not use the services offered by the
          Company.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Definitions</h2>
        <ul className="ml-6 mt-4 list-disc">
          <li>
            <span className="font-medium">1.1. &quot;Services&quot;</span>{" "}
            refers to the web platform provided by the Company, which allows web
            developers to download illustrations created by [Your Name/Company]
            (&quot;Illustrator&quot;).
          </li>
          <li>
            <span className="font-medium">1.2. &quot;User&quot;</span> refers to
            individuals or entities accessing and using the Services provided by
            the Company.
          </li>
          <li>
            <span className="font-medium">1.3. &quot;Illustrations&quot;</span>{" "}
            refers to the digital artwork created by the Illustrator and made
            available for download on the Services.
          </li>
        </ul>

        <h2 className="mt-8 text-2xl font-semibold">Use of Services</h2>
        <p>
          2.1. User agrees to use the Services solely for lawful purposes and in
          compliance with all applicable laws and regulations.
        </p>
        <p>
          2.2. User acknowledges that the Illustrations made available on the
          Services are the intellectual property of the Illustrator. User may
          download and use the Illustrations in their web development projects,
          both personal and commercial, subject to the terms and conditions of
          this Agreement.
        </p>
        <p>
          2.3. User agrees not to take credit for the Illustrations or modify
          them significantly and claim them as their own. User shall not remove
          any copyright notices or watermarks present in the Illustrations.
        </p>
        <p>
          2.4. User agrees not to replicate the Services or redistribute the
          Illustrations in packs or otherwise. User shall not create
          integrations or derivative works using the Illustrations without
          obtaining explicit written permission from the Illustrator.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">
          Ownership and Intellectual Property
        </h2>
        <p>
          3.1. All Illustrations made available on the Services are the
          intellectual property of the Illustrator and are protected by
          copyright laws and other intellectual property rights.
        </p>
        <p>
          3.2. User acknowledges and agrees that the Company does not claim any
          ownership rights over the Illustrations. The Company acts solely as a
          platform to facilitate the distribution and download of the
          Illustrations.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Pricing and Access</h2>
        <p>
          4.1. The Company offers full access to the Services through a paid
          subscription priced at [Price]. Upon purchasing the subscription, User
          will have unlimited access to download and use the Illustrations
          without any restrictions.
        </p>
        <p>
          4.2. Users who have not purchased the full access subscription are
          limited to 5 free downloads before they will no longer be able to
          download additional files. The limitations on free downloads may be
          subject to change at the discretion of the Company.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Disclaimer of Warranty</h2>
        <p>
          5.1. The Services provided by the Company and the Illustrations made
          available on the Services are provided on an &quot;as is&quot; basis
          without warranties of any kind, whether express or implied.
        </p>
        <p>
          5.2. The Company does not warrant that the Services will be
          uninterrupted, error-free, or free from viruses or other harmful
          components. User acknowledges that the use of the Services and the
          downloading of Illustrations is done at their own risk.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Limitation of Liability</h2>
        <p>
          6.1. To the maximum extent permitted by applicable law, the Company
          shall not be liable for any direct, indirect, incidental,
          consequential, or exemplary damages, including but not limited to,
          damages for loss of profits, goodwill, data, or other intangible
          losses arising out of or in connection with the use or inability to
          use the Services or the Illustrations.
        </p>

        <h2 className="mt-8 text-2xl font-semibold">Termination</h2>
        <p>
          7.1. The Company reserves the right to terminate or suspend
          User&apos;s access to the Services at any time and for any reason
          without prior notice.
        </p>
      </div>

      <Footer />
    </>
  );
};

export default TOS;
