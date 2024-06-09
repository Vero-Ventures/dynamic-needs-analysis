"use server";

import { revalidatePath } from "next/cache";
import { AddBusinessSchema, businesses, shareholders } from "@/app/data/db";
import { AddShareholderSchema } from "@/app/data/db";

export async function addShareholder(data: FormData) {
  const formData = Object.fromEntries(data.entries());
  const parsed = AddShareholderSchema.safeParse(formData);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return { message: "Invalid form data", fields };
  }
  const {
    name,
    sharePercentage,
    insuranceCoverage,
    EBITDAPercentContribution,
  } = parsed.data;

  shareholders.push({
    id: shareholders.length,
    name,
    sharePercentage,
    insuranceCoverage,
    EBITDAPercentContribution,
    EBITDAContribution: 0,
    shareValue: 0,
    liquidationDisparity: 0,
  });

  revalidatePath("/businesses/add");
}

export async function deleteShareholder(id: number) {
  const i = shareholders.findIndex((s) => s.id === id);
  if (i === -1) {
    throw new Error("No shareholders found at this index");
  }
  shareholders.splice(i, 1);
  revalidatePath("/businesses/add");
}

export async function addBusiness(data: FormData) {
  const formData = Object.fromEntries(data.entries());
  const parsed = AddBusinessSchema.safeParse(formData);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }
    return { message: "Invalid form data", fields };
  }
  const { name, valuation } = parsed.data;

  businesses.push({
    id: businesses.length,
    name,
    valuation,
  });
}

export async function deleteBusiness(id: number) {
  const i = businesses.findIndex((s) => s.id === id);
  if (i === -1) {
    throw new Error("No shareholders found at this index");
  }
  businesses.splice(i, 1);
  revalidatePath("/businesses");
}
