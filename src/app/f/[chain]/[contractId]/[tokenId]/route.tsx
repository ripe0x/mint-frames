/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../frames";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import { publicClient } from "@/lib/viemClient";
import { formatEther } from "viem";
import { get1155MintDetails } from "@/lib/get1155MintDetails";
import { collectorClient } from "@/lib/zoraClient";
import { getIsErc20Approved } from "@/lib/getIsErc20Approved";
import { getAccountTokenBalance } from "@/lib/getAccountTokenBalance";
import { getErc20Details } from "@/lib/getErc20Details";
import { ZORA_CONTRACT_ERC20_MINTER_ADDRESS } from "@/constants";
import { truncAddr, zoraMintPageUrl } from "@/lib/utilities";
import { getContractOwner } from "@/lib/getContractOwner";
import getL1EnsName from "@/lib/getL1EnsName";
import { getTokenDetailsButtonText } from "@/lib/getTokenDetailsButtonText";

// this is for 1155 contracts
const handleRequest = frames(async (ctx) => {
  let isERC20Mint = false;
  let isERC20Approved = false;
  let isERC20BalanceAvailable = false;
  let erc20Symbol;
  const accountAddress = ctx.message?.connectedAddress as `0x${string}`;
  const contractAddress = ctx.url.pathname.split("/")[3] as `0x${string}`; // "f/[contractId]"
  const tokenId = +ctx.url.pathname.split("/")[4]; // "f/[contractId]/[tokenId]"
  const { price, zoraFee } = await get1155MintDetails(contractAddress, tokenId);
  const tokenURI = await publicClient.readContract({
    address: contractAddress,
    abi: zoraERC1155Abi,
    functionName: "uri",
    args: [BigInt(tokenId)],
  });

  const tokenUriUrl = tokenURI.replace(
    "ipfs://",
    "https://drops.infura-ipfs.io/ipfs/"
  );
  // fetch token metadata
  const metadata = await fetch(tokenUriUrl);
  const metadataJson = await metadata.json();
  console.log("metadataJson", metadataJson);
  const image = metadataJson.image.replace(
    "ipfs://",
    "https://drops.infura-ipfs.io/ipfs/"
  );
  let mint1ButtonText = `Mint 1 for ${formatEther(
    BigInt(1) * (price + zoraFee)
  )} ETH`;
  let mint3ButtonText = `Mint 3 for ${formatEther(
    BigInt(3) * (price + zoraFee)
  )} ETH`;

  const mintCosts = await collectorClient.getMintCosts({
    collection: contractAddress,
    tokenId,
    quantityMinted: 1,
    mintType: "1155",
  });

  if (mintCosts.totalPurchaseCostCurrency) {
    isERC20Mint = true;
    const { symbol } = await getErc20Details(
      mintCosts.totalPurchaseCostCurrency
    );
    console.log("symbol", symbol);
    erc20Symbol = symbol;
  }

  let buttons = [
    <Button action="link" target={zoraMintPageUrl(contractAddress, tokenId)}>
      {await getTokenDetailsButtonText(contractAddress, metadataJson.name)}
    </Button>,
    <Button
      action="tx"
      target={`/${contractAddress}/${tokenId}/mint/1/txdata`}
      post_url={`/${contractAddress}/${tokenId}/mint/1/success`}
    >
      {mint1ButtonText}
    </Button>,
  ];

  if (isERC20Mint) {
    mint1ButtonText = `Approve ${formatEther(
      mintCosts.totalPurchaseCost
    )} $${erc20Symbol} to mint 1`;
    mint3ButtonText = `Approve ${formatEther(
      BigInt(3) * mintCosts.totalPurchaseCost
    )} $${erc20Symbol} to mint 3`;
    buttons = [
      <Button action="link" target={zoraMintPageUrl(contractAddress, tokenId)}>
        {await getTokenDetailsButtonText(contractAddress, metadataJson.name)}
      </Button>,
      <Button
        action="tx"
        target={{
          query: {
            erc20TokenAddress: mintCosts.totalPurchaseCostCurrency,
            totalPurchaseCost: mintCosts.totalPurchaseCost.toString(),
            mintQuantity: 1,
            tokenId: tokenId,
          },
          pathname: `/${contractAddress}/${tokenId}/mint/1/approveErc20`,
        }}
        post_url={`/${contractAddress}/${tokenId}/mint/1/mintWithErc20`}
      >
        {mint1ButtonText}
      </Button>,
      // <Button
      //   action="tx"
      //   target={{
      //     query: {
      //       erc20TokenAddress: mintCosts.totalPurchaseCostCurrency,
      //       totalPurchaseCost: mintCosts.totalPurchaseCost.toString(),
      //       mintQuantity: 3,
      //       tokenId: tokenId,
      //     },
      //     pathname: `/${contractAddress}/${tokenId}/mint/3/approveErc20`,
      //   }}
      //   post_url={`/${contractAddress}/${tokenId}/mint/3/mintWithErc20`}
      // >
      //   {mint3ButtonText}
      // </Button>,
    ];
  }

  return {
    image: image,
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
