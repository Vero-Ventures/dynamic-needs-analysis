"use server";

import { createClient } from "@/lib/supabase/server";
import {
  ownsClientProcedure,
  ownsDebtProcedure,
} from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import { createDebtSchema, editDebtSchema } from "./schema";
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

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });

export const editDebt = ownsDebtProcedure
  .createServerAction()
  .input(editDebtSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb
      .from("debts")
      .update({
        name: input.name,
        initial_value: input.initial_value,
        rate: input.rate,
        annual_payment: input.annual_payment,
        year_acquired: input.year_acquired,
        term: input.term,
      })
      .match({ id: input.debt_id, client_id: input.client_id });

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with updating the debt in the database"
      );
    }

    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
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
    revalidatePath(`/dashboard/client/${input.client_id}/edit`);
  });
