"use client";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import React, { useEffect } from "react";
import { useReadContract } from "wagmi";

type Props = {
  contractAddress: `0x${string}`;
  tokenId: number;
  chain: string;
};

const Zora1155TokenDetails = (props: Props) => {
  const [tokenArtUrl, setTokenArtUrl] = React.useState<string | null>(null);
  const [tokenName, setTokenName] = React.useState<string | null>(null);
  const [tokenDescription, setTokenDescription] = React.useState<string | null>(
    null
  );
  const result = useReadContract({
    abi: zoraERC1155Abi,
    address: props.contractAddress,
    functionName: "uri",
    args: [BigInt(props.tokenId)],
  });

  const fetchMetadata = async (tokenUriUrl: string) => {
    const metadata = await fetch(tokenUriUrl);
    const metadataJson = await metadata.json();
    console.log("metadataJson", metadataJson);
    const artworkUrl = metadataJson.image.replace(
      "ipfs://",
      "https://drops.infura-ipfs.io/ipfs/"
    );
    setTokenArtUrl(artworkUrl);
    setTokenName(metadataJson.name);
    setTokenDescription(metadataJson.description);
  };
  useEffect(() => {
    const tokenUriUrl = result.data?.replace(
      "ipfs://",
      "https://drops.infura-ipfs.io/ipfs/"
    );
    if (tokenUriUrl) fetchMetadata(tokenUriUrl);
  }, [result.data]);

  return (
    <div>
      <h1>{tokenName && tokenName}</h1>
      <p>{tokenDescription && tokenDescription}</p>
      {tokenArtUrl && <img src={tokenArtUrl} />}
    </div>
  );
};

export default Zora1155TokenDetails;
