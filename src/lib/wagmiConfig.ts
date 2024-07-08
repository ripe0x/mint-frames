"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { baseSepolia, base, optimism } from "wagmi/chains";
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { zora, mainnet } from "viem/chains";

const projectId = process.env.NEXT_PUBLIC_BASE_WALLETCONNECT_ID || "";

const supportedChains: Chain[] = [base, zora, mainnet, optimism];

export const config = getDefaultConfig({
  appName: "WalletConnection",
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
