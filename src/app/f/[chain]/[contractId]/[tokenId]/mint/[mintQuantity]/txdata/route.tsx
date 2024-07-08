import {
  Abi,
  encodeAbiParameters,
  encodeFunctionData,
  parseAbiParameters,
} from "viem";
import { frames } from "../../../../frames";
import { transaction } from "frames.js/core";
import { get1155MintDetails } from "@/lib/get1155MintDetails";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import {
  CHAIN_ID,
  OP_ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY,
  ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY,
} from "@/constants";
import { chainIdFromChainLabel } from "@/lib/chainIdFromChainLabel";

export const POST = frames(async (ctx) => {
  // Do something with the request data to generate transaction data
  const chain = ctx.url.pathname.split("/")[2];
  const contractAddress = ctx.url.pathname.split("/")[3] as `0x${string}`; // "f/[contractId]"
  const tokenId = +ctx.url.pathname.split("/")[4];
  const accountAddress = ctx.message?.connectedAddress as `0x${string}`;
  const mintQuantity = +ctx.url.pathname.split("/")[6];
  const { price, zoraFee } = await get1155MintDetails(
    contractAddress,
    tokenId,
    chain
  );

  const calldata = encodeFunctionData({
    abi: zoraERC1155Abi,
    functionName: "mintWithRewards",
    args: [
      chain === "oeth"
        ? OP_ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY
        : ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY,
      BigInt(tokenId),
      BigInt(mintQuantity),
      encodeAbiParameters(parseAbiParameters("address, string"), [
        accountAddress,
        "",
      ]),
      process.env.NEXT_PUBLIC_MINT_REFERRAL_REWARDS_ADDRESS as `0x${string}`,
    ],
  });

  const value = BigInt(mintQuantity) * (zoraFee + price);

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: `eip155:${chainIdFromChainLabel(chain)}`,
    method: "eth_sendTransaction",
    params: {
      abi: zoraERC1155Abi as Abi,
      to: contractAddress,
      data: calldata,
      value: value.toString(),
    },
  });
});
