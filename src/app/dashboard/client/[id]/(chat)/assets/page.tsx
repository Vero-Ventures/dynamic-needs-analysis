import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Assets() {
  const assets = await getAssetsWithBeneficiaries();
  const sb = createClient();
  const { data: businesses } = await sb.from("businesses").select();
  const { data: beneficiaries } = await sb.from("beneficiaries").select();
  if (!assets || !businesses || !beneficiaries) {
    notFound();
  }

  return (
    <div className="p-4">
      <div className="mx-auto mb-5 mt-3 flex max-w-2xl items-center justify-between">
        <Link
          className={cn(buttonVariants())}
          href="/dashboard/client/1/assets/add"
        >
          Add New Asset
        </Link>
      </div>
      <div className="mt-9 space-y-12">
        <AssetsTable assets={assets} businesses={businesses} />
        <BeneficiaryDistributionTable
          assets={assets}
          beneficiaries={beneficiaries}
        />
      </div>
      <div className="mt-4">
        <NetWorthChart assets={assets} />
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
import DeleteItemButton from "@/components/delete-item-button";
import { deleteAsset } from "./actions";
import { cn, formatMoney } from "@/lib/utils";
import { SquarePenIcon } from "lucide-react";
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
import {
  getAssetsWithBeneficiaries,
  type AssetsWithBeneficiaries,
} from "@/data/assets";

function AssetsTable({
  assets,
  businesses,
}: {
  assets: AssetsWithBeneficiaries;
  businesses: Tables<"businesses">[];
}) {
  const totalCurrentValue = calculateTotalCurrentValue(assets, businesses);

  return (
    <Table className="mx-auto max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Current Value ($)</TableHead>
          <TableHead className="text-center">Appreciation Rate (%)</TableHead>
          <TableHead className="text-right"></TableHead>
          <TableHead className="text-right"></TableHead>
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
            <TableCell></TableCell>
            <TableCell></TableCell>
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
            <TableCell>
              <Link
                href={`/dashboard/client/1/assets/edit/${asset.id}`}
                className="hover:cursor-pointer"
              >
                <SquarePenIcon />
              </Link>
            </TableCell>
            <TableCell>
              <DeleteAsset id={asset.id} />
            </TableCell>
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
          <TableCell colSpan={2}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
function DeleteAsset({ id }: { id: number }) {
  const deleteAssetWithBind = deleteAsset.bind(null, id);
  return (
    <form action={deleteAssetWithBind}>
      <DeleteItemButton />
    </form>
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
    <Table className="mx-auto max-w-2xl">
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
