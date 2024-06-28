import { getContractOwner } from "./getContractOwner";
import getL1EnsName from "./getL1EnsName";
import { getTokenCreatorOwnerDisplayName } from "./getTokenCreatorOwnerDisplayName";
import { truncAddr } from "./utilities";

export const getTokenDetailsButtonText = async (
  contractAddress: string,
  chain: string,
  tokenName: string
) => {
  const creatorDisplayName = await getTokenCreatorOwnerDisplayName(
    contractAddress,
    chain
  );
  let nftDetailsButtonText = `${tokenName} by ${creatorDisplayName}`;

  return nftDetailsButtonText;
};
