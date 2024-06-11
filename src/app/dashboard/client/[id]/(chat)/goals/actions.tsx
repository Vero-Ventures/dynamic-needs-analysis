"use server";

import { revalidatePath } from "next/cache";
import { addGoalSchema, goals } from "@/app/data/db";

export async function addGoal(data: FormData) {
  const formData = Object.fromEntries(data.entries());
  const parsed = addGoalSchema.safeParse(formData);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return { message: "Invalid form data", fields };
  }

  const { name, amount, philanthropic } = parsed.data;

  goals.push({
    id: goals.length,
    name,
    amount,
    philanthropic: philanthropic === "on",
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
