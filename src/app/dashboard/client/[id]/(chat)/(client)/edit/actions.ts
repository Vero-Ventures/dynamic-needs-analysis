"use server";

import { revalidatePath } from "next/cache";
import type { EditClientFormSchema } from "./edit-client.form";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export async function editClient(
  id: number,
  updatedClient: EditClientFormSchema
) {
  const sb = createClient();
  const { data: client } = await sb
    .from("clients")
    .update(updatedClient)
    .eq("id", id)
    .select()
    .single();

  if (!client) {
    return notFound();
  }

  revalidatePath(`/dashboard/client/${client.id}`);
}
