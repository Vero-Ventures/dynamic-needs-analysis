import { createClient } from "@/lib/supabase/server";

export async function getAssetsWithBeneficiaries() {
  const sb = await createClient();
  const { data: assets, error } = await sb
    .from("assets")
    .select(`*, asset_beneficiaries(*, beneficiaries(*))`);
  if (error) throw error;
  return assets;
}

export type AssetsWithBeneficiaries = Awaited<
  ReturnType<typeof getAssetsWithBeneficiaries>
>;

export async function getSingleAssetWithBeneficiaries(id: number) {
  const sb = await createClient();
  const { data, error } = await sb
    .from("assets")
    .select(`*, asset_beneficiaries(*, beneficiaries(*))`)
    .eq("id", id)
    .limit(1)
    .single();
  if (error) throw error;
  return data;
}

export type SingleAssetWithBeneficiaries = Awaited<
  ReturnType<typeof getSingleAssetWithBeneficiaries>
>;
export type AssetBeneficiary =
  SingleAssetWithBeneficiaries["asset_beneficiaries"][0];
