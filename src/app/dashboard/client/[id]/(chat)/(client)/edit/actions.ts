"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { TablesUpdate } from "../../../../../../../../types/supabase";

export async function editClient(
  id: number,
  updatedClient: TablesUpdate<"clients">
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
