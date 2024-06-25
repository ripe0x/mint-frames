/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../../../../frames";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import { publicClient } from "@/lib/viemClient";
import { frameUrl, postCastUrl, zoraMintPageUrl } from "@/lib/utilities";

// this is for 1155 contracts
const handleRequest = frames(async (ctx) => {
  console.log("ctx", ctx);
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

  console.log("image", image);

  const castText = `Mint ${
    metadataJson.name
  }  with the drops.wtf frame \n \n ${frameUrl(
    ctx.url.origin,
    contractAddress,
    tokenId
  )}
  `;

  let buttons = [
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
        <div tw="bg-transparent text-white w-full h-full justify-center items-center flex text-center gap-4 flex-col text-[30px] font-bold">
          <img src={image} tw="blur-xl absolute opacity-35" />
          <span tw="font-bold mb-4 px-10">Success 🎉</span>
          <span>{imageText}</span>
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
      width: 400,
      height: 400,
    },
    buttons: buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
