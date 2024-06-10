import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import DebtsTable from "./debts-table";
import DebtsChart from "./debts-chart";
import { cn } from "@/lib/utils";

export default function Debts() {
  return (
    <section className="px-4">
      <div className="mx-auto mb-5 mt-3 flex max-w-2xl items-center justify-between">
        <Link
          href="/dashboard/client/1/debts/add"
          className={cn(buttonVariants(), "my-4")}
        >
          Add New Debt
        </Link>
      </div>
      <DebtsTable />
      <div className="mt-14">
        <DebtsChart />
      </div>
    </section>
  );
}
