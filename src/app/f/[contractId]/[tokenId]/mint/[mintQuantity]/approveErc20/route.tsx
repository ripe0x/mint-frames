import { Abi, encodeFunctionData, erc20Abi, maxUint256 } from "viem";
import { frames } from "../../../../frames";
import { transaction } from "frames.js/core";
import { CHAIN_ID, ZORA_CONTRACT_ERC20_MINTER_ADDRESS } from "@/constants";
import { collectorClient, walletClient } from "@/lib/zoraClient";

export const POST = frames(async (ctx) => {
  const tokenContractAddress = ctx.searchParams.erc20TokenAddress;
  const totalPurchaseCost = ctx.searchParams.totalPurchaseCost;
  const spenderAddress = ZORA_CONTRACT_ERC20_MINTER_ADDRESS as `0x${string}`;
  const mintQuantity = ctx.searchParams.mintQuantity;
  const tokenId = +ctx.url.pathname.split("/")[3];
  const accountAddress = ctx.message?.connectedAddress as `0x${string}`;
  const contractAddress = ctx.url.pathname.split("/")[2] as `0x${string}`; // "f/[contractId]"

  const { parameters, erc20Approval } = await collectorClient.mint({
    tokenContract: contractAddress,
    mintType: "1155",
    tokenId: BigInt(tokenId),
    quantityToMint: 3,
    mintComment: "My comment",
    minterAccount: accountAddress,
  });
  console.log("parameters", parameters);
  console.log("erc20Approval", erc20Approval);
  console.log("totalPurchaseCost", totalPurchaseCost);

  const calldata = encodeFunctionData({
    abi: erc20Abi,
    functionName: "approve",
    args: [
      spenderAddress as `0x${string}`,
      // BigInt(totalPurchaseCost) * BigInt(mintQuantity),
      // maxUint256,
      // BigInt(totalPurchaseCost),
      erc20Approval!.quantity,
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
