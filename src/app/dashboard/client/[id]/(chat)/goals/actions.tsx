"use server";

import { revalidatePath } from "next/cache";
import { goals } from "@/app/data/db";
import type { AddGoalFormSchema } from "./add-goal-dialog";

export async function addGoal(goal: AddGoalFormSchema) {
  goals.push({
    id: goals.length,
    ...goal,
    philanthropic: goal.philanthropic === "on",
  });
  revalidatePath("/dashboard/client/[id]/goals", "page");
}

export async function deleteGoal(id: number) {
  const i = goals.findIndex((g) => g.id === id);
  if (i === -1) {
    throw new Error("No goal found at this index");
  }
  goals.splice(i, 1);
  revalidatePath("/dashboard/client/[id]/goals", "page");
}
