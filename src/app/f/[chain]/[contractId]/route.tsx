// /* eslint-disable react/jsx-key */
// import { Button } from "frames.js/next";
// import { frames } from "./frames";
// import { zoraERC721DropAbi } from "@/abi/zoraERC721DropAbi";
// import { publicClient } from "@/lib/viemClient";
// import { formatEther } from "viem";
// import { parseURI } from "@/lib/utilities";
// import styles from "./FrameImage.module.css"; // Import CSS module
// import { use } from "react";
// import { useSearchParams } from "next/navigation";
// import { get721MintDetails } from "@/lib/get721MintDetails";
// import { getContractType } from "@/lib/getContractType";
// import { collectorClient } from "@/lib/zoraClient";

// // this is for 721 contracts
// const handleRequest = frames(async (ctx) => {
//   const contractAddress = ctx.url.pathname.split("/")[2] as `0x${string}`; // "f/[contractId]"
//   const { price, zoraFee } = await get721MintDetails(contractAddress);
//   const contractURI = await publicClient.readContract({
//     address: contractAddress,
//     abi: zoraERC721DropAbi,
//     functionName: "contractURI",
//   });
//   const contractMetadata = parseURI(contractURI);
//   const image = contractMetadata?.image.replace(
//     "ipfs://",
//     "https://ipfs.io/ipfs/"
//   );
//   const mint1ButtonText = `Mint 1 for ${formatEther(
//     BigInt(1) * (price + zoraFee)
//   )} ETH`;
//   const mint3ButtonText = `Mint 3 for ${formatEther(
//     BigInt(3) * (price + zoraFee)
//   )} ETH`;
//   const mint11ButtonText = `Mint 11 for ${formatEther(
//     BigInt(11) * (price + zoraFee)
//   )} ETH`;

//   return {
//     image: image,
//     imageOptions: {
//       aspectRatio: "1:1",
//     },
//     buttons: [
//       <Button action="tx" target={`/${contractAddress}/txdata`}>
//         {mint1ButtonText}
//       </Button>,
//       <Button action="tx" target={`/${contractAddress}/mint/3/txdata`}>
//         {mint3ButtonText}
//       </Button>,
//       <Button action="tx" target={`/${contractAddress}/mint/11/txdata`}>
//         {mint11ButtonText}
//       </Button>,
//     ],
//   };
// });

// export const GET = handleRequest;
// export const POST = handleRequest;

export { GET, POST } from "@frames.js/render/next";
