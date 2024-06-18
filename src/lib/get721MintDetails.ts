import { zoraERC721DropAbi } from "@/abi/zoraERC721DropAbi";
import { publicClient } from "@/lib/viemClient";
import { getContractType } from "./getContractType";
import { ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY } from "@/constants";
import { zoraFixedPriceSaleStrategyAbi } from "@/abi/zoraFixedPriceSaleStrategy";
import { getIsSaleActive } from "./getIsSaleActive";
export const get721MintDetails = async (
  contractAddress: string,
  tokenId?: number
) => {
  const zoraFeePerMint = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: zoraERC721DropAbi,
    functionName: "zoraFeeForAmount",
    args: [BigInt(1)],
  });
  const saleDetails = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: zoraERC721DropAbi,
    functionName: "saleDetails",
  });
  const zoraFee = zoraFeePerMint[1];
  const isActive = saleDetails.publicSaleActive;
  return {
    price: saleDetails.publicSalePrice,
    zoraFee,
    isActive,
  };
};
