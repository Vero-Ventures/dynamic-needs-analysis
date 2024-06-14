import { createClient } from "@/lib/supabase/server";

export async function getAssetsWithBeneficiaries() {
  const sb = createClient();
  const { data: assets, error } = await sb
    .from("assets")
    .select(`*, asset_beneficiaries(*, beneficiaries(*))`);
  if (error) throw error;
  return assets;
}

export type AssetsWithBeneficiaries = Awaited<
  ReturnType<typeof getAssetsWithBeneficiaries>
>;

export async function getSingleAssetWithBeneficiary(id: number) {
  const sb = createClient();
  const { data, error } = await sb
    .from("asset_beneficiaries")
    .select(
      `
    *,
    assets (
     *
    ),
    beneficiaries (
      *
    )
  `
    )
    .eq("id", id)
    .limit(1)
    .single();
  if (error) throw error;
  return data;
}

export type SingleAssetWithBeneficiary = Awaited<
  ReturnType<typeof getSingleAssetWithBeneficiary>
>;
