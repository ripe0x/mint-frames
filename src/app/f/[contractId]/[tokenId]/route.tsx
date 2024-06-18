/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { zoraERC721DropAbi } from "@/abi/zoraERC721DropAbi";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import { publicClient } from "@/lib/viemClient";
import { formatEther } from "viem";
import { parseURI } from "@/lib/utilities";
import { get1155MintDetails } from "@/lib/get1155MintDetails";
import { collectorClient } from "@/lib/zoraClient";

// this is for 1155 contracts
const handleRequest = frames(async (ctx) => {
  let isERC20Mint = false;
  const contractAddress = ctx.url.pathname.split("/")[2] as `0x${string}`; // "f/[contractId]"
  const tokenId = +ctx.url.pathname.split("/")[3]; // "f/[contractId]/[tokenId]"
  const { price, zoraFee } = await get1155MintDetails(contractAddress, tokenId);
  const tokenURI = await publicClient.readContract({
    address: contractAddress,
    abi: zoraERC1155Abi,
    functionName: "uri",
    args: [BigInt(tokenId)],
  });
  // console.log("tokenURI", tokenURI);
  // const tokenMetadata = parseURI(tokenURI);
  // console.log("tokenMetadata", tokenMetadata);
  const tokenUriUrl = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
  // fetch token metadata
  const metadata = await fetch(tokenUriUrl);
  console.log("metadata", metadata);
  const metadataJson = await metadata.json();
  console.log("metadataJson", metadataJson);
  // const image = metadataJson.image.replace("ipfs://", "https://ipfs.io/ipfs/");
  const image = metadataJson.image.replace(
    "ipfs://",
    "https://drops.infura-ipfs.io/ipfs/"
  );
  console.log("image", image);
  const mint1ButtonText = `Mint 1 for ${formatEther(
    BigInt(1) * (price + zoraFee)
  )} ETH`;
  const mint3ButtonText = `Mint 3 for ${formatEther(
    BigInt(3) * (price + zoraFee)
  )} ETH`;
  const mint11ButtonText = `Mint 11 for ${formatEther(
    BigInt(11) * (price + zoraFee)
  )} ETH`;

  const mintCosts = await collectorClient.getMintCosts({
    collection: contractAddress,
    tokenId,
    quantityMinted: 1,
    mintType: "1155",
  });
  console.log("mintCosts", mintCosts);

  if (mintCosts.totalPurchaseCostCurrency) {
    isERC20Mint = true;
  }

  console.log("isERC20Mint", isERC20Mint);

  let buttons = [
    <Button action="tx" target={`/${contractAddress}/${tokenId}/mint/1/txdata`}>
      {mint1ButtonText}
    </Button>,
    <Button action="tx" target={`/${contractAddress}/${tokenId}/mint/3/txdata`}>
      {mint3ButtonText}
    </Button>,
    <Button
      action="tx"
      target={`/${contractAddress}/${tokenId}/mint/11/txdata`}
    >
      {mint11ButtonText}
    </Button>,
  ];

  if (isERC20Mint) {
    buttons = [
      <Button
        action="tx"
        target={`/${contractAddress}/${tokenId}/mint/1/txdata`}
      >
        ERC20 mint
      </Button>,
      // <Button
      //   action="tx"
      //   target={`/${contractAddress}/${tokenId}/mint/3/txdata`}
      // >
      //   {mint3ButtonText}
      // </Button>,
      // <Button
      //   action="tx"
      //   target={`/${contractAddress}/${tokenId}/mint/11/txdata`}
      // >
      //   {mint11ButtonText}
      // </Button>,
    ];
  }

  return {
    image: image,
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
