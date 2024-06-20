import { BASE_PROVIDER, L1_PROVIDER } from "@/constants";
import { createPublicClient, http } from "viem";
import { base, baseSepolia, mainnet, zoraSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: process.env.NEXT_PUBLIC_IS_PROD ? base : zoraSepolia, // TODO: swap for baseSepolia when zora testnet site supports it again
  transport: http(BASE_PROVIDER),
});

export const l1PublicClient = createPublicClient({
  chain: mainnet,
  transport: http(L1_PROVIDER),
});
