import { createCollectorClient } from "@zoralabs/protocol-sdk";
import { publicClient } from "./viemClient";
import { BASE_PROVIDER, CHAIN_ID } from "@/constants";
import { createWalletClient, http } from "viem";
import { base } from "viem/chains";

export const collectorClient = createCollectorClient({
  chainId: CHAIN_ID,
  publicClient,
});

export const walletClient = createWalletClient({
  chain: base,
  transport: http(BASE_PROVIDER),
});
