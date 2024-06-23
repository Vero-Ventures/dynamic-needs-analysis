"use server";

import { createClient } from "@/lib/supabase/server";
import { ownsClientProcedure } from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import { createAssetBeneficiarySchema, createAssetSchema } from "./schema";

export const createAsset = ownsClientProcedure
  .createServerAction()
  .input(createAssetSchema.merge(createAssetBeneficiarySchema))
  .handler(async ({ input }) => {
    const { asset_beneficiaries, ...asset } = input;
    const sb = await createClient();
    const { data: addedAsset, error } = await sb
      .from("assets")
      .insert(asset)
      .select("id")
      .single();
    if (!addedAsset || error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the asset to the database"
      );
    }

    const assetBeneficiariesWithAssetId = asset_beneficiaries.map((b) => {
      return {
        ...b,
        asset_id: addedAsset.id,
      };
    });
    await sb.from("asset_beneficiaries").insert(assetBeneficiariesWithAssetId);
    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
