import { createClient } from "@/lib/supabase/server";
import Goals from "./goals";
import Liquidity from "./liquidity";
import { notFound } from "next/navigation";

export default async function GoalsPage() {
  const sb = createClient();
  const { data: goals } = await sb.from("goals").select();
  const { data: assets } = await sb.from("assets").select();

  if (!goals || !assets) {
    notFound();
  }

  return (
    <>
      <div className="grid gap-4 p-4 xl:grid-cols-2">
        <Goals goals={goals} />
        <Liquidity goals={goals} assets={assets} />
      </div>
    </>
  );
}
