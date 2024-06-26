export default function Goals({ goals }: { goals: Goal[] }) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 border-b-2 border-primary pb-4 text-xl font-bold text-primary">
        Goals
      </h2>
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
