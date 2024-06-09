import Link from "next/link";
import { Button } from "@/components/ui/button";
import DebtsTable from "./debts-table";
import DebtsChart from "./debts-chart";

export default function Debts() {
  return (
    <section className="px-4">
      <div className="mx-auto mb-5 mt-3 flex max-w-2xl items-center justify-between">
        <Link href="/dashboard/clients/1/debts/add" className="my-4">
          <Button>Add New Debt</Button>
        </Link>
      </div>
      <DebtsTable />
      <div className="mt-14">
        <DebtsChart />
      </div>
    </section>
  );
}