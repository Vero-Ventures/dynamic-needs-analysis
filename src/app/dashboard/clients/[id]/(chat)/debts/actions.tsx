"use server";

import { revalidatePath } from "next/cache";
import { AddDebtSchema, debtsData } from "@/app/data/db";

export async function addDebt(data: FormData) {
  const formData = Object.fromEntries(data.entries());
  const parsed = AddDebtSchema.safeParse(formData);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return { message: "Invalid form data", fields };
  }

  const {
    name,
    initialValue,
    yearAcquired,
    rate,
    term,
    annualPayment,
    insurableFutureValueDollars,
  } = parsed.data;

  debtsData.push({
    id: debtsData.length,
    name,
    initialValue,
    yearAcquired,
    rate,
    term,
    annualPayment,
    insurableFutureValueDollars,
  });
  revalidatePath("/dashboard/clients/[id]/debts");
}

export async function deleteDebt(id: number) {
  const i = debtsData.findIndex((g) => g.id === id);
  if (i === -1) {
    throw new Error("No debt found at this index");
  }
  debtsData.splice(i, 1);
  revalidatePath("/dashboard/clients/[id]/debts");
}
