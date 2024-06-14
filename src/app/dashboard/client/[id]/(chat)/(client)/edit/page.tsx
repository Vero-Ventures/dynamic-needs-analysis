import { createClient } from "@/lib/supabase/server";
import EditClientForm from "./edit-client.form";
import { notFound } from "next/navigation";

export default async function EditClientPage() {
  const sb = createClient();
  const { data: client } = await sb
    .from("clients")
    .select()
    .eq("id", 1)
    .limit(1)
    .single();

  if (!client) {
    notFound();
  }

  return (
    <div className="p-4">
      <EditClientForm defaultFormValues={client} />
    </div>
  );
}
