"use server";
import { ownsBusinessProcedure } from "@/procedures/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { createKeyPersonSchema } from "./schema";
import { z } from "zod";

export const createKeyPerson = ownsBusinessProcedure
  .createServerAction()
  .input(createKeyPersonSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("key_people").insert({
      name: input.name,
      ebitda_contribution_percentage: input.ebitda_contribution_percentage,
      insurance_coverage: input.insurance_coverage,
      business_id: input.business_id,
    });

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the key person to the database"
      );
    }

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });

export const deleteKeyPerson = ownsBusinessProcedure
  .createServerAction()
  .input(z.object({ key_person_id: z.number() }))
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb
      .from("key_people")
      .delete()
      .match({ id: input.key_person_id, business_id: input.business_id });
    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with deleting the key person from the database"
      );
    }
    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });
