export const parseZoraUrl = (url: string) => {
  const urlParts = url.split("/");
  const contractAddress = urlParts[4];
  const tokenId = urlParts[5];

  return { contractAddress, tokenId };
};
