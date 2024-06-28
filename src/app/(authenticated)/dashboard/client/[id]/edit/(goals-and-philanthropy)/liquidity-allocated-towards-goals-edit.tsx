import { createClient } from "@/lib/supabase/server";
import EditLiquidityAllocatedTowardsGoalsDialog from "./edit-liquidity-allocated-towards-goal-dialog";
import StatCard from "@/components/stat-card";

export default async function LiquidityAllocatedTowardsGoalsEdit({
  clientId,
}: {
  clientId: number;
}) {
  const sb = await createClient();
  const { data: client, error } = await sb
    .from("clients")
    .select("id, liquidity_allocated_towards_goals")
    .eq("id", clientId)
    .single();
  if (error) {
    throw error;
  }
  return (
    <div className="flex w-[300px] flex-col gap-2">
      <StatCard
        description="Liquidity Allocated towards Goals"
        value={(client.liquidity_allocated_towards_goals || 100) + "%"}
      />
      <EditLiquidityAllocatedTowardsGoalsDialog client={client} />
    </div>
  );
}
