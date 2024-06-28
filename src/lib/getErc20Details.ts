import { erc20Abi } from "viem";
import { getPublicClient } from "./viemClient";

export const getErc20Details = async (
  contractAddress: `0x${string}`,
  chain: string
) => {
  const publicClient = getPublicClient(chain);
  // get name and symbol of ERC20 token
  const name = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "name",
  });
  const symbol = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "symbol",
  });
  return {
    name,
    symbol,
  };
};
