"use server";
import { createClient } from "@/lib/supabase/server";
import { ownsAssetProcedure } from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import { createAssetBeneficiarySchema } from "./schema";
import { z } from "zod";

export const createAssetBeneficiary = ownsAssetProcedure
  .createServerAction()
  .input(createAssetBeneficiarySchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("asset_beneficiaries").insert({
      allocation: input.allocation,
      asset_id: input.asset_id,
      beneficiary_id: input.beneficiary_id,
      already_assigned: false,
    });

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the asset beneficiary to the database"
      );
    }

    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });

export const deleteAssetBeneficiary = ownsAssetProcedure
  .createServerAction()
  .input(z.object({ asset_beneficiary_id: z.number() }))
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("asset_beneficiaries").delete().match({
      id: input.asset_beneficiary_id,
      asset_id: input.asset_id,
      beneficiary_id: input.beneficiary_id,
    });
    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with deleting the asset beneficiary from the database"
      );
    }
    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
