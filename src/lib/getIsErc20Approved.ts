import { publicClient } from "./viemClient";
import { erc20Abi } from "viem";

export const getIsErc20Approved = async (
  contractAddress: `0x${string}`,
  accountAddress: `0x${string}`,
  spenderAddress: `0x${string}`
) => {
  const approvalAmount = await publicClient.readContract({
    address: contractAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "allowance",
    args: [accountAddress, spenderAddress],
  });
  return approvalAmount;
};
