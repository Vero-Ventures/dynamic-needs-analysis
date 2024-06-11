"use server";

import { revalidatePath } from "next/cache";
import { AddBeneficiarySchema, beneficiaries } from "@/app/data/db";

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

  beneficiaries.push({
    id: beneficiaries.length,
    name,
    allocation,
  });
  revalidatePath("/dashboard/client/[id]/beneficiaries", "page");
}

export async function deleteBeneficiary(id: number) {
  const i = beneficiaries.findIndex((g) => g.id === id);
  if (i === -1) {
    throw new Error("No beneficiary found at this index");
  }
  beneficiaries.splice(i, 1);
  revalidatePath("/dashboard/client/[id]/beneficiaries", "page");
}
