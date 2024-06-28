import UrlInput from "./components/UrlInput";
import { headers } from "next/headers";
export async function generateMetadata() {
  return {
    title: "Mint Frames | drops.wtf",
    description: "Mint directly from your Farcaster feed with a mint frame.",
  };
}
export default function Page() {
  const headersList = headers();

  const origin = headersList.get("host");
  return (
    <div className="p-2 xl:mt-10 w-full">
      <div className="text-center">
        <h1 className="font-bold my-2 text-xl">Mint Frames</h1>
        <p className="text-sm text-gray-300">
          Mint directly from your Farcaster feed with a mint frame.
        </p>
      </div>
      <div className="w-full my-4 xl:my-8">
        <UrlInput baseUrl={origin} />
      </div>
    </div>
  );
}
