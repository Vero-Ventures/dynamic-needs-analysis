"use server";

import { createClient } from "@/lib/supabase/server";
import { ownsClientProcedure } from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import { createBeneficiarySchema } from "./schema";

export const createBeneficiary = ownsClientProcedure
  .createServerAction()
  .input(createBeneficiarySchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("beneficiaries").insert(input);
    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the beneficiary to the database"
      );
    }
    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
