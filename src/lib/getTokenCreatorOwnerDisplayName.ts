import { getContractOwner } from "./getContractOwner";
import getL1EnsName from "./getL1EnsName";
import { truncAddr } from "./utilities";

export const getTokenCreatorOwnerDisplayName = async (
  contractAddress: string,
  chain: string
) => {
  const contractOwner = await getContractOwner(contractAddress, chain);

  const creatorEnsName = await getL1EnsName(contractOwner as `0x${string}`);
  let creatorDisplayName = truncAddr(contractOwner as `0x${string}`, 4);
  if (creatorEnsName) {
    creatorDisplayName = creatorEnsName;
  }
  return creatorDisplayName;
};
