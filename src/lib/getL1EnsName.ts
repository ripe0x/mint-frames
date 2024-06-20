import { l1PublicClient } from "./viemClient";

const getL1EnsName = async (address: `0x${string}` | string) => {
  const l1Ens = await l1PublicClient.getEnsName({
    address: address as `0x${string}`,
  });
  return l1Ens;
};

export default getL1EnsName;
