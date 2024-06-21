"use server";

import { createClient } from "@/lib/supabase/server";
import { ownsClientProcedure } from "@/procedures/auth/actions";
import { revalidatePath } from "next/cache";
import { createGoalSchema } from "./schema";

export const createGoal = ownsClientProcedure
  .createServerAction()
  .input(createGoalSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { error } = await sb.from("goals").insert(input);

    if (error) {
      console.error(error.message);
      throw new Error(
        "Something went wrong with adding the goal to the database"
      );
    }

    revalidatePath(`/dashboard/client/new/${input.client_id}`);
  });
