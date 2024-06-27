import { createClient } from "@/lib/supabase/server";
import Goals from "./goals";
import Liquidity from "./liquidity";
import Heading from "@/components/heading";

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
    <section className="space-y-8 p-6">
      <Heading variant="h1">Goals & Philanthropy</Heading>
      <Goals goals={goals || []} />
      <Liquidity
        goals={goals || []}
        assets={assets || []}
        liquidityToGoalsPercent={client?.liquidity_allocated_towards_goals || 0}
      />
    </section>
  );
}
