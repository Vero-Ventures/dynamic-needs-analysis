"use server";

import { revalidatePath } from "next/cache";
import { assets } from "@/app/data/db";
import type { AddAssetsFormSchema } from "./add/add-assets-form";
import type { AssetBeneficiary } from "./add/add-assets-stepper";

export async function addAsset(
  asset: AddAssetsFormSchema,
  assetBeneficiaries: AssetBeneficiary[]
) {
  const newAsset = {
    id: assets.length,
    ...asset,
    assetBeneficiaries,
  };
  assets.push(newAsset);
  revalidatePath("/dashboard/client/[id]/assets", "page");
}

export async function editAsset(
  id: number,
  asset: AddAssetsFormSchema,
  assetBeneficiaries: AssetBeneficiary[]
) {
  const updatedAsset = {
    id,
    ...asset,
    assetBeneficiaries,
  };
  assets[id] = updatedAsset;
  revalidatePath("/dashboard/client/[id]/assets", "page");
}

export async function deleteAsset(id: number) {
  const i = assets.findIndex((a) => a.id === id);
  if (i === -1) {
    throw new Error("No asset found at this index");
  }
  assets.splice(i, 1);
  revalidatePath("/dashboard/client/[id]/assets", "page");
}
