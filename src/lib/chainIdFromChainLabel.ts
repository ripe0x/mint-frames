export const chainIdFromChainLabel = (chainLabel: string) => {
  if (chainLabel === "eth") {
    return 1;
  }
  if (chainLabel === "zora") {
    return 7777777;
  }
  if (chainLabel === "oeth") {
    return 10;
  }
  return 8453;
};
