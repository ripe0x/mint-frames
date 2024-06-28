import { getCollectorClient } from "@/lib/zoraClient";
import { MintCosts } from "@zoralabs/protocol-sdk";
import { useEffect, useState } from "react";

export const useGetZora1155MintCosts = (
  contractAddress: `0x${string}`,
  tokenId: number,
  mintQuantity: number,
  chain: string
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<true | false>(false);
  const [data, setData] = useState<MintCosts>();
  const collectorClient = getCollectorClient(chain);
  const getData = async () => {
    const mintCosts = await collectorClient
      .getMintCosts({
        collection: contractAddress,
        tokenId: tokenId,
        quantityMinted: mintQuantity,
        mintType: "1155",
      })
      .catch((error) => {
        throw error;
      });
    return mintCosts;
  };

  useEffect(() => {
    getData()
      .then((data) => {
        setLoading(false);
        setData(data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, [contractAddress, tokenId, mintQuantity]);

  return { loading, error, data };
};
