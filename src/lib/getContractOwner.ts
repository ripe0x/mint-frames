import { zoraERC721DropAbi } from "@/abi/zoraERC721DropAbi";
import { getPublicClient } from "@/lib/viemClient";

export const getContractOwner = async (
  contractAddress: string,
  chain: string
) => {
  const publicClient = getPublicClient(chain);
  const ownerAddress = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: zoraERC721DropAbi,
    functionName: "owner",
  });
  return ownerAddress;
};
