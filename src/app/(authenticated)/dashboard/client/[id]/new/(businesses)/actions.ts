"use server";

import { createClient } from "@/lib/supabase/server";
import { ownsClientProcedure } from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import { createBusinessSchema } from "./schema";

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
