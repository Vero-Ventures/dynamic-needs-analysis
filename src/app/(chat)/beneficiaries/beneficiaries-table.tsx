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

export default function BeneficiariesTable() {
  return (
    <Table className="mx-auto max-w-2xl">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Allocation (%)</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <BeneficiaryTableRow />
        <BeneficiaryTableRow />
        <BeneficiaryTableRow />
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>
            <p className="text-base font-bold">
              Total: <span>100%</span>
            </p>
          </TableCell>
          <TableCell className="text-right">
            <Button type="submit" className="">
              Add New Beneficiaries
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function BeneficiaryTableRow() {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">Jane Doe</TableCell>
      <TableCell className="text-center font-medium">100</TableCell>
      <TableCell className="text-right">
        <Button variant="link" className="p-0">
          <CircleXIcon className="text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
