import { fetchMetadata } from "frames.js/next";

export async function generateMetadata() {
  return {
    title: "My Page",
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
      <p>mint zora nfts in fc frames.</p>
      <p>not publicly released yet so things may break.</p>
    </div>
  );
}
