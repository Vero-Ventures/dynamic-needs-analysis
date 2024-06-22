"use server";

import { z } from "zod";
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

export const deleteBeneficiary = ownsClientProcedure
  .createServerAction()
  .input(z.object({ beneficiary_id: z.number() }))
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb
      .from("beneficiaries")
      .delete()
      .eq("id", input.beneficiary_id);
    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with deleting the beneficiary from the database"
      );
    }
    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
