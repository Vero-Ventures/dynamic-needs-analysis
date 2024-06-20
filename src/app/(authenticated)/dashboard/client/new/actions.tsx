"use server";

import { createClient } from "@/lib/supabase/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function addNewClient() {
  const sb = createClient();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
}
