import { createClient } from "@/lib/supabase/server";

export async function getBusinessesWithShareholders() {
  const sb = createClient();
  const { data, error } = await sb
    .from("businesses")
    .select("*, shareholders (*)");
  if (error) throw error;
  return data;
}

export type BusinessesWithShareholders = Awaited<
  ReturnType<typeof getBusinessesWithShareholders>
>;

export async function getSingleBusinessWithShareholder(id: number) {
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
export type SingleBusinessWithShareholders = Awaited<
  ReturnType<typeof getSingleBusinessWithShareholder>
>;
