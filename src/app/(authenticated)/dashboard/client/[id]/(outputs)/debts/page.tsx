import DebtsTable from "./debts-table";
import DebtsChart from "./debts-chart";
import { createClient } from "@/lib/supabase/server";
import Heading from "@/components/heading";

export default async function DebtsPage() {
  const sb = await createClient();
  const { data: debts } = await sb.from("debts").select();

  return (
    <section className="px-4">
      <Heading variant="h1">Debts</Heading>
      <DebtsTable debts={debts || []} />
      <div className="mt-14">
        <Heading variant="h2">Debt Value Per Year</Heading>
        <DebtsChart debts={debts || []} />
      </div>
    </section>
  );
}
