import { neynarClient } from "./neynarClient";

export const getFcUsernameFromAddress = async (address: string) => {
  const addr = address;
  const user = await neynarClient.lookupUserByVerification(addr);

  return user.result.user.username ?? null;
};
