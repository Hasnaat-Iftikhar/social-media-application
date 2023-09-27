import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = async () => {
  const user = async () => await currentUser();

  if (!user) {
    return new Response(
      "Please create an account in order to upload an image.",
      {
        status: 401,
      }
    );
  }

  return user;
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await auth();

      console.log("User while file uploading", user);

      return { user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("[UserID]", metadata.user);
      console.log("Image is now successfully uploaded on server.");
      console.log("[Image URL]", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
