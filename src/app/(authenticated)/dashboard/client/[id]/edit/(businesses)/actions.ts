"use server";

import { createClient } from "@/lib/supabase/server";
import {
  ownsBusinessProcedure,
  ownsClientProcedure,
} from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import { createBusinessSchema, editBusinessSchema } from "./schema";
import { z } from "zod";

export const createBusiness = ownsClientProcedure
  .createServerAction()
  .input(createBusinessSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("businesses").insert(input);

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the business to the database"
      );
    }

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });

export const editBusiness = ownsBusinessProcedure
  .createServerAction()
  .input(editBusinessSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb
      .from("businesses")
      .update({
        name: input.name,
        valuation: input.valuation,
        ebitda: input.ebitda,
        term: input.term,
        appreciation_rate: input.appreciation_rate,
      })
      .match({ id: input.business_id, client_id: input.client_id });

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with updating the business in the database"
      );
    }

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });

export const deleteBusiness = ownsClientProcedure
  .createServerAction()
  .input(z.object({ business_id: z.number() }))
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb
      .from("businesses")
      .delete()
      .match({ id: input.business_id, client_id: input.client_id });
    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with deleting the business from the database"
      );
    }
    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });
