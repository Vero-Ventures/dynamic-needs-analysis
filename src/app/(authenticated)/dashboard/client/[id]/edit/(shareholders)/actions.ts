"use server";
import {
  ownsBusinessProcedure,
  ownsShareholderProcedure,
} from "@/procedures/auth/actions";
import { createShareholderSchema, editShareholderSchema } from "./schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createShareholder = ownsBusinessProcedure
  .createServerAction()
  .input(createShareholderSchema)
  .handler(async ({ input }) => {
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

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });

export const editShareholder = ownsShareholderProcedure
  .createServerAction()
  .input(editShareholderSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb
      .from("shareholders")
      .update({
        name: input.name,
        share_percentage: input.share_percentage,
        insurance_coverage: input.insurance_coverage,
        business_id: input.business_id,
      })
      .eq("id", input.shareholder_id);

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with updating the shareholder in the database"
      );
    }

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });

export const deleteShareholder = ownsBusinessProcedure
  .createServerAction()
  .input(z.object({ shareholder_id: z.number() }))
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb
      .from("shareholders")
      .delete()
      .match({ id: input.shareholder_id, business_id: input.business_id });
    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with deleting the shareholder from the database"
      );
    }
    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });
