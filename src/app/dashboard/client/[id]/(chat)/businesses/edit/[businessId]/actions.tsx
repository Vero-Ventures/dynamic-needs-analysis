"use server";

import { createClient } from "@/lib/supabase/server";
import type { Tables } from "../../../../../../../../../types/supabase";
import type { AddBusinessesFormSchema } from "../../add/add-businesses-form";
import { revalidatePath } from "next/cache";

export async function editBusiness(
  id: number,
  business: AddBusinessesFormSchema,
  shareholders: Omit<Tables<"shareholders">, "created_at">[]
) {
  const sb = createClient();

  await sb
    .from("businesses")
    .update({ ...business, appreciation_rate: business.appreciationRate })
    .eq("id", id);

  await sb.from("shareholders").upsert(shareholders);

  revalidatePath("/dashboard/client/[id]/businesses", "page");
}
