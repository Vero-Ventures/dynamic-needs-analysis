export type AssetTypes = (typeof ASSET_TYPES)[number];

export const ASSET_TYPES = [
  "Cash",
  "Stocks",
  "Bonds",
  "Real Estate",
  "Mutual Funds",
  "Retirement Account",
  "Crypto",
  "Life Insurance",
] as const;
