import {
  Abi,
  createPublicClient,
  createWalletClient,
  encodeFunctionData,
  getContract,
  http,
} from "viem";
import { frames } from "../frames";
import { transaction } from "frames.js/core";
import { zoraERC721DropAbi } from "@/abi/zoraERC721DropAbi";
import { writeContract, createConfig, getAccount, injected } from "@wagmi/core";

import { baseSepolia, mainnet } from "viem/chains";
import { BASE_PROVIDER } from "@/constants";
import { publicClient } from "@/lib/viemClient";

export const POST = frames(async (ctx) => {
  // Do something with the request data to generate transaction data
  const userAddress = ctx.message?.connectedAddress as `0x${string}`;
  const contractAddress = "0x7524e5644abf4eb3eabc43e548bfe9243c7f3b78";
  const mintQuantity = BigInt(1);
  // const publicClient = createPublicClient({
  //   chain: baseSepolia,
  //   transport: http(BASE_PROVIDER),
  // });

  const calldata = encodeFunctionData({
    abi: zoraERC721DropAbi,
    functionName: "purchase",
    args: [BigInt(mintQuantity)],
  });

  const zoraFeeForQuantity = await publicClient.readContract({
    address: contractAddress,
    abi: zoraERC721DropAbi,
    functionName: "zoraFeeForAmount",
    args: [BigInt(mintQuantity)],
  });
  const saleDetails = await publicClient.readContract({
    address: contractAddress,
    abi: zoraERC721DropAbi,
    functionName: "saleDetails",
  });
  const zoraFee = zoraFeeForQuantity[1];

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: "eip155:84532", // OP Mainnet
    method: "eth_sendTransaction",
    params: {
      abi: zoraERC721DropAbi as Abi,
      to: contractAddress,
      data: calldata,
      value: (mintQuantity * zoraFee + saleDetails.publicSalePrice).toString(),
    },
  });
});
