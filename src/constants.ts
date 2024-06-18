export const isProd = process.env.NEXT_PUBLIC_IS_PROD === "true" ? true : false;
export const BASE_PROVIDER = isProd
  ? process.env.NEXT_PUBLIC_BASE_PROVIDER
  : process.env.NEXT_PUBLIC_BASE_SEPOLIA_PROVIDER;

export const SUPPORTED_ZORA_1155_CONTRACT_VERSIONS = ["2.7.0"];
export const SUPPORTED_ZORA_721_CONTRACT_VERSIONS = ["13"];
export const ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY = isProd
  ? "0x04E2516A2c207E84a1839755675dfd8eF6302F0a" // base mainnet https://github.com/ourzora/zora-protocol/blob/main/packages/1155-deployments/addresses/8453.json
  : "0xd34872BE0cdb6b09d45FCa067B07f04a1A9aE1aE"; // base sepolia
export const CHAIN_ID = isProd ? 8453 : 84532;
