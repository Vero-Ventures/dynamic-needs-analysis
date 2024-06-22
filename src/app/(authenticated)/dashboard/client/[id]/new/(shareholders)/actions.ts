import { ownsBusinessProcedure } from "@/procedures/auth/actions";
import { createShareholderSchema } from "./schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const createShareholder = ownsBusinessProcedure
  .createServerAction()
  .input(createShareholderSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("shareholders").insert(input);

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the shareholders to the database"
      );
    }

    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
