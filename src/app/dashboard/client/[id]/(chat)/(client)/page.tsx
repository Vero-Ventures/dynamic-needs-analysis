import { buttonVariants } from "@/components/ui/button";
import {
  calculateAgeFromDate,
  calculateInsuredIncomeAmount,
  calculateYearsOfActiveIncome,
  findSelectedBracket,
} from "@/lib/client/utils";
import { formatMoney, cn } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ClientPage() {
  const sb = createClient();
  const { data: client } = await sb
    .from("clients")
    .select("*")
    .eq("id", 1)
    .limit(1)
    .single();
  if (!client) {
    notFound();
  }
  const clientAge = calculateAgeFromDate(client.birth_date);
  const taxBracket = findSelectedBracket(client.province, client.annual_income);

  return (
    <div className="p-4">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">Name</h2>
            <p className="text-md font-bold">{client.name}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">Birthdate</h2>
            <p className="text-md font-bold">
              {format(client.birth_date, "PPP")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">Age</h2>
            <p className="text-md font-bold">{clientAge}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">
              Expected Retirement Age
            </h2>
            <p className="text-md font-bold">
              {client.expected_retirement_age}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">
              Years of Active Income
            </h2>
            <p className="text-md font-bold">
              {calculateYearsOfActiveIncome(
                clientAge,
                client.expected_retirement_age
              )}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">Province</h2>
            <p className="text-md font-bold">{client.province}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">
              Annual Income ($)
            </h2>
            <p className="text-md font-bold">
              {formatMoney(client.annual_income)}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">
              Income Multiplier
            </h2>
            <p className="text-md font-bold">{client.income_mutiplier}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">
              Amount Insured for Income ($)
            </h2>
            <p className="text-md font-bold">
              {calculateInsuredIncomeAmount(
                client.annual_income,
                client.income_mutiplier
              )}
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">Tax Bracket</h2>
            <p className="text-md font-bold">
              ${taxBracket.minIncome} and up - {taxBracket.taxRate}%
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex">
        <Link
          href="/dashboard/client/1/edit"
          className={cn(buttonVariants(), "ml-auto")}
        >
          Edit
        </Link>
      </div>
    </div>
  );
}
