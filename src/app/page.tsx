import { fetchMetadata } from "frames.js/next";
import UrlInput from "./components/UrlInput";

export async function generateMetadata() {
  return {
    title: "mint drops",
    // provide a full URL to your /frames endpoint
    other: await fetchMetadata(
      new URL(
        "/frames",
        process.env.NEXT_PUBLIC_NETLIFY_URL
          ? `https://${process.env.NEXT_PUBLIC_NETLIFY_URL}`
          : "http://localhost:3000"
      )
    ),
  };
}

export default function Page() {
  return (
    <div className="p-2 xl:mt-10 w-full">
      <div className="text-center">
        <h1 className="font-bold my-2 text-xl">Mint Frames</h1>
        <p className="text-sm text-gray-300">
          Mint directly from your farcaster feed with a mint frame. Currently
          works with Zora contracts.
        </p>
      </div>
      <div className="w-full my-4 xl:my-8">
        <UrlInput />
      </div>
    </div>
  );
}
