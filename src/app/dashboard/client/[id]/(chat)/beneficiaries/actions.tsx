"use server";

import { revalidatePath } from "next/cache";
import { BeneficiarySchema, beneficiariesData } from "@/app/data/db";

export async function addBeneficiary(data: FormData) {
  const formData = Object.fromEntries(data.entries());
  const parsed = BeneficiarySchema.safeParse(formData);
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
  revalidatePath("/dashboard/client/[id]/beneficiaries", "page");
}

export async function editBeneficiary(id: number, data: FormData) {
  const index = beneficiariesData.findIndex((g) => g.id === id);
  if (index === -1) {
    throw new Error("No beneficiary found with this Id");
  }

  const formData = Object.fromEntries(data.entries());
  const parsed = BeneficiarySchema.safeParse(formData);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return { message: "Invalid form data", fields };
  }

  const { name, allocation } = parsed.data;

  beneficiariesData[index] = {
    id,
    name,
    allocation,
  };
  revalidatePath("/dashboard/client/[id]/beneficiaries", "page");
}

export async function deleteBeneficiary(id: number) {
  const i = beneficiariesData.findIndex((g) => g.id === id);
  if (i === -1) {
    throw new Error("No beneficiary found at this index");
  }
  beneficiariesData.splice(i, 1);
  revalidatePath("/dashboard/client/[id]/beneficiaries", "page");
}
