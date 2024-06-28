"use client";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import React, { useEffect } from "react";
import { useReadContract } from "wagmi";
import MintZora1155 from "./MintZora1155";
import { chainIdFromChainLabel } from "@/lib/chainIdFromChainLabel";
import { getTokenCreatorOwnerDisplayName } from "@/lib/getTokenCreatorOwnerDisplayName";

type Props = {
  contractAddress: `0x${string}`;
  tokenId: number;
  chain: string;
};

const Zora1155TokenDetails = (props: Props) => {
  console.log("props", props);
  const [tokenArtUrl, setTokenArtUrl] = React.useState<string | null>(null);
  const [tokenName, setTokenName] = React.useState<string | null>(null);
  const [tokenDescription, setTokenDescription] = React.useState<string | null>(
    null
  );
  const [creatorName, setCreatorName] = React.useState<string | null>(null);
  const result = useReadContract({
    abi: zoraERC1155Abi,
    address: props.contractAddress,
    functionName: "uri",
    args: [BigInt(props.tokenId)],
    chainId: chainIdFromChainLabel(props.chain),
  });

  const fetchMetadata = async (tokenUriUrl: string) => {
    const metadata = await fetch(tokenUriUrl);
    const metadataJson = await metadata.json();
    const artworkUrl = metadataJson.image.replace(
      "ipfs://",
      "https://drops.infura-ipfs.io/ipfs/"
    );
    setTokenArtUrl(artworkUrl);
    setTokenName(metadataJson.name);
    setTokenDescription(metadataJson.description);
    const creator = await getTokenCreatorOwnerDisplayName(
      props.contractAddress,
      props.chain
    );
    if (creator) {
      setCreatorName(creator);
    }
  };
  useEffect(() => {
    const tokenUriUrl = result.data?.replace(
      "ipfs://",
      "https://drops.infura-ipfs.io/ipfs/"
    );
    if (tokenUriUrl) fetchMetadata(tokenUriUrl);
  }, [result.data]);
  console.log("result", result?.data);
  console.log("result", tokenArtUrl, tokenName, tokenDescription);

  return (
    <div className="bg-black flex flex-col gap-10 p-4 justify-center xl:items-center xl:flex-row text-center xl:text-left ">
      <div className="xl:w-1/2">
        {tokenArtUrl && (
          <img
            src={tokenArtUrl}
            className="w-full max-w-[400px] mx-auto xl:max-w-none xl:w-full"
          />
        )}
      </div>
      <div className="xl:w-1/2">
        <h2 className="text-2lg mt-4 xl:text-2xl">{tokenName}</h2>
        <p className="text-xs opacity-75">{creatorName}</p>
        <p className="text-xs opacity-75">{tokenDescription}</p>

        <div className="mt-4">
          <MintZora1155
            contractAddress={props.contractAddress as `0x${string}`}
            tokenId={+props.tokenId}
            chain={props.chain}
            mintQuantity={1}
          />
        </div>
      </div>
    </div>
  );
};

export default Zora1155TokenDetails;
