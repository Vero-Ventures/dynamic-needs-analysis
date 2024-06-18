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
    return { error: "User not found.", success: false };
  }
  const kinde_id = agent.id;
  const { error } = await sb.from("clients").insert({ ...client, kinde_id });
  if (error) {
    console.error(error);
    return { error, success: false };
  }
  revalidatePath("/dashboard/clients");
  return { success: true };
}
