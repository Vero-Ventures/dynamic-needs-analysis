"use client";

import { CircleXIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";

export type Beneficiary = {
  name: string;
  allocation: number;
};
export default function BeneficiariesTable({
  beneficiaries,
  setBeneficiaries,
}: {
  beneficiaries: Beneficiary[];
  setBeneficiaries: React.Dispatch<React.SetStateAction<Beneficiary[]>>;
}) {
  const [totalAllocationPercentage, setTotalAllocationPercentage] = useState(0);
  const [name, setName] = useState("");
  const [allocation, setAllocation] = useState(0);

  const newTotalAllocationPercentage = totalAllocationPercentage + allocation;
  const remainingAllocationPercentage = (100 - totalAllocationPercentage)
    .toFixed(2)
    .replace(/[.,]00$/, "");

  return (
    <Table className="mx-auto max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Allocation (%)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {beneficiaries.map((b) => (
          <BeneficiaryTableRow
            key={b.name}
            name={b.name}
            allocation={b.allocation}
          />
        ))}
        <TableRow>
          <TableCell className="text-center font-medium">
            <Input
              type="text"
              className="w-full border border-x-0 border-t-0 p-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Add New Beneficiary"
            />
          </TableCell>
          <TableCell className="text-center font-medium">
            <Input
              type="number"
              min="0"
              max={remainingAllocationPercentage}
              className="w-full border border-x-0 border-t-0 p-1"
              onChange={(e) => setAllocation(+e.target.value)}
              value={allocation || ""}
              placeholder={`${remainingAllocationPercentage}%`}
            />
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>
            <p className="text-base font-bold">
              Total: <span>{totalAllocationPercentage}%</span>
            </p>
          </TableCell>
          <TableCell></TableCell>
          <TableCell className="text-right">
            <Button
              type="submit"
              disabled={newTotalAllocationPercentage > 100}
              onClick={() => {
                if (newTotalAllocationPercentage > 100) return;

                setTotalAllocationPercentage(
                  +newTotalAllocationPercentage.toFixed(2),
                );
                setBeneficiaries((beneficiaries) => [
                  ...beneficiaries,
                  { name, allocation },
                ]);
                setName("");
                setAllocation(0);
              }}
            >
              Add New Beneficiaries
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function BeneficiaryTableRow({ name, allocation }: Beneficiary) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">{name}</TableCell>
      <TableCell className="text-center font-medium">{allocation}</TableCell>
      <TableCell className="text-right">
        <Button variant="link" className="p-0">
          <CircleXIcon className="text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
