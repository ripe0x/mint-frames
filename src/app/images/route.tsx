import { createImagesWorker } from "frames.js/middleware/images-worker/next";

const imagesRoute = createImagesWorker({
  secret: "SOME_SECRET_VALUE",
  // imageOptions: {},
});

export const GET = imagesRoute();
