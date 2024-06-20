import { isProd } from "@/constants";

export const parseURI = (uri: string) => {
  const trimmedResponse = uri.slice(29);
  // decode base64 to string
  const obj = Buffer.from(trimmedResponse, "base64");
  const data = JSON.parse(obj.toString()); // Convert Buffer to string before parsing
  return data;
};

export const zoraMintPageUrl = (contractAddress: string, tokenId?: number) => {
  if (isProd) {
    return `https://zora.co/collect/base:${contractAddress}/${tokenId}`;
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
  tokenId?: number
) => {
  // get baseUrl from router

  return `${baseUrl}/f/${contractAddress}/${tokenId}`;
};
