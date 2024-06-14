export default function Goals({ goals }: { goals: Tables<"goals">[] }) {
  return (
    <section className="mb-8">
      <div className="flex justify-between gap-2">
        <h2 className="mb-2 text-2xl font-bold">Goals</h2>
      </div>
      <AddGoalDialog />
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
import DeleteGoalButton from "@/components/delete-item-button";
import AddGoalDialog from "./add-goal-dialog";
import { deleteGoal } from "./actions";
import type { Tables } from "../../../../../../../types/supabase";

function GoalsTable({ goals }: { goals: Tables<"goals">[] }) {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Amount ($)</TableHead>
          <TableHead>Philanthropic</TableHead>
          <TableHead className="text-right"></TableHead>
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
            <TableCell className="text-right">
              <DeleteGoal id={goal.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function DeleteGoal({ id }: { id: number }) {
  const deleteGoalWithBind = deleteGoal.bind(null, id);
  return (
    <form action={deleteGoalWithBind}>
      <DeleteGoalButton />
    </form>
  );
}
