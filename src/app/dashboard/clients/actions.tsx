"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { createClient } from "@/lib/supabase/server";
import type { CreateClient } from "@/types/db";
import { revalidatePath } from "next/cache";

export async function addClient(client: Omit<CreateClient, "kinde_id">) {
  const sb = createClient();
  const { getUser } = await getKindeServerSession();
  const agent = await getUser();
  if (!agent) {
    throw new Error("User not found");
  }
  const kinde_id = agent.id;
  await sb.from("clients").insert({ kinde_id, ...client });
  revalidatePath("/dashboard/clients");
}
