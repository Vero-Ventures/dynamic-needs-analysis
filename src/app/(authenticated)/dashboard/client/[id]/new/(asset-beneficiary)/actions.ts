import { createClient } from "@/lib/supabase/server";
import { ownsAssetProcedure } from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import { createAssetBeneficiarySchema } from "./schema";

export const createAssetBeneficiary = ownsAssetProcedure
  .createServerAction()
  .input(createAssetBeneficiarySchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("asset_beneficiaries").insert(input);

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the asset beneficiary to the database"
      );
    }

    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
