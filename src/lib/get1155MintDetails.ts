import { getPublicClient } from "@/lib/viemClient";
import { ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY } from "@/constants";
import { zoraFixedPriceSaleStrategyAbi } from "@/abi/zoraFixedPriceSaleStrategy";
import { getIsSaleActive } from "./getIsSaleActive";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";

export const get1155MintDetails = async (
  contractAddress: string,
  tokenId: number,
  chain: string
) => {
  const publicClient = getPublicClient(chain);
  const zoraFee = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: zoraERC1155Abi,
    functionName: "mintFee",
  });
  const saleDetails = await publicClient.readContract({
    address: ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY as `0x${string}`,
    abi: zoraFixedPriceSaleStrategyAbi,
    functionName: "sale",
    args: [contractAddress as `0x${string}`, BigInt(tokenId)],
  });
  const price = saleDetails.pricePerToken;

  const isActive = await getIsSaleActive(
    saleDetails.saleStart,
    saleDetails.saleEnd
  );

  return {
    price,
    zoraFee,
    isActive,
  };
};
