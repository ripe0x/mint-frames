"use client";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import MintZora1155 from "./MintZora1155";
import { chainIdFromChainLabel } from "@/lib/chainIdFromChainLabel";
import { getTokenCreatorOwnerDisplayName } from "@/lib/getTokenCreatorOwnerDisplayName";
import { useRouter } from "next/navigation";

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

  const [redirectSeconds, setRedirectSeconds] = useState<number>(2);
  const router = useRouter();
  const redirectUrl = `https://zora.co/collect/${props.chain}:${props.contractAddress}/${props.tokenId}`;
  useEffect(() => {
    if (redirectSeconds == 0) {
      router.push(redirectUrl);
      return;
    }

    setTimeout(() => {
      console.log(redirectSeconds);
      setRedirectSeconds((redirectSeconds) => redirectSeconds - 1);
    }, 1000);
  }, [redirectSeconds]);

  return (
    // <div className="bg-black flex flex-col gap-10 p-4 justify-center xl:items-center xl:flex-row text-center xl:text-left ">
    <div className="bg-black flex flex-col gap-2 p-4 justify-center text-center h-full w-full items-center mt-10">
      <div className="h-full w-full">
        <p className="text-center mb-2">
          Redirecting you to zora.co to mint {tokenName}
        </p>

        <p>
          <a href={redirectUrl} className="underline text-bold">
            {redirectUrl}
          </a>
        </p>
      </div>
      {/* <div className="xl:w-1/2">
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
      </div> */}
    </div>
  );
};

export default Zora1155TokenDetails;
