// https://github.com/vercel/next.js/discussions/50189#discussioncomment-9224262

/**
 * Get the pathname from the metadata state
 * This dives into async storage of promise state to get the pathname
 *
 * This is much more performant that using headers() from next as this doesn't opt out from the cache
 * @param state
 */
export const getPathnameFromMetadataState = (
  state: any
): string | undefined => {
  const res = Object.getOwnPropertySymbols(state || {})
    .map((p) => state[p])
    .find((state) => state?.hasOwnProperty?.("urlPathname"));

  return res?.urlPathname.replace(/\?.+/, "");
};
