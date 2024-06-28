import MintZora1155 from "@/app/components/onPage/MintZora1155";
import Zora1155TokenDetails from "@/app/components/onPage/Zora1155TokenDetails";
import { fetchMetadata } from "frames.js/next";

type Props = {
  params: { chain: string; contractAddress: string; tokenId: string };
};

export async function generateMetadata({ params }: Props) {
  return {
    title: "My page",
    other: {
      // ...
      ...(await fetchMetadata(
        // provide full URL to your /frames endpoint
        new URL(
          `/f/${params.chain}/${params.contractAddress}/${params.tokenId}`,
          process.env.VERCEL_URL
            ? `https://${process.env.NEXT_PUBLIC_NETLIFY_URL}`
            : "http://localhost:3000"
        )
      )),
    },
  };
}

export default function Page({ params }: Props) {
  return (
    <span>
      <Zora1155TokenDetails
        contractAddress={params.contractAddress as `0x${string}`}
        tokenId={+params.tokenId}
        chain={params.chain}
      />
      <MintZora1155
        contractAddress={params.contractAddress as `0x${string}`}
        tokenId={+params.tokenId}
        chain={params.chain}
        mintQuantity={1}
      />
    </span>
  );
}
