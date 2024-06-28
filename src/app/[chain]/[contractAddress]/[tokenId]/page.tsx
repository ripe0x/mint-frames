import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import MintZora1155 from "@/app/components/onPage/MintZora1155";
import Zora1155TokenDetails from "@/app/components/onPage/Zora1155TokenDetails";
import { fetchMetadata } from "frames.js/next";
import React, { useEffect } from "react";
import { useReadContract } from "wagmi";

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
    <Zora1155TokenDetails
      contractAddress={params.contractAddress as `0x${string}`}
      tokenId={+params.tokenId}
      chain={params.chain}
    />
    // <div className="bg-black flex flex-col gap-10 p-4 justify-center xl:items-center xl:flex-row text-center xl:text-left ">
    //   <div className="xl:w-1/2">
    //     {/* <Zora1155TokenDetails
    //     contractAddress={params.contractAddress as `0x${string}`}
    //     tokenId={+params.tokenId}
    //     chain={params.chain}
    //   /> */}
    //     {tokenArtUrl && (
    //       <img
    //         src={tokenArtUrl}
    //         className="w-full max-w-[400px] mx-auto xl:max-w-none xl:w-full"
    //       />
    //     )}
    //   </div>
    //   <div className="xl:w-1/2">
    //     <h2 className="text-lg my-4 xl:text-2xl">{tokenName}</h2>
    //     <p className="text-xs opacity-75">{tokenDescription}</p>
    //     {/* <p className="text-xs mt-1">
    //       <a
    //         href="https://x.com/ripe0x/status/1796271930623836204"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="opacity-75 hover:opacity-100 underline hover:no-underline"
    //       >
    //         Learn more
    //       </a>
    //     </p> */}
    //     <div className="mt-4">
    //       <MintZora1155
    //         contractAddress={params.contractAddress as `0x${string}`}
    //         tokenId={+params.tokenId}
    //         chain={params.chain}
    //         mintQuantity={1}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
}
