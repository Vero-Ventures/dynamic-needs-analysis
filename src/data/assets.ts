import { createClient } from "@/lib/supabase/server";

export async function getAssetsWithBeneficiaries() {
  const sb = createClient();
  const { data: assets, error } = await sb.from("asset_beneficiaries").select(`
    *,
    asset_id (
     *
    ),
    beneficary_id (
      *
    )
  `);
  if (error) throw error;
  return assets;
}

export type AssetsWithBeneficiaries = Awaited<
  ReturnType<typeof getAssetsWithBeneficiaries>
>;
