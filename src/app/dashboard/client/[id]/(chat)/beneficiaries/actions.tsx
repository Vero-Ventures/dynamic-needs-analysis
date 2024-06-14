"use server";

import { revalidatePath } from "next/cache";
import type { AddBeneficiaryFormSchema } from "./add-beneficiary-dialog";
import { createClient } from "@/lib/supabase/server";

export async function addBeneficiary(beneficiary: AddBeneficiaryFormSchema) {
  const { name, allocation } = beneficiary;

  const sb = createClient();
  const { data: addedBeneficiary } = await sb
    .from("beneficiaries")
    .insert({
      name,
      allocation,
    })
    .select()
    .single();
  if (!addedBeneficiary) {
    throw new Error();
  }
  revalidatePath("/dashboard/client/[id]/beneficiaries", "page");
}

export async function editBeneficiary(
  id: number,
  beneficiary: AddBeneficiaryFormSchema
) {
  const { name, allocation } = beneficiary;

  const sb = createClient();
  await sb.from("beneficiaries").update({ name, allocation }).eq("id", id);
  revalidatePath("/dashboard/client/[id]/beneficiaries", "page");
}

export async function deleteBeneficiary(id: number) {
  const sb = createClient();
  await sb.from("beneficiaries").delete().eq("id", id);
  revalidatePath("/dashboard/client/[id]/beneficiaries", "page");
}
