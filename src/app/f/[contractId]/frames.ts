import { farcasterHubContext } from "frames.js/middleware";
// import { imagesWorkerMiddleware } from "frames.js/middleware/images-worker";
import { createFrames } from "frames.js/next";

export const frames = createFrames({
  basePath: "/f",
  imagesRoute: null,
  middleware: [
    farcasterHubContext(),
    // imagesWorkerMiddleware({
    //   imagesRoute: "/images",
    //   secret: "SOME_SECRET_VALUE", // Optional
    // }),
  ],
});
