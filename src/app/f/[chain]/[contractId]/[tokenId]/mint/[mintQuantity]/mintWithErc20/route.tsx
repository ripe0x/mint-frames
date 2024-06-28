/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../../../../frames";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import { getPublicClient } from "@/lib/viemClient";
import { formatEther } from "viem";
import { collectorClient } from "@/lib/zoraClient";
import { getErc20Details } from "@/lib/getErc20Details";

// used to mint 1155 tokens after approval
const handleRequest = frames(async (ctx) => {
  const chain = ctx.url.pathname.split("/")[2]; // "f/[chain]"
  const contractAddress = ctx.url.pathname.split("/")[3] as `0x${string}`; // "f/[contractId]"
  const tokenId = +ctx.url.pathname.split("/")[4]; // "f/[contractId]/[tokenId]"
  const mintQuantity = +ctx.url.pathname.split("/")[6];
  const publicClient = getPublicClient(chain);
  const tokenURI = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: zoraERC1155Abi,
    functionName: "uri",
    args: [BigInt(tokenId)],
  });

  const tokenUriUrl = tokenURI.replace(
    "ipfs://",
    "https://drops.infura-ipfs.io/ipfs/"
  );
  const metadata = await fetch(tokenUriUrl);
  const metadataJson = await metadata.json();
  const image = metadataJson.image.replace(
    "ipfs://",
    "https://drops.infura-ipfs.io/ipfs/"
  );

  const mintCosts = await collectorClient.getMintCosts({
    collection: contractAddress as `0x${string}`,
    tokenId,
    quantityMinted: BigInt(mintQuantity),
    mintType: "1155",
  });

  const { symbol } = await getErc20Details(
    mintCosts.totalPurchaseCostCurrency as `0x${string}`,
    chain
  );
  let mintButtonText = `Mint ${mintQuantity} for ${formatEther(
    BigInt(mintCosts.totalPurchaseCost)
  )} $${symbol}`;

  let buttons = [
    <Button
      action="tx"
      target={{
        query: {
          totalPurchaseCost: mintCosts.totalPurchaseCost.toString(),
          contractAddress: contractAddress,
          mintQuantity: mintQuantity,
          tokenId: tokenId,
        },
        pathname: `/${chain}/${contractAddress}/${tokenId}/mint/${mintQuantity}/erc20Txdata`,
      }}
      post_url={`/${chain}/${contractAddress}/${tokenId}/mint/${mintQuantity}/success`}
    >
      {mintButtonText}
    </Button>,
  ];

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
