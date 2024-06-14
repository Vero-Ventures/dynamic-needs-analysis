import { createClient } from "@/lib/supabase/server";
import AddBusinessStepper from "./add-business-stepper";
import { notFound } from "next/navigation";

export default async function AddBusinessesPage({
  params,
}: {
  params: { id: string };
}) {
  const sb = createClient();
  const { data: client } = await sb
    .from("clients")
    .select()
    .eq("id", +params.id)
    .limit(1)
    .single();
  if (!client) {
    notFound();
  }
  if (!client) {
    notFound();
  }
  return (
    <div className="space-y-6 p-4">
      <AddBusinessStepper clientName={client.name} />
    </div>
  );
}
