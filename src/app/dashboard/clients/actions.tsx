"use server";

import { createClient } from "@/lib/supabase/server";
import type { CreateClient } from "@/types/db";
import { revalidatePath } from "next/cache";

export async function addClient(client: Omit<CreateClient, "kinde_id">) {
  const sb = createClient();
  // TODO: write query to get kinde_id of the current user
  const kinde_id = "1";
  await sb.from("clients").insert({ kinde_id, ...client });
  revalidatePath("/dashboard/clients");
}
