import Heading from "@/components/heading";
import TotalInsurableNeedsTable from "./total-insurable-needs-table";
import { createClient } from "@/lib/supabase/server";
import { calculateInsuredIncomeAmount } from "@/lib/client/utils";
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
import KeyPersonTable from "./key-person-table";
import ShareholderTable from "./shareholder-table";
import {
  calculateFinalEbitdaContribution,
  calculateFinalShareValue,
} from "@/lib/businesses/utils";

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

  const { data: assets, error: assetError } = await sb
    .from("assets")
    .select(`*, asset_beneficiaries(*, beneficiaries(*))`)
    .eq("client_id", clientId);

  if (assetError) throw assetError;

  const { data: beneficiaries, error: beneficiaryError } = await sb
    .from("beneficiaries")
    .select()
    .eq("client_id", clientId);

  if (beneficiaryError) {
    throw beneficiaryError;
  }

  const { data: business, error: businessError } = await sb
    .from("businesses")
    .select("*, shareholders (*), key_people (*)")
    .eq("client_id", clientId);
  if (businessError) throw businessError;

  const insuredIncome = calculateInsuredIncomeAmount(
    client.annual_income,
    client.income_multiplier
  );

  const totalSumGoals = calculateTotalSumGoals(goals);

  const goalShortfall = calculateSurplusShortfall(
    client.liquidity_allocated_towards_goals || 0,
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
      need: Math.abs(goalShortfall),
      priority: 100,
    },
  ];
  return (
    <div className="space-y-6 p-6">
      <section className="space-y-4">
        <Heading variant="h1">Total Insurable Needs</Heading>
        <TotalInsurableNeedsTable data={initialTotalInsurableNeeds} />
      </section>
      <section>
        <Heading variant="h2">Key Person</Heading>
        {business.map((b) => (
          <div key={b.id}>
            <h3 className="text-lg font-bold">{b.name}</h3>
            <KeyPersonTable
              data={b.key_people.map((kp) => ({
                id: kp.id,
                name: kp.name,
                need: calculateFinalEbitdaContribution(b, kp),
                priority: 100,
              }))}
            />
          </div>
        ))}
      </section>
      <section>
        <Heading variant="h2">Shareholders Agreement</Heading>
        {business.map((b) => (
          <div key={b.id}>
            <h3 className="text-lg font-bold">{b.name}</h3>
            <ShareholderTable
              data={b.shareholders.map((s) => ({
                id: s.id,
                name: s.name,
                need: calculateFinalShareValue(b, s),
                priority: 100,
              }))}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
