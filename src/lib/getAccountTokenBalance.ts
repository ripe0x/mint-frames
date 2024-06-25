import { erc20Abi } from "viem";
import { publicClient } from "./viemClient";

export const getAccountTokenBalance = async (
  contractAddress: `0x${string}`,
  accountAddress: `0x${string}`
) => {
  const balance = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [accountAddress],
  });
  return balance;
};
