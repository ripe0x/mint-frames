import { createCollectorClient } from "@zoralabs/protocol-sdk";
import { publicClient, getPublicClient } from "./viemClient";
import { CHAIN_ID } from "@/constants";

export const collectorClient = createCollectorClient({
  chainId: CHAIN_ID,
  publicClient,
});

export const getCollectorClient = (chain: string) => {
  let chainId = 8453; // default to base mainnet
  switch (chain) {
    case "mainnet":
      chainId = 1;
    case "zora":
      chainId = 7777777;
    case "oeth":
      chainId = 10;
  }
  const publicClient = getPublicClient(chain);

  const collectorClient = createCollectorClient({
    chainId: chainId,
    publicClient,
  });
  return collectorClient;
};
