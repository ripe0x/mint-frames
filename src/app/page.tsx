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
    <div>
      <UrlInput />
    </div>
  );
}
