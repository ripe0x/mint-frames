export const isProd = process.env.NEXT_PUBLIC_IS_PROD === "true" ? true : false;
export const BASE_PROVIDER = isProd
  ? process.env.NEXT_PUBLIC_BASE_PROVIDER
  : process.env.NEXT_PUBLIC_ZORA_SEPOLIA_PROVIDER; // TODO: swap for baseSepolia when zora testnet site supports it again

export const SUPPORTED_ZORA_1155_CONTRACT_VERSIONS = ["2.7.0"];
export const SUPPORTED_ZORA_721_CONTRACT_VERSIONS = ["13"];
export const ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY = isProd
  ? "0x04E2516A2c207E84a1839755675dfd8eF6302F0a" // base mainnet https://github.com/ourzora/zora-protocol/blob/main/packages/1155-deployments/addresses/8453.json
  : "0x6d28164C3CE04A190D5F9f0f8881fc807EAD975A"; // zora sepolia
export const CHAIN_ID = isProd ? 8453 : 999999999; // 84532 for base mainnet, 999999999 for zora sepolia
export let L1_PROVIDER = process.env.NEXT_PUBLIC_MAINNET_PROVIDER as string;
export const ZORA_CONTRACT_ERC20_MINTER_ADDRESS =
  "0x777777E8850d8D6d98De2B5f64fae401F96eFF31"; // base
export const OP_ZORA_CONTRACT_FIXED_PRICE_SALE_STRATEGY =
  "0x3678862f04290E565cCA2EF163BAeb92Bb76790C";
