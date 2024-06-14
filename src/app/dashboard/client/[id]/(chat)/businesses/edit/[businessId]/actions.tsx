"use server";

import { createClient } from "@/lib/supabase/server";
import type { AddBusinessesFormSchema } from "../../add/add-businesses-form";
import { revalidatePath } from "next/cache";
import type { EditShareholder } from "../../add/types";

export async function editBusiness(
  id: number,
  business: AddBusinessesFormSchema,
  shareholders: EditShareholder[]
) {
  const sb = createClient();

  await sb
    .from("businesses")
    .update({
      name: business.name,
      valuation: business.valuation,
      ebitda: business.ebitda,
      term: business.term,
      appreciation_rate: business.appreciation_rate,
    })
    .eq("id", id);

  const shareholdersWithBusinessId = shareholders.map((s) => {
    return {
      ...s,
      business_id: id,
    };
  });

  await sb
    .from("shareholders")
    .upsert(shareholdersWithBusinessId, { ignoreDuplicates: false });

  revalidatePath("/dashboard/client/[id]/businesses", "page");
}
