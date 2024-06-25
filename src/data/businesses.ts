import { createClient } from "@/lib/supabase/server";

export async function getBusinessWithShareholders(clientId: number) {
  const sb = await createClient();
  const { data: businesses, error } = await sb
    .from("businesses")
    .select("*, shareholders(*)")
    .eq("client_id", clientId);
  if (error) {
    throw error;
  }
  return businesses;
}

export type BusinessesWithShareholders = Awaited<
  ReturnType<typeof getBusinessWithShareholders>
>;

export async function getBusinessWithKeyPeople(clientId: number) {
  const sb = await createClient();
  const { data: businesses, error } = await sb
    .from("businesses")
    .select("*, key_people(*)")
    .eq("client_id", clientId);
  if (error) {
    throw error;
  }
  return businesses;
}

export type BusinessesWithKeyPeople = Awaited<
  ReturnType<typeof getBusinessWithKeyPeople>
>;

export async function getBusinessesWithShareholdersAndKeyPeople(
  clientId: number
) {
  const sb = await createClient();
  const { data, error } = await sb
    .from("businesses")
    .select("*, shareholders (*), key_people (*)")
    .eq("client_id", clientId);
  if (error) throw error;
  return data;
}

export type BusinessesWithShareholdersAndKeyPeople = Awaited<
  ReturnType<typeof getBusinessesWithShareholdersAndKeyPeople>
>;

export async function getSingleBusinessWithShareholdersAndKeyPeople(
  id: number
) {
  const sb = await createClient();
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
