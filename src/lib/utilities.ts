export const parseURI = (uri: string) => {
  const trimmedResponse = uri.slice(29);
  // decode base64 to string
  const obj = Buffer.from(trimmedResponse, "base64");
  const data = JSON.parse(obj.toString()); // Convert Buffer to string before parsing
  return data;
};
