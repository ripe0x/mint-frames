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
import { getMintDetails } from "@/lib/get721MintDetails";

export const POST = frames(async (ctx) => {
  // Do something with the request data to generate transaction data
  const contractAddress = ctx.url.pathname.split("/")[2] as `0x${string}`; // "f/[contractId]"
  const mintQuantity = BigInt(1);
  const calldata = encodeFunctionData({
    abi: zoraERC721DropAbi,
    functionName: "purchase",
    args: [BigInt(mintQuantity)],
  });

  const { price, zoraFee } = await getMintDetails(contractAddress);

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: "eip155:8453",
    method: "eth_sendTransaction",
    params: {
      abi: zoraERC721DropAbi as Abi,
      to: contractAddress,
      data: calldata,
      value: (mintQuantity * zoraFee + price).toString(),
    },
  });
});
