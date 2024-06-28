import Heading from "@/components/heading";
import TotalInsurableNeedsTable from "./total-insurable-needs-table";
import { createClient } from "@/lib/supabase/server";
import { calculateInsuredIncomeAmount } from "@/lib/client/utils";
import { useMemo } from "react";
import {
  calculateSurplusShortfall,
  calculateTotalSumGoals,
} from "@/lib/goals/utils";
import {
  calculateAdditionalMoneyRequired,
  calculateBeneficiaryDistributions,
  calculateFutureValue,
  calculateIdealDistributions,
  calculateTotalAdditionalMoneyRequired,
  calculateTotalFutureValue,
} from "@/lib/asset/manager-utils";
import { Heading2 } from "lucide-react";
import { getAssetsWithBeneficiaries } from "@/data/assets";

export default async function TotalInsurableNeedsPage({
  params,
}: {
  params: { id: string };
}) {
  const clientId = parseInt(params.id);
  const sb = await createClient();
  const { data: client, error: clientError } = await sb
    .from("clients")
    .select()
    .eq("id", clientId)
    .single();

  if (clientError) {
    throw clientError;
  }

  const { data: goals, error: goalError } = await sb
    .from("goals")
    .select()
    .eq("client_id", clientId);

  if (goalError) {
    throw goalError;
  }
  const assets = await getAssetsWithBeneficiaries(clientId);

  const { data: beneficiaries, error: beneficiaryError } = await sb
    .from("beneficiaries")
    .select()
    .eq("client_id", clientId);

  if (beneficiaryError) {
    throw beneficiaryError;
  }

  const insuredIncome = calculateInsuredIncomeAmount(
    client.annual_income,
    client.income_multiplier
  );

  const totalSumGoals = calculateTotalSumGoals(goals);

  const goalShortfall = calculateSurplusShortfall(
    client.liquidity_allocated_towards_goals || 100,
    totalSumGoals
  );

  const beneficiaryDistributions = calculateBeneficiaryDistributions(
    assets,
    calculateFutureValue
  );

  const idealDistributions = calculateIdealDistributions(beneficiaries);

  const additionalMoneyRequired = calculateAdditionalMoneyRequired(
    idealDistributions,
    beneficiaryDistributions
  );

  const totalAdditionalMoneyRequired = calculateTotalAdditionalMoneyRequired(
    additionalMoneyRequired
  );

  const totalFutureValue = calculateTotalFutureValue(
    assets,
    calculateFutureValue
  );

  const initialTotalInsurableNeeds = [
    {
      id: 1,
      purpose: "Income Replacement",
      need: insuredIncome,
      priority: 100,
    },
    {
      id: 2,
      purpose: "Equalization",
      need: totalAdditionalMoneyRequired,
      priority: 100,
    },
    {
      id: 3,
      purpose: "Debt Future Liability",
      need: totalFutureValue,
      priority: 100,
    },
    {
      id: 4,
      purpose: "Goal Shortfall",
      need: goalShortfall,
      priority: 100,
    },
  ];
  return (
    <section className="space-y-4 p-6">
      <Heading variant="h1">Total Insurable Needs</Heading>
      <TotalInsurableNeedsTable data={initialTotalInsurableNeeds} />
      <Heading variant="h2">Key Person</Heading>
      <Heading variant="h2">Shareholders Agreement</Heading>
    </section>
  );
}
