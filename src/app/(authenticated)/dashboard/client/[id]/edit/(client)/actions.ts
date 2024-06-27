"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ownsClientProcedure } from "@/procedures/auth/actions";
import { editClientSchema } from "./schema";

export const editClient = ownsClientProcedure
  .createServerAction()
  .input(editClientSchema)
  .handler(async ({ input, ctx }) => {
    const sb = await createClient();
    const { error } = await sb
      .from("clients")
      .update({
        name: input.name,
        birth_date: input.birth_date.toISOString(),
        annual_income: input.annual_income,
        expected_retirement_age: input.expected_retirement_age,
        income_multiplier: input.income_multiplier,
        province: input.province,
        kinde_id: ctx.user.id,
      })
      .eq("id", input.client_id);
    if (error) {
      console.log(error);
      throw new Error(
        "Something went wrong with updating the client in the database"
      );
    }

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });
