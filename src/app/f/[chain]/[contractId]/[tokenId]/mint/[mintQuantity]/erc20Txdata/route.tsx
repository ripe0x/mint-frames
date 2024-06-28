import { encodeFunctionData } from "viem";
import { frames } from "../../../../frames";
import { transaction } from "frames.js/core";
import { getCollectorClient } from "@/lib/zoraClient";
import { ZORA_CONTRACT_ERC20_MINTER_ADDRESS } from "@/constants";
import { zoraErc20MinterAbi } from "@/abi/zoraErc20MinterAbi";
import { chainIdFromChainLabel } from "@/lib/chainIdFromChainLabel";

export const POST = frames(async (ctx) => {
  const chain = ctx.url.pathname.split("/")[2];
  const contractAddress = ctx.url.pathname.split("/")[3] as `0x${string}`; // "f/[contractId]"
  const tokenId = +ctx.url.pathname.split("/")[4];
  const accountAddress = ctx.message?.connectedAddress as `0x${string}`;
  const mintQuantity = +ctx.url.pathname.split("/")[6];
  const collectorClient = getCollectorClient(chain);
  const { parameters } = await collectorClient.mint({
    tokenContract: contractAddress,
    mintType: "1155",
    tokenId: BigInt(tokenId),
    quantityToMint: mintQuantity,
    mintComment: "",
    mintReferral: process.env
      .NEXT_PUBLIC_MINT_REFERRAL_REWARDS_ADDRESS as `0x${string}`,
    minterAccount: accountAddress!,
  });

  const calldata = encodeFunctionData({
    abi: zoraErc20MinterAbi,
    functionName: "mint",
    args: parameters.args,
  });

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: `eip155:${chainIdFromChainLabel(chain)}`,
    method: "eth_sendTransaction",
    params: {
      abi: parameters.abi,
      to: ZORA_CONTRACT_ERC20_MINTER_ADDRESS,
      data: calldata,
    },
  });
});
