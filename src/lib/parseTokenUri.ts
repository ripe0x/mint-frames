const getImageFromTokenURI = (encodedImage: string) => {
  const trimmedResponse = encodedImage.slice(26);

  // convert base64 to string
  const obj = Buffer.from(trimmedResponse, "base64");
  const image = obj.toString("utf-8");

  return image;
};

// returns the tokenURI as a json object
export const parseTokenURI = (tokenURI: string) => {
  const trimmedResponse = tokenURI.slice(29);
  // decode base64 to string
  const obj = Buffer.from(trimmedResponse, "base64");
  const tokenData = JSON.parse(obj.toString()); // Convert Buffer to string before parsing
  return tokenData;
};
