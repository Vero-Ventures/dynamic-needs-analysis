"use server";

import { revalidatePath } from "next/cache";
import { clients } from "@/app/data/db";
import type { EditClientFormSchema } from "./edit-client.form";

export async function editClient(
  id: number,
  updatedClient: EditClientFormSchema,
) {
  clients[id] = { id, ...updatedClient };
  revalidatePath("/dashboard/client/[id]", "page");
}
