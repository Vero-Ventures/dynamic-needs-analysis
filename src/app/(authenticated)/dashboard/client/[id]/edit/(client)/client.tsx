import { createClient } from "@/lib/supabase/server";
import { ClientInfoForm } from "./client-info-form";

export default async function Client({ clientId }: { clientId: number }) {
  const sb = await createClient();
  const { data: client, error } = await sb
    .from("clients")
    .select()
    .eq("id", clientId)
    .single();

  if (error) {
    throw error;
  }

  return <ClientInfoForm client={client} />;
}
