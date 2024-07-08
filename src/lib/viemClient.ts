import { BASE_PROVIDER, L1_PROVIDER } from "@/constants";
import { createPublicClient, http } from "viem";
import { base, mainnet, zora, baseSepolia, optimism } from "viem/chains";

export const publicClient = createPublicClient({
  chain: process.env.NEXT_PUBLIC_IS_PROD ? base : baseSepolia, // TODO: swap for baseSepolia when zora testnet site supports it again
  transport: http(BASE_PROVIDER),
});

export const l1PublicClient = createPublicClient({
  chain: mainnet,
  transport: http(L1_PROVIDER),
});

export const getPublicClient = (chain: string) => {
  let chainObj: any = base; // default to base mainnet
  let chainLabel = "base";
  switch (chain) {
    case "mainnet":
      chainObj = mainnet;
      chainLabel = "eth";
    case "zora":
      chainObj = zora;
      chainLabel = "zora";
    case "oeth":
      chainObj = optimism;
      chainLabel = "opt";
  }
  const publicClient = createPublicClient({
    chain: chainObj,
    transport: http(
      `https://${chainLabel}-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_PROVIDER_API_KEY}`
    ),
  });
  return publicClient;
};
