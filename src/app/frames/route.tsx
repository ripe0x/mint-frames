// "use client";
/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { zoraERC721DropAbi } from "@/abi/zoraERC721DropAbi";
import { publicClient } from "@/lib/viemClient";
import { formatEther } from "viem";
import { parseURI } from "@/lib/utilities";

const handleRequest = frames(async (ctx) => {
  console.log("handleRequest", ctx);
  const contractAddress = "0xa2883ba970fcc2ebc7c76f0a54b5fc54eb4fe3d8";
  const saleDetails = await publicClient.readContract({
    address: contractAddress,
    abi: zoraERC721DropAbi,
    functionName: "saleDetails",
  });

  const contractURI = await publicClient.readContract({
    address: contractAddress,
    abi: zoraERC721DropAbi,
    functionName: "contractURI",
  });
  const contractMetadata = parseURI(contractURI);
  const image = contractMetadata?.image.replace(
    "ipfs://",
    "https://ipfs.io/ipfs/"
  );

  const mint1ButtonText = `Mint 1 for ${formatEther(
    saleDetails.publicSalePrice * BigInt(1)
  )} ETH`;
  const mint3ButtonText = `Mint 3 for ${formatEther(
    saleDetails.publicSalePrice * BigInt(3)
  )} ETH`;
  const mint11ButtonText = `Mint 11 for ${formatEther(
    saleDetails.publicSalePrice * BigInt(11)
  )} ETH`;
  return {
    image: image,
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="tx" target="/txdata">
        {mint1ButtonText}
      </Button>,
      <Button action="tx" target="/txdata">
        {mint3ButtonText}
      </Button>,
      <Button action="tx" target="/txdata">
        {mint11ButtonText}
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
