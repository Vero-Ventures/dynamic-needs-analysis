import DebtsTable from "./debts-table";
import DebtsChart from "./debts-chart";
import { createClient } from "@/lib/supabase/server";
import Heading from "@/components/heading";

export default async function DebtsPage({
  params,
}: {
  params: { id: string };
}) {
  const clientId = parseInt(params.id);
  const sb = await createClient();
  const { data: debts } = await sb
    .from("debts")
    .select()
    .eq("client_id", clientId);

  return (
    <section className="p-6">
      <Heading variant="h1">Debts</Heading>
      <DebtsTable debts={debts || []} />
      <div className="mt-14">
        <Heading variant="h2">Debt Value Per Year</Heading>
        <DebtsChart debts={debts || []} />
      </div>
    </section>
  );
}
