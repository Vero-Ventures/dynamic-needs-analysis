import BeneficiaryShare from "./beneficiary-share";

export default function BeneficiariesPage() {
  return (
    <div className="space-y-12 p-4">
      <h1 className="text-3xl font-bold">Beneficiaries</h1>
      <div className="flex gap-16">
        <div className="space-y-8">
          <div>
            <h2 className="mb-4 border-b-2 border-primary pb-4 text-xl font-bold text-primary">
              Assets
            </h2>
            <AssetsOne />
          </div>
          <div>
            <h2 className="mb-4 border-b-2 border-primary pb-4 text-xl font-bold text-primary">
              Beneficiary Share
            </h2>
            <BeneficiaryShare />
          </div>
        </div>
        <div className="rounded-3xl bg-secondary p-10 text-secondary-foreground">
          <div className="flex h-full flex-col justify-center">
            <p className="mb-4 font-semibold">
              Distribute on death the two non active business heirs the balance
              of the real estate, investments, cash and insurance.
            </p>
            <p className="font-semibold">
              Transfer the growth share to the eldest daughter.
            </p>
            <div className="pt-3">
              <div className="mt-4 grid grid-cols-2">
                <div className="space-y-2">
                  <p className="text-5xl font-bold">$77MM</p>
                  <p>Structured in insurance policy</p>
                </div>
                <div className="space-y-2">
                  <p className="text-5xl font-bold">$100MM</p>
                  <p>To top up the cash and investments to equal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 className="mb-4 border-b-2 border-primary pb-4 text-xl font-bold text-primary">
        Assets
      </h2>
      <AssetsTwo />
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

const assetsOne = [
  {
    type: "Family Buisness",
    fmv: "$100MM",
    acb: "$100K",
  },
  {
    type: "Real Estate",
    fmv: "$100MM",
    acb: "$50MM",
  },
  {
    type: "Investments/Cash",
    fmv: "$40MM",
    acb: "$20MM",
  },
];

export function AssetsOne() {
  return (
    <Table className="w-[470px]">
      <TableHeader>
        <TableRow>
          <TableHead>Asset Type</TableHead>
          <TableHead>FMV</TableHead>
          <TableHead>ACB</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assetsOne.map((a) => (
          <TableRow key={a.type}>
            <TableCell className="font-semibold">{a.type}</TableCell>
            <TableCell className="font-semibold">{a.fmv}</TableCell>
            <TableCell className="font-semibold">{a.acb}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const assetsTwo = [
  {
    type: "Cash & Fixed Income",
    value: "$10M",
    allocation: "",
  },
  {
    type: "Real Estate",
    value: "$10M",
    allocation: "",
  },
  {
    type: "Business Assets",
    value: "$10M",
    allocation: "",
  },
  {
    type: "Equities",
    value: "$10M",
    allocation: "",
  },
];

export function AssetsTwo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset Type</TableHead>
          <TableHead>Asset Value</TableHead>
          <TableHead>Allocation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assetsTwo.map((a) => (
          <TableRow key={a.type}>
            <TableCell className="font-semibold">{a.type}</TableCell>
            <TableCell className="font-semibold">{a.value}</TableCell>
            <TableCell className="font-semibold">{a.allocation}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
