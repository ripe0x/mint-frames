import { zoraERC721DropAbi } from "@/abi/zoraERC721DropAbi";
import { encodeFunctionData, stringToBytes, toBytes } from "viem";

export const encodeMintFunctionData = async (
  accountAddress: string,
  contractAddress: string,
  mintQuantity: number,
  tokenId?: number
) => {
  // if (tokenId) {
  //   // mint for 1155
  //   const calldata = encodeFunctionData({
  //     abi: zoraERC1155Abi,
  //     functionName: "mintWithRewards",
  //     args: [
  //       accountAddress as `0x${string}`,
  //       BigInt(tokenId),
  //       BigInt(mintQuantity),
  //       // stringToBytes(accountAddress as `0x${string}`),
  //       accountAddress as `0x${string}`,
  //       process.env.NEXT_PUBLIC_MINT_REFERRAL_REWARDS_ADDRESS as `0x${string}`,
  //     ],
  //   });
  //   return calldata;
  // }

  // mint for 721
  const calldata = encodeFunctionData({
    abi: zoraERC721DropAbi,
    functionName: "mintWithRewards",
    args: [
      accountAddress as `0x${string}`,
      BigInt(mintQuantity),
      "", // comment
      process.env.NEXT_PUBLIC_MINT_REFERRAL_REWARDS_ADDRESS as `0x${string}`,
    ],
  });
  return calldata;
};
