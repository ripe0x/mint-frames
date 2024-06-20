import { zoraERC721DropAbi } from "@/abi/zoraERC721DropAbi";
import { publicClient } from "@/lib/viemClient";

export const getContractOwner = async (contractAddress: string) => {
  const ownerAddress = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: zoraERC721DropAbi,
    functionName: "owner",
  });
  return ownerAddress;
};
