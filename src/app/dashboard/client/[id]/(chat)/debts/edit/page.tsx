import EditDebtForm from "./edit-debt-form";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function EditDebtPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id: debtId } = searchParams;

  const sb = createClient();
  const { data: debt } = await sb
    .from("debts")
    .select("*")
    .eq("id", debtId)
    .single();

  if (!debt) {
    notFound();
  }

  return (
    <div>
      <EditDebtForm defaultFormValues={debt} />
    </div>
  );
}
