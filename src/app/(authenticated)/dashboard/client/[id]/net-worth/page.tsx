import { DropletIcon, FileTextIcon, VaultIcon } from "lucide-react";

export default function NetWorthPage() {
  return (
    <div className="space-y-12 p-4">
      <h1 className="text-3xl font-bold">Net Worth / Estate Tax</h1>
      <div className="grid grid-cols-[430px_minmax(350px,_1fr)] gap-14">
        <div>
          <h2 className="mb-4 border-b-2 border-primary pb-4 text-xl font-bold text-primary">
            Analysis
          </h2>
          <div className="space-y-4">
            <StatCard
              value="$300k"
              description="net worth"
              icon={<VaultIcon className="h-20 w-20 opacity-15" />}
            />
            <StatCard
              value="$75MM"
              description="estimated tax liability at life expectancy on death"
              icon={<FileTextIcon className="h-20 w-20 opacity-15" />}
            />
            <StatCard
              value="$25MM"
              description="liquidity"
              icon={<DropletIcon className="h-20 w-20 opacity-15" />}
            />
          </div>
        </div>
        <div className="grid h-fit grid-cols-2 gap-10 rounded-3xl bg-secondary p-10 text-secondary-foreground">
          <div className="space-y-5">
            <p className="text-sm">
              Invest in a life insurance policy that can provide approximately
            </p>
            <p className="text-6xl font-bold">$50MM</p>
            <p className="">Liquidity on death.</p>
          </div>
          <div className="space-y-3">
            <p className="text-lg font-bold">
              Permanent Joint Last to Die policy.
            </p>
            <p>Whole life or Universal Life</p>
            <ul className="ml-5 list-outside list-disc space-y-3 text-sm font-semibold">
              <li>
                How to structure the policy and which insurance (carriers) need
                to be used
              </li>
              <li>Ownership structure of the policy</li>
              <li>Self insurance i.e., sale of assets, bank financing</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-4 border-b-2 border-primary pb-4 text-xl font-bold text-primary">
          Net Worth Over Time
        </h2>
      </div>
      <div>
        <h2 className="mb-4 border-b-2 border-primary pb-4 text-xl font-bold text-primary">
          Calculated Properties
        </h2>
        <CalculatedPropertiesTable />
      </div>
    </div>
  );
}

function StatCard({
  value,
  description,
  icon,
}: {
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between rounded-2xl bg-muted p-2">
        <div className="p-4">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm">{description}</div>
        </div>
        <div>{icon}</div>
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

const netWorth = [
  {
    asset: "Real Estate",
    totalGrowth: "$200MM (+200%)",
    currentTaxLiability: "$25MM",
    futureTaxLiability: "$33.9MM",
    futureValue: "$382.88M (+283%)",
  },
  {
    asset: "Public Equity",
    totalGrowth: "$200MM (+200%)",
    currentTaxLiability: "$25MM",
    futureTaxLiability: "$33.9MM",
    futureValue: "$382.88M (+283%)",
  },
  {
    asset: "Private Equity",
    totalGrowth: "$200MM (+200%)",
    currentTaxLiability: "$25MM",
    futureTaxLiability: "$33.9MM",
    futureValue: "$382.88M (+283%)",
  },
  {
    asset: "Cash",
    totalGrowth: "$200MM (+200%)",
    currentTaxLiability: "$25MM",
    futureTaxLiability: "$33.9MM",
    futureValue: "$382.88M (+283%)",
  },
  {
    asset: "New Asset",
    totalGrowth: "$200MM (+200%)",
    currentTaxLiability: "$25MM",
    futureTaxLiability: "$33.9MM",
    futureValue: "$382.88M (+283%)",
  },
];
function CalculatedPropertiesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset</TableHead>
          <TableHead>Total Growth</TableHead>
          <TableHead>Current Tax Liability</TableHead>
          <TableHead>Future Tax Liability</TableHead>
          <TableHead>Future Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {netWorth.map((n) => (
          <TableRow key={n.asset}>
            <TableCell className="font-semibold">{n.asset}</TableCell>
            <TableCell className="font-semibold">{n.totalGrowth}</TableCell>
            <TableCell className="font-semibold">
              {n.currentTaxLiability}
            </TableCell>
            <TableCell className="font-semibold">
              {n.futureTaxLiability}
            </TableCell>
            <TableCell className="font-semibold">{n.futureValue}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
