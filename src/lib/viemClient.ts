import { BASE_PROVIDER } from "@/constants";
import { createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: process.env.NEXT_PUBLIC_IS_PROD ? base : baseSepolia,
  transport: http(BASE_PROVIDER),
});
