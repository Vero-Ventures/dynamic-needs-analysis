"use server";

import { revalidatePath } from "next/cache";
import type { AddBusinessesFormSchema } from "./add-businesses-form";
import { createClient } from "@/lib/supabase/server";
import type { EditShareholder } from "./types";

export async function addBusiness(
  business: AddBusinessesFormSchema,
  shareholders: EditShareholder[]
) {
  const sb = createClient();
  const { data: addedBusiness } = await sb
    .from("businesses")
    .insert({
      ...business,
    })
    .select()
    .single();
  if (!addedBusiness) {
    throw new Error();
  }

  const shareholdersWithBusinessId = shareholders.map((s) => {
    return {
      ...s,
      business_id: addedBusiness.id,
    };
  });
  await sb.from("shareholders").upsert(shareholdersWithBusinessId);
  revalidatePath("/dashboard/client/[id]/businesses", "page");
}

export async function deleteBusiness(id: number) {
  const sb = createClient();
  await sb.from("businesses").delete().eq("id", id);
  revalidatePath("/dashboard/client/[id]/businesses", "page");
}
