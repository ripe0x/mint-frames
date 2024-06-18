import {
  Abi,
  bytesToHex,
  createPublicClient,
  createWalletClient,
  encodeAbiParameters,
  encodeFunctionData,
  formatEther,
  getContract,
  hexToBytes,
  hexToString,
  http,
  parseAbiParameters,
  stringToBytes,
  stringToHex,
} from "viem";
import { frames } from "../../../../frames";
import { transaction } from "frames.js/core";
import { zoraERC721DropAbi } from "@/abi/zoraERC721DropAbi";
import { encodeMintFunctionData } from "@/lib/encodeMintFunctionData";
import { get1155MintDetails } from "@/lib/get1155MintDetails";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import { ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY } from "@/constants";
import { createCollectorClient } from "@zoralabs/protocol-sdk";
import { publicClient } from "@/lib/viemClient";

export const POST = frames(async (ctx) => {
  const collectorClient = createCollectorClient({
    chainId: 8453,
    publicClient,
  });

  console.log("ctx", ctx);
  // Do something with the request data to generate transaction data
  const contractAddress = ctx.url.pathname.split("/")[2] as `0x${string}`; // "f/[contractId]"
  const tokenId = +ctx.url.pathname.split("/")[3];
  const accountAddress = ctx.message?.connectedAddress as `0x${string}`;
  const mintQuantity = +ctx.url.pathname.split("/")[5];
  const { price, zoraFee, isActive } = await get1155MintDetails(
    contractAddress,
    tokenId
  );
  console.log("price", price);
  console.log("zoraFee", zoraFee);
  console.log("isActive", isActive);

  console.log("mintQuantity", mintQuantity);
  console.log("contractAddress", contractAddress);
  console.log("accountAddress", accountAddress);

  // const calldata = await encodeMintFunctionData(
  //   accountAddress,
  //   contractAddress,
  //   mintQuantity
  // );

  // prepare the mint transaction
  const { parameters } = await collectorClient.mint({
    // 1155 contract address
    tokenContract: contractAddress,
    // type of item to mint
    mintType: "1155",
    // 1155 token id to mint
    tokenId: BigInt(tokenId),
    // quantity of tokens to mint
    quantityToMint: mintQuantity,
    // optional comment to include with the mint
    mintComment: "",
    // optional address that will receive a mint referral reward
    mintReferral: process.env
      .NEXT_PUBLIC_MINT_REFERRAL_REWARDS_ADDRESS as `0x${string}`,
    // account that is to invoke the mint transaction
    minterAccount: accountAddress!,
  });
  console.log("parameters", parameters);

  console.log(
    "minterArgs",
    encodeAbiParameters(parseAbiParameters("address, string"), [
      accountAddress,
      "",
    ])
  );
  console.log(
    "(BigInt(mintQuantity) * (zoraFee + price)).toString()",
    (BigInt(mintQuantity) * (zoraFee + price)).toString()
  );
  const calldata = encodeFunctionData({
    abi: zoraERC1155Abi,
    functionName: "mintWithRewards",
    args: [
      ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY,
      BigInt(tokenId),
      BigInt(mintQuantity),
      // stringToHex(accountAddress), // Convert Uint8Array to string
      encodeAbiParameters(parseAbiParameters("address, string"), [
        accountAddress,
        "",
      ]),
      process.env.NEXT_PUBLIC_MINT_REFERRAL_REWARDS_ADDRESS as `0x${string}`,
    ],
  });

  const value = BigInt(mintQuantity) * (zoraFee + price);
  console.log("value", value, formatEther(value));
  // const { price, zoraFee } = await getMintDetails(contractAddress);

  // Return transaction data that conforms to the correct type
  return transaction({
    chainId: "eip155:8453",
    method: "eth_sendTransaction",
    params: {
      abi: zoraERC1155Abi as Abi,
      to: contractAddress,
      data: calldata,
      value: value.toString(),
      // value: BigInt(0).toString(),
    },
  });
});
