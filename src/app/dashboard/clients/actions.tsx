"use server";

import { createClient } from "@/lib/supabase/server";
import type { CreateClient } from "@/types/db";
import { revalidatePath } from "next/cache";

export async function addClient(client: CreateClient) {
  const sb = createClient();
  await sb.from("clients").insert(client);
  revalidatePath("/dashboard/clients");
}
