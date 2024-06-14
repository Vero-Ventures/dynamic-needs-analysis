"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { EditClientFormSchema } from "./edit-client.form";

export async function editClient(
  id: number,
  updatedClient: EditClientFormSchema
) {
  const sb = createClient();
  const { error } = await sb.from("clients").update(updatedClient).eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/client/${id}`);
}
