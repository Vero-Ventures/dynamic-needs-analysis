"use server";
import { ownsBusinessProcedure } from "@/procedures/auth/actions";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { createKeyPersonSchema } from "./schema";

export const createKeyPerson = ownsBusinessProcedure
  .createServerAction()
  .input(createKeyPersonSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("key_people").insert(input);

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the key person to the database"
      );
    }

    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
