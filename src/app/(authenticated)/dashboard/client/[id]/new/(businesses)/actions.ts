"use server";

import { createClient } from "@/lib/supabase/server";
import { ownsClientProcedure } from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import { createBusinessSchema } from "./schema";
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

    revalidatePath(`/dashboard/client/new/${input.client_id}`);
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
    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
