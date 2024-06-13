import { createClient } from "@/lib/supabase/server";
import { debts } from "./db";

export default async function getDebt(id: number) {
  const sb = createClient();
  return debts.at(id);
}
