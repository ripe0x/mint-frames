import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import MintZora1155 from "@/app/components/onPage/MintZora1155";
import Zora1155TokenDetails from "@/app/components/onPage/Zora1155TokenDetails";
import { fetchMetadata } from "frames.js/next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

type Props = {
  params: { chain: string; contractAddress: string; tokenId: string };
};

export async function generateMetadata({ params }: Props) {
  return {
    title: "Drops.wtf",
    other: {
      ...(await fetchMetadata(
        new URL(
          `/f/${params.chain}/${params.contractAddress}/${params.tokenId}`,
          process.env.NEXT_PUBLIC_NETLIFY_URL
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
  );
}
