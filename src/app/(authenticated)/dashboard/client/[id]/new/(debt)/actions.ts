"use server";

import { createClient } from "@/lib/supabase/server";
import { ownsClientProcedure } from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import { createDebtSchema } from "./schema";
import { z } from "zod";

export const createDebt = ownsClientProcedure
  .createServerAction()
  .input(createDebtSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    // TODO: calculate the insurable future value dollars
    const insurable_future_value_dollars = 0;
    const { error } = await sb
      .from("debts")
      .insert({ ...input, insurable_future_value_dollars });

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the debt to the database"
      );
    }

    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });

export const deleteDebt = ownsClientProcedure
  .createServerAction()
  .input(z.object({ debt_id: z.number() }))
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("debts").delete().eq("id", input.debt_id);
    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with deleting the debt from the database"
      );
    }
    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
