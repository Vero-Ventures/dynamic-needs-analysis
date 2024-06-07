"use server";

import { revalidatePath } from "next/cache";
import { goalsData } from "./data";

export async function addGoalAction(formData: FormData) {
  console.log(formData);
  const name = formData.get("name") as string;
  const amount = Number(formData.get("amount") as string);
  const philanthropic =
    (formData.get("philanthropic") as string) === "on" ? true : false;

  const newGoal = {
    id: goalsData.length,
    name,
    amount,
    philanthropic,
  };

  goalsData.push(newGoal);
  revalidatePath("/goals");
}

export async function deleteGoalAction(id: number) {
  const i = goalsData.findIndex((g) => g.id === id);
  if (i === -1) {
    throw new Error("No goal found at this index");
  }
  goalsData.splice(i, 1);
  revalidatePath("/goals");
}
