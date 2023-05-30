// import { prisma } from "../server/db";
import { Illustration } from "../components/Illustration";
import { Navbar } from "../components/Navbar";

export default function Main() {
  // const illustrations = await prisma.illustrations.findMany();

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-7 py-6">
        <h1 className="text-[40px] font-extrabold text-[#222328]">
          Art Showcase
        </h1>
        <p className="mt-2 max-w-[500px] text-[20px] text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-3 lg:max-w-7xl lg:px-7">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {/*
          {illustrations.map((illustration, index) => (
            <Illustration key={index} {...illustration} />
          ))}
          */}
        </div>
      </div>
      <div className="flex justify-center py-2">
        <p className="mt-2 max-w-[500px] text-[20px] text-gray-500">
          Nothing else to see here! Back to{" "}
          <a className="font-semibold" href="#">
            top
          </a>
          .
        </p>
      </div>
    </>
  );
}
