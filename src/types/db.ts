import type { Tables, TablesInsert } from "./supabase";

export type Client = Tables<"clients">;
export type CreateClient = TablesInsert<"clients">;

export type Asset = Tables<"assets">;

export type AssetBeneficiary = Tables<"asset_beneficiaries">;

export type Beneficiary = Tables<"beneficiaries">;

export type Business = Tables<"businesses">;

export type Debt = Tables<"debts">;

export type Goal = Tables<"goals">;

export type Shareholders = Tables<"shareholders">;
