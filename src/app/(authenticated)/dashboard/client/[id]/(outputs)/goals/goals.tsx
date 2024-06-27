export default function Goals({ goals }: { goals: Goal[] }) {
  return (
    <section className="mb-8">
      <Heading variant="h2">Goals</Heading>
      <GoalsTable goals={goals} />
    </section>
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
import { formatMoney } from "@/lib/utils";
import { CheckCircle2Icon } from "lucide-react";
import type { Goal } from "@/types/db";
import Heading from "@/components/heading";

function GoalsTable({ goals }: { goals: Goal[] }) {
  return (
    <Table className="w-fit">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Amount ($)</TableHead>
          <TableHead>Philanthropic</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {goals.map((goal) => (
          <TableRow key={goal.name}>
            <TableCell className="w-[200px] font-medium">{goal.name}</TableCell>
            <TableCell>{formatMoney(goal.amount)}</TableCell>
            <TableCell>
              {goal.philanthropic && (
                <CheckCircle2Icon className="mx-auto stroke-green-600" />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
