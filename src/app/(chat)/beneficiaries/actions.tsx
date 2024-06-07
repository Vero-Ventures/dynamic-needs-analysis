"use server";

import { revalidatePath } from "next/cache";
import { AddBeneficiarySchema, beneficiariesData } from "../../data/db";

export async function addBeneficiary(data: FormData) {
  const formData = Object.fromEntries(data.entries());
  const parsed = AddBeneficiarySchema.safeParse(formData);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return { message: "Invalid form data", fields };
  }

  const { name, allocation } = parsed.data;

  beneficiariesData.push({
    id: beneficiariesData.length,
    name,
    allocation,
  });
  revalidatePath("/beneficiaries");
}

export async function deleteBeneficiary(id: number) {
  const i = beneficiariesData.findIndex((g) => g.id === id);
  if (i === -1) {
    throw new Error("No beneficiary found at this index");
  }
  beneficiariesData.splice(i, 1);
  revalidatePath("/beneficiaries");
}
