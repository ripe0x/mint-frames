import { getCollectorClient } from "@/lib/zoraClient";
import { useEffect, useState } from "react";
import { SimulateContractParameters } from "viem";
import { Account } from "viem/accounts";
import { useAccount } from "wagmi";

type ZoraMintParameters = SimulateContractParameters<
  any,
  any,
  any,
  any,
  any,
  `0x${string}` | Account
>;

export const useGetZora1155MintParameters = (
  contractAddress: `0x${string}`,
  tokenId: number,
  mintQuantity: number,
  chain: string
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<true | false>(false);
  const [data, setData] = useState<ZoraMintParameters>();
  const account = useAccount();
  const collectorClient = getCollectorClient(chain);
  const getData = async () => {
    const { parameters } = await collectorClient
      .mint({
        tokenContract: contractAddress,
        mintType: "1155",
        tokenId: tokenId,
        quantityToMint: mintQuantity,
        mintReferral: process.env
          .NEXT_PUBLIC_ZORA_MINT_REFERRAL_ADDRESS as `0x${string}`,
        minterAccount: account.address as `0x${string}`,
      })
      .catch((error) => {
        throw error;
      });
    return parameters;
  };

  useEffect(() => {
    getData()
      .then((data) => {
        setLoading(false);
        setData(data as ZoraMintParameters);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, [contractAddress, tokenId, mintQuantity]);

  return { loading, error, data };
};
