import {
  getAssetsWithBeneficiaries,
  type AssetsWithBeneficiaries,
} from "@/data/assets";
import Heading from "@/components/heading";

export default async function Assets({ params }: { params: { id: string } }) {
  const clientId = parseInt(params.id);
  const assets = await getAssetsWithBeneficiaries(clientId);
  const sb = await createClient();
  const { data: businesses } = await sb
    .from("businesses")
    .select()
    .eq("client_id", clientId);
  const { data: beneficiaries } = await sb
    .from("beneficiaries")
    .select()
    .eq("client_id", clientId);
  if (!assets || !businesses || !beneficiaries) {
    notFound();
  }

  return (
    <div className="space-y-6 p-6">
      <Heading variant="h1">Assets</Heading>
      <AssetsTable assets={assets} businesses={businesses} />
      <section>
        <Heading variant="h2">Asset Beneficiaries</Heading>
        <BeneficiaryDistributionTable
          assets={assets}
          beneficiaries={beneficiaries}
        />
      </section>
      <div className="mt-14 space-y-10">
        <Heading variant="h2">Net Worth Per Year</Heading>
        <NetWorthChart assets={assets} />
        <Heading variant="h2">Asset Diversification</Heading>
        <DiversificationChart assets={assets} />
      </div>
    </div>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoney } from "@/lib/utils";
import {
  calculateAdditionalMoneyRequired,
  calculateBeneficiaryDistributions,
  calculateFutureValue,
  calculateIdealDistributions,
  calculateTotalAdditionalMoneyRequired,
  calculateTotalCurrentValue,
  calculateTotalFutureValue,
  calculateTotalIdealPercentage,
  calculateTotalPercentage,
} from "@/lib/asset/manager-utils";
import NetWorthChart from "./net-worth-chart";
import DiversificationChart from "./diversification-chart";
import type { Tables } from "../../../../../../../types/supabase";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

function AssetsTable({
  assets,
  businesses,
}: {
  assets: AssetsWithBeneficiaries;
  businesses: Tables<"businesses">[];
}) {
  const totalCurrentValue = calculateTotalCurrentValue(assets, businesses);

  return (
    <Table className="max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Current Value ($)</TableHead>
          <TableHead className="text-center">Appreciation Rate (%)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {businesses.map((business) => (
          <TableRow key={business.id}>
            <TableCell className="text-center font-medium">
              {business.name}
            </TableCell>
            <TableCell className="text-center">
              {formatMoney(business.valuation)}
            </TableCell>
            <TableCell className="text-center">
              {`${business.appreciation_rate}%`}
            </TableCell>
          </TableRow>
        ))}
        {assets.map((asset) => (
          <TableRow key={asset.id}>
            <TableCell className="text-center font-medium">
              {asset.name}
            </TableCell>
            <TableCell className="text-center">
              {formatMoney(asset.current_value)}
            </TableCell>
            <TableCell className="text-center">{`${asset.rate}%`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-center">Total</TableCell>
          <TableCell className="text-center">
            {formatMoney(totalCurrentValue)}
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function BeneficiaryDistributionTable({
  assets,
  beneficiaries,
}: {
  assets: AssetsWithBeneficiaries;
  beneficiaries: Tables<"beneficiaries">[];
}) {
  const beneficiaryDistributions = calculateBeneficiaryDistributions(
    assets,
    calculateFutureValue
  );
  const idealDistributions = calculateIdealDistributions(beneficiaries);
  const additionalMoneyRequired = calculateAdditionalMoneyRequired(
    idealDistributions,
    beneficiaryDistributions
  );
  const totalFutureValue = calculateTotalFutureValue(
    assets,
    calculateFutureValue
  );

  return (
    <Table className="max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Beneficiary</TableHead>
          <TableHead className="text-center">Amount ($)</TableHead>
          <TableHead className="text-center">Parts</TableHead>
          <TableHead className="text-center">
            Ideal Distribution (parts)
          </TableHead>
          <TableHead className="text-center">Additional Required ($)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.keys(beneficiaryDistributions).map((name) => (
          <TableRow key={name}>
            <TableCell className="text-center font-medium">{name}</TableCell>
            <TableCell className="text-center">
              {formatMoney(beneficiaryDistributions[name])}
            </TableCell>
            <TableCell className="text-center">
              {`${(beneficiaryDistributions[name] / totalFutureValue) * 100}`}
            </TableCell>
            <TableCell className="text-center">
              {`${idealDistributions[name]}`}
            </TableCell>
            <TableCell className="text-center">
              {formatMoney(additionalMoneyRequired[name] ?? 0)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-center">Total</TableCell>
          <TableCell className="text-center">
            {formatMoney(totalFutureValue)}
          </TableCell>
          <TableCell className="text-center">
            {calculateTotalPercentage(
              beneficiaryDistributions,
              totalFutureValue
            )}
          </TableCell>
          <TableCell className="text-center">
            {calculateTotalIdealPercentage(idealDistributions)}
          </TableCell>
          <TableCell className="text-center">
            {formatMoney(
              calculateTotalAdditionalMoneyRequired(additionalMoneyRequired)
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
