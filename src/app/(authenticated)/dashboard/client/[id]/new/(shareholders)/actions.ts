"use server";
import { ownsBusinessProcedure } from "@/procedures/auth/actions";
import { createShareholderSchema } from "./schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const createShareholder = ownsBusinessProcedure
  .createServerAction()
  .input(createShareholderSchema)
  .handler(async ({ input }) => {
    console.log(input);
    const sb = await createClient();
    const { error } = await sb.from("shareholders").insert({
      name: input.name,
      share_percentage: input.share_percentage,
      insurance_coverage: input.insurance_coverage,
      business_id: input.business_id,
    });

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the shareholders to the database"
      );
    }

    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
