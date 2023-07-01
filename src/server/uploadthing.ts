/* eslint-disable @typescript-eslint/require-await */
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { prisma } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import type { NextApiRequest } from "next";
import type { IncomingMessage, ServerResponse } from "http";

const f = createUploadthing();

// Custom type for the extended req object
type CustomReq = NextApiRequest & {
  cookies: Partial<{ [key: string]: string }>;
};

// Custom type for the extended res object
type CustomRes = ServerResponse<IncomingMessage>;

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  illustrationUpload: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async (req: CustomReq, res: CustomRes) => {
      // This code runs on your server before upload
      const session = await getServerAuthSession({ req, res });
      if (!session || session.user.role !== "ADMIN") {
        throw new Error("Upload access denied");
      }

      return { userId: session.user.id };
    })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete");

      if (file.name.length > 23) {
        throw new Error("File name is too long");
      }

      // const filename = file.name.substring(0, file.name.lastIndexOf("."));
      // await prisma.illustration.create({
      //   data: {
      //     title: filename.replace(/_/g, " "),
      //     src: file.url,
      //   },
      // });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
