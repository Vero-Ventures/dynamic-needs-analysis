"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { createClient } from "@/lib/supabase/server";
import type { CreateClient } from "@/types/db";
import { revalidatePath } from "next/cache";

export async function addClient(client: Omit<CreateClient, "kinde_id">) {
  const sb = await createClient();
  const { getUser } = getKindeServerSession();
  const agent = await getUser();
  if (!agent) {
    throw new Error("User not found");
  }
  const kinde_id = agent.id;
  console.log("KINDE ID", kinde_id);
  console.log("ADD CLIENT", client);
  const { data: clients } = await sb
    .from("clients")
    .insert({ ...client, kinde_id })
    .select();
  console.log("CLIENTS", clients);
  revalidatePath("/dashboard/clients");
}
