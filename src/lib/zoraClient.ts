import { createCollectorClient } from "@zoralabs/protocol-sdk";
import { publicClient } from "./viemClient";
import { CHAIN_ID } from "@/constants";

export const collectorClient = createCollectorClient({
  chainId: CHAIN_ID,
  publicClient,
});
console.log("collectorClient", collectorClient);
