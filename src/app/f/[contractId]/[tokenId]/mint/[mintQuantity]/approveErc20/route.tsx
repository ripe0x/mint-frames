import { Abi, encodeFunctionData, erc20Abi, maxUint256 } from "viem";
import { frames } from "../../../../frames";
import { transaction } from "frames.js/core";
import { CHAIN_ID, ZORA_CONTRACT_ERC20_MINTER_ADDRESS } from "@/constants";

export const POST = frames(async (ctx) => {
  const tokenContractAddress = ctx.searchParams.erc20TokenAddress;
  const totalPurchaseCost = ctx.searchParams.totalPurchaseCost;
  const spenderAddress = ZORA_CONTRACT_ERC20_MINTER_ADDRESS as `0x${string}`;
  const mintQuantity = ctx.searchParams.mintQuantity;

  const calldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [
      spenderAddress as `0x${string}`,
      // BigInt(totalPurchaseCost) * BigInt(mintQuantity),
      // maxUint256,
      BigInt(totalPurchaseCost),
    ],
  });

  return transaction({
    chainId: `eip155:${CHAIN_ID}`,
    method: "eth_sendTransaction",
    params: {
      abi: erc20Abi as Abi,
      to: tokenContractAddress as `0x${string}`,
      data: calldata,
    },
  });
});
