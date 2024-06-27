import { createClient } from "@/lib/supabase/server";
import Goals from "./goals";
import Liquidity from "./liquidity";

export default async function GoalsPage({
  params,
}: {
  params: { id: string };
}) {
  const clientId = parseInt(params.id);
  const sb = await createClient();
  const { data: goals } = await sb
    .from("goals")
    .select()
    .eq("client_id", clientId);
  const { data: assets } = await sb
    .from("assets")
    .select()
    .eq("client_id", clientId);
  const { data: client } = await sb
    .from("clients")
    .select("liquidity_allocated_towards_goals")
    .eq("id", clientId)
    .single();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-3xl font-bold">Goals & Philanthropy</h1>
      <Goals goals={goals || []} />
      <Liquidity
        goals={goals || []}
        assets={assets || []}
        liquidityToGoalsPercent={client?.liquidity_allocated_towards_goals || 0}
      />
    </div>
  );
}
