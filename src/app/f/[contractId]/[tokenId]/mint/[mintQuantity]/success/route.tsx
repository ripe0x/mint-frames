/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../../../../frames";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import { publicClient } from "@/lib/viemClient";
import { frameUrl, postCastUrl, zoraMintPageUrl } from "@/lib/utilities";
import { collectorClient } from "@/lib/zoraClient";
import { getTokenCreatorOwnerDisplayName } from "@/lib/getTokenCreatorOwnerDisplayName";
import { getFcUsernameFromAddress } from "@/lib/getFcUsernameFromAddress";
import { getContractOwner } from "@/lib/getContractOwner";

// this is for 1155 contracts
const handleRequest = frames(async (ctx) => {
  // if (!ctx.message || !ctx.message.state) {
  if (!ctx) {
    throw new Error("Invalid Frame");
  }
  const contractAddress = ctx.url.pathname.split("/")[2] as `0x${string}`; // "f/[contractId]"
  const tokenId = +ctx.url.pathname.split("/")[3]; // "f/[contractId]/[tokenId]"
  const mintQuantity = +ctx.url.pathname.split("/")[5];
  const tokenURI = await publicClient.readContract({
    address: contractAddress,
    abi: zoraERC1155Abi,
    functionName: "uri",
    args: [BigInt(tokenId)],
  });

  const tokenUriUrl = tokenURI.replace(
    "ipfs://",
    "https://drops.infura-ipfs.io/ipfs/"
  );

  // fetch token metadata
  const metadata = await fetch(tokenUriUrl);
  const metadataJson = await metadata.json();
  const image = metadataJson.image.replace(
    "ipfs://",
    "https://drops.infura-ipfs.io/ipfs/"
  );

  const creatorFcUsername = await getFcUsernameFromAddress(
    await getContractOwner(contractAddress)
  );
  const castText = `Mint ${metadataJson.name} by ${
    creatorFcUsername
      ? `@${creatorFcUsername}`
      : await getTokenCreatorOwnerDisplayName(contractAddress)
  } with the drops.wtf frame \n ${frameUrl(
    ctx.url.origin,
    contractAddress,
    tokenId
  )}
  `;

  let mintAgainButton = (
    <Button action="post" target={`/${contractAddress}/${tokenId}`}>
      Mint again 🔄
    </Button>
  );

  const mintCosts = await collectorClient.getMintCosts({
    collection: contractAddress as `0x${string}`,
    tokenId,
    quantityMinted: BigInt(mintQuantity),
    mintType: "1155",
  });

  // if erc20 mint, skip approval step (already approved) and send user directly to mint
  if (mintCosts.totalPurchaseCostCurrency) {
    mintAgainButton = (
      <Button
        action="post"
        target={`/${contractAddress}/${tokenId}/mint/${mintQuantity}/mintWithErc20`}
      >
        Mint again 🔄
      </Button>
    );
  }

  let buttons = [
    mintAgainButton,
    <Button action="link" target={zoraMintPageUrl(contractAddress, tokenId)}>
      View on Zora
    </Button>,
    <Button action="link" target={postCastUrl(castText)}>
      Share
    </Button>,
  ];

  const imageText = `Minted ${mintQuantity} ${metadataJson.name}`;

  return {
    image: (
      <div tw="flex w-full h-full bg-black">
        <div tw="bg-transparent text-white w-full h-full justify-center items-center flex text-center flex-col text-[18px] font-bold">
          <img src={image} tw="absolute opacity-35" />
          <span tw="font-bold mb-4 px-10">Success!</span>
          <span>{imageText}</span>
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
      width: 300,
      height: 300,
    },
    buttons: buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
