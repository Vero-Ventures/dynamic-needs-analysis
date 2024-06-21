"use server";

import { createServerAction } from "zsa";
import { createClientSchema } from "./schema";
import { createClient } from "@/lib/supabase/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export const createNewClient = createServerAction()
  .input(createClientSchema)
  .handler(async ({ input }) => {
    const sb = await createClient();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return { error: "User not found" };
    }
    const { error } = await sb.from("clients").insert({
      ...input,
      birth_date: input.birth_date.toISOString(),
      kinde_id: user.id,
    });
    if (error) {
      console.error(error.message);
      return {
        error: "Something went wrong with adding the user to the database",
      };
    }
    revalidatePath("/dashboard/clients");
  });
