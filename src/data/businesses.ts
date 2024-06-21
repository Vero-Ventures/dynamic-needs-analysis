import { createClient } from "@/lib/supabase/server";

export async function getBusinessesWithShareholdersAndKeyPeople() {
  const sb = createClient();
  const { data, error } = await sb
    .from("businesses")
    .select("*, shareholders (*), key_people (*)");
  if (error) throw error;
  return data;
}

export type BusinessesWithShareholdersAndKeyPeople = Awaited<
  ReturnType<typeof getBusinessesWithShareholdersAndKeyPeople>
>;

export async function getSingleBusinessWithShareholdersAndKeyPeople(
  id: number
) {
  const sb = createClient();
  const { data, error } = await sb
    .from("businesses")
    .select("*, shareholders(*)")
    .eq("id", id)
    .limit(1)
    .single();
  if (error) throw error;
  return data;
}
export type SingleBusinessWithShareholdersAndKeyPeople = Awaited<
  ReturnType<typeof getSingleBusinessWithShareholdersAndKeyPeople>
>;
