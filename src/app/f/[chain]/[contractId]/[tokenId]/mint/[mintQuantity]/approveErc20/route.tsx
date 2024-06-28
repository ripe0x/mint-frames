import { Abi, encodeFunctionData, erc20Abi, maxUint256 } from "viem";
import { frames } from "../../../../frames";
import { transaction } from "frames.js/core";
import { CHAIN_ID, ZORA_CONTRACT_ERC20_MINTER_ADDRESS } from "@/constants";
import { chainIdFromChainLabel } from "@/lib/chainIdFromChainLabel";

export const POST = frames(async (ctx) => {
  const chain = ctx.url.pathname.split("/")[2];
  const tokenContractAddress = ctx.searchParams.erc20TokenAddress;
  const totalPurchaseCost = ctx.searchParams.totalPurchaseCost;
  const spenderAddress = ZORA_CONTRACT_ERC20_MINTER_ADDRESS as `0x${string}`;

  const calldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [spenderAddress as `0x${string}`, BigInt(totalPurchaseCost)],
  });

  return transaction({
    chainId: `eip155:${chainIdFromChainLabel(chain)}`,
    method: "eth_sendTransaction",
    attribution: false,
    params: {
      abi: erc20Abi as Abi,
      to: tokenContractAddress as `0x${string}`,
      data: calldata,
    },
  });
});
