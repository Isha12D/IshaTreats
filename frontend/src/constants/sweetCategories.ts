export const SweetCategory = {
  GENERAL: "general",
  PEDA: "peda",
  MILK_BASED: "milk_based",
  HALWA: "halwa",
  BENGALI: "bengali_sweets",
  CAKES: "oven_delights",
  FUSION: "fusion",
  BARFI: "barfi",
  LADDOO: "laddoo",
} as const;

export type SweetCategory =
  (typeof SweetCategory)[keyof typeof SweetCategory];
