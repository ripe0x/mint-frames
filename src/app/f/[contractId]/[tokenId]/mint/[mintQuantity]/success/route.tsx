/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../../../../frames";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import { publicClient } from "@/lib/viemClient";
import { frameUrl, postCastUrl, zoraMintPageUrl } from "@/lib/utilities";
import { getContractOwner } from "@/lib/getContractOwner";
// import { getFarcasterUsernameFromAddress } from "@/lib/getFarcasterUsernameFromAddress";

// this is for 1155 contracts
const handleRequest = frames(async (ctx) => {
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
  // const creatorFarcasterHandle = await getFarcasterUsernameFromAddress(
  //   await getContractOwner(contractAddress)
  // );
  const creatorFarcasterHandle = false; // temp remove due to error with neynar node version requirement
  const castText = `Mint ${metadataJson.name} ${
    creatorFarcasterHandle &&
    `by @${creatorFarcasterHandle} with the drops.wtf frame \n \n ${frameUrl(
      ctx.url.origin,
      contractAddress,
      tokenId
    )}`
  }`;

  let buttons = [
    <Button action="link" target={zoraMintPageUrl(contractAddress, tokenId)}>
      View on Zora
    </Button>,
    <Button action="link" target={postCastUrl(castText)}>
      Share
    </Button>,
  ];

  const imageText = `Minted ${mintQuantity} ${metadataJson.name} ${
    creatorFarcasterHandle && `by ${creatorFarcasterHandle}`
  }`;

  return {
    image: (
      <div tw="flex w-full h-full bg-black">
        <div tw="bg-transparent text-white w-full h-full p-10 justify-center items-center flex text-center gap-4 flex-col text-[60px] font-bold">
          <img src={image} tw="blur-xl absolute opacity-35" />
          <span tw="font-bold mb-4">Success 🎉</span>
          <span>{imageText}</span>
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
