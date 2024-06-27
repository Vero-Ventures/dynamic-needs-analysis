import Heading from "@/components/heading";
import StatCard from "@/components/stat-card";
import {
  calculateAgeFromDate,
  calculateInsuredIncomeAmount,
  calculateYearsOfActiveIncome,
} from "@/lib/client/utils";
import { createClient } from "@/lib/supabase/server";
import { formatMoney } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function IncomeReplacementPage({
  params,
}: {
  params: { id: string };
}) {
  const clientId = parseInt(params.id);
  const sb = await createClient();
  const { data: client, error } = await sb
    .from("clients")
    .select()
    .eq("id", clientId)
    .single();

  if (error) {
    throw error;
  }

  if (!client) {
    return notFound();
  }

  const age = calculateAgeFromDate(new Date(client.birth_date));
  const yearsOfActiveIncome = calculateYearsOfActiveIncome(
    age,
    client.expected_retirement_age
  );
  const amountInsuredForIncome = calculateInsuredIncomeAmount(
    client.annual_income,
    client.income_multiplier
  );

  return (
    <div className="p-4">
      <Heading variant="h1">Income Replacement</Heading>
      <div className="mt-10">
        <div>
          <Heading variant="h2">Client Information</Heading>
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            <StatCard value={`${age}`} description="Age" />
            <StatCard
              value={client.expected_retirement_age.toString()}
              description="Expected Retirement Age"
            />
            <StatCard
              value={yearsOfActiveIncome.toString()}
              description="Years of Active Income"
            />
            <StatCard
              value={formatMoney(client.annual_income)}
              description="Annual Income"
            />
            <StatCard
              value={client.income_multiplier.toString()}
              description="Income Replacement Mutiplier"
            />
            <StatCard
              value={formatMoney(amountInsuredForIncome)}
              description="Amount insured for income"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
