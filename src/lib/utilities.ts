import { isProd } from "@/constants";

export const parseURI = (uri: string) => {
  const trimmedResponse = uri.slice(29);
  // decode base64 to string
  const obj = Buffer.from(trimmedResponse, "base64");
  const data = JSON.parse(obj.toString()); // Convert Buffer to string before parsing
  return data;
};

export const zoraMintPageUrl = (
  contractAddress: string,

  chain: string,
  tokenId?: number
) => {
  if (isProd) {
    return `https://zora.co/collect/${chain}:${contractAddress}/${tokenId}`;
  }
  return `https://testnet.zora.co/collect/zsep:${contractAddress}/${tokenId}`; // TODO: swap for baseSepolia when zora testnet site supports it again
};

export const postCastUrl = (text: string) => {
  return `
  https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`;
};

export const frameUrl = (
  baseUrl: string,
  contractAddress: string,
  chain: string,
  tokenId?: number
) => {
  // get baseUrl from router

  return `${baseUrl}/f/${chain}${contractAddress}/${tokenId}`;
};

export const truncAddr = (address: string, amount: number = 4) =>
  `${address?.slice(0, amount)}...${address?.slice(
    address.length - amount,
    address.length
  )}`;
