import DebtsTable from "./debts-table";
import DebtsChart from "./debts-chart";
import { createClient } from "@/lib/supabase/server";

export default async function DebtsPage() {
  const sb = await createClient();
  const { data: debts } = await sb.from("debts").select();

  return (
    <section className="px-4">
      <DebtsTable debts={debts || []} />
      <div className="mt-14">
        <DebtsChart debts={debts || []} />
      </div>
    </section>
  );
}
