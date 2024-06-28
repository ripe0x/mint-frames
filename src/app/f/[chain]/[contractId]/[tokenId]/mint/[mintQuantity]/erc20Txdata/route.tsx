import {
  Abi,
  encodeAbiParameters,
  encodeFunctionData,
  parseAbiParameters,
} from "viem";
import { frames } from "../../../../frames";
import { transaction } from "frames.js/core";
import { collectorClient } from "@/lib/zoraClient";
import { get1155MintDetails } from "@/lib/get1155MintDetails";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import {
  CHAIN_ID,
  ZORA_CONTRACT_ERC20_MINTER_ADDRESS,
  ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY,
} from "@/constants";
import { zoraErc20MinterAbi } from "@/abi/zoraErc20MinterAbi";
import { writeContract } from "viem/actions";
import { publicClient } from "@/lib/viemClient";

export const POST = frames(async (ctx) => {
  const contractAddress = ctx.url.pathname.split("/")[3] as `0x${string}`; // "f/[contractId]"
  const tokenId = +ctx.url.pathname.split("/")[4];
  const accountAddress = ctx.message?.connectedAddress as `0x${string}`;
  const mintQuantity = +ctx.url.pathname.split("/")[6];

  const { parameters } = await collectorClient.mint({
    tokenContract: contractAddress,
    mintType: "1155",
    tokenId: BigInt(tokenId),
    quantityToMint: mintQuantity,
    mintComment: "",
    mintReferral: process.env
      .NEXT_PUBLIC_MINT_REFERRAL_REWARDS_ADDRESS as `0x${string}`,
    minterAccount: accountAddress!,
  });

  const calldata = encodeFunctionData({
    abi: zoraErc20MinterAbi,
    functionName: "mint",
    args: parameters.args,
  });

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: `eip155:${CHAIN_ID}`,
    method: "eth_sendTransaction",
    params: {
      abi: parameters.abi,
      to: ZORA_CONTRACT_ERC20_MINTER_ADDRESS,
      data: calldata,
    },
  });
});
