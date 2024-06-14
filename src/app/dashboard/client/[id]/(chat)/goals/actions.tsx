"use server";

import { revalidatePath } from "next/cache";
import type { AddGoalFormSchema } from "./add-goal-dialog";
import { createClient } from "@/lib/supabase/server";

export async function addGoal(goal: AddGoalFormSchema) {
  const sb = createClient();
  await sb.from("goals").insert({
    ...goal,
    philanthropic: goal.philanthropic === "on",
  });
  revalidatePath("/dashboard/client/[id]/goals", "page");
}

export async function deleteGoal(id: number) {
  const sb = createClient();
  await sb.from("goals").delete().eq("id", id);
  revalidatePath("/dashboard/client/[id]/goals", "page");
}
