export default function BeneficiaryShare() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <StatCard value="$0M" description="Disparity" />
        <StatCard value="$0M" description="Amount of liquidity needed" />
      </div>
      <BeneficiaryShareTable />
    </div>
  );
}

function StatCard({
  value,
  description,
}: {
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-muted p-2">
      <div className="space-y-1 p-4">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm">{description}</div>
      </div>
    </div>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const beneficiaries = [
  {
    beneficiary: "Charlie",
    totalShare: "$80MM",
    sharePercentage: "33%",
  },
  {
    beneficiary: "Frank",
    totalShare: "$80MM",
    sharePercentage: "33%",
  },
  {
    beneficiary: "Dennis",
    totalShare: "$80MM",
    sharePercentage: "33%",
  },
];

export function BeneficiaryShareTable() {
  return (
    <Table className="w-[470px]">
      <TableHeader>
        <TableRow>
          <TableHead>Beneficiary</TableHead>
          <TableHead>Total Share</TableHead>
          <TableHead>Share Percentage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {beneficiaries.map((b) => (
          <TableRow key={b.beneficiary}>
            <TableCell className="font-semibold">{b.beneficiary}</TableCell>
            <TableCell className="font-semibold">{b.totalShare}</TableCell>
            <TableCell className="font-semibold">{b.sharePercentage}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
