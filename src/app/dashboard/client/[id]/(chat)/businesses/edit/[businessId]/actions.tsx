"use server";

import type { Shareholder } from "@/app/data/db";
import { businesses } from "@/app/data/db";
import type { AddBusinessesFormSchema } from "../../add/add-businesses-form";
import { revalidatePath } from "next/cache";

export async function editBusiness(
  id: number,
  business: AddBusinessesFormSchema,
  shareholders: Shareholder[]
) {
  const updatedBusiness = {
    id,
    ...business,
    shareholders,
  };
  businesses[id] = updatedBusiness;
  revalidatePath("/dashboard/client/[id]/businesses", "page");
}
