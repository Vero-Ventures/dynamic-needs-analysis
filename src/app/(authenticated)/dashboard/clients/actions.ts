"use server";

import { createClientSchema } from "./schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { authProcedure } from "@/procedures/auth/actions";

export const createNewClient = authProcedure
  .createServerAction()
  .input(createClientSchema)
  .handler(async ({ input, ctx }) => {
    const sb = await createClient();
    const { error } = await sb.from("clients").insert({
      ...input,
      birth_date: input.birth_date.toISOString(),
      kinde_id: ctx.user.id,
    });

    if (error) {
      console.log(error);
      throw new Error(
        "Something went wrong with adding the client to the database"
      );
    }

    revalidatePath("/dashboard/clients");
  });
