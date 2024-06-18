import { zoraERC721DropAbi } from "@/abi/zoraERC721DropAbi";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import { publicClient } from "./viemClient";
import {
  SUPPORTED_ZORA_1155_CONTRACT_VERSIONS,
  SUPPORTED_ZORA_721_CONTRACT_VERSIONS,
} from "@/constants";

export const getContractType = async (contractAddress: string) => {
  const contractVersion = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: zoraERC1155Abi,
    functionName: "contractVersion",
  });
  // check if contractVersion exists in the array supported1155ContractVersions

  if (SUPPORTED_ZORA_1155_CONTRACT_VERSIONS.includes(contractVersion)) {
    return "ERC1155";
  }
  // assume it's a 721 contract if it's not a 1155 contract
  // if (SUPPORTED_ZORA_721_CONTRACT_VERSIONS.includes(contractVersion)) {
  return "ERC721";
  // }
};
