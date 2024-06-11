"use server";

import type { Shareholder } from "@/app/data/db";
import { businesses } from "@/app/data/db";
import { revalidatePath } from "next/cache";
import type { AddBusinessesFormSchema } from "./add-businesses-form";

export async function addBusiness(
  business: AddBusinessesFormSchema,
  shareholders: Shareholder[]
) {
  const newBusiness = {
    id: businesses.length,
    ...business,
    shareholders,
  };
  businesses.push(newBusiness);
}

export async function deleteBusiness(id: number) {
  const i = businesses.findIndex((s) => s.id === id);
  if (i === -1) {
    throw new Error("No shareholders found at this index");
  }
  businesses.splice(i, 1);
  revalidatePath("/dashboard/client/[id]/businesses", "page");
}
