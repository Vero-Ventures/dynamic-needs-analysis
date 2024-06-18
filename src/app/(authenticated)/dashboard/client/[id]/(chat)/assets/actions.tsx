"use server";

import { revalidatePath } from "next/cache";
import type { AddAssetsFormSchema } from "./add/add-assets-form";
import type { AssetBeneficiary } from "./add/add-assets-stepper";
import { createClient } from "@/lib/supabase/server";

export async function addAsset(
  asset: AddAssetsFormSchema,
  assetBeneficiaries: AssetBeneficiary[]
) {
  const {
    name,
    initialValue: initial_value,
    currentValue: current_value,
    yearAcquired: year_acquired,
    rate,
    term,
    type,
    isTaxable: taxable,
    isLiquid: liquid,
    isToBeSold: to_be_sold,
  } = asset;

  const sb = createClient();
  const { data: addedAsset } = await sb
    .from("assets")
    .insert({
      name,
      initial_value,
      current_value,
      year_acquired,
      rate,
      term,
      type,
      taxable,
      liquid,
      to_be_sold,
    })
    .select()
    .single();
  if (!addedAsset) {
    throw new Error();
  }

  const assetBeneficiariesWithAssetId = assetBeneficiaries.map((b) => {
    return {
      allocation: b.allocation,
      asset_id: addedAsset.id,
      beneficary_id: b.id,
      already_assigned: b.isAssetAssigned,
    };
  });
  await sb.from("asset_beneficiaries").insert(assetBeneficiariesWithAssetId);
  revalidatePath("/dashboard/client/[id]/assets", "page");
}

export async function editAsset(
  id: number,
  asset: AddAssetsFormSchema,
  assetBeneficiaries: AssetBeneficiary[]
) {
  const {
    name,
    initialValue: initial_value,
    currentValue: current_value,
    yearAcquired: year_acquired,
    rate,
    term,
    type,
    isTaxable: taxable,
    isLiquid: liquid,
    isToBeSold: to_be_sold,
  } = asset;

  const sb = createClient();
  await sb
    .from("assets")
    .update({
      name,
      initial_value,
      current_value,
      year_acquired,
      rate,
      term,
      type,
      taxable,
      liquid,
      to_be_sold,
    })
    .eq("id", id);

  const assetBeneficiariesWithAssetId = assetBeneficiaries.map((b) => {
    return {
      allocation: b.allocation,
      asset_id: id,
      beneficary_id: b.id,
      already_assigned: b.isAssetAssigned,
    };
  });
  await sb
    .from("asset_beneficiaries")
    .upsert(assetBeneficiariesWithAssetId, { ignoreDuplicates: false });
  revalidatePath("/dashboard/client/[id]/assets", "page");
}

export async function deleteAsset(id: number) {
  const sb = createClient();
  await sb.from("assets").delete().eq("id", id);
  revalidatePath("/dashboard/client/[id]/assets", "page");
}
