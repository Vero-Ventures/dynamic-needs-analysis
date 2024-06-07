export default function Goals() {
  return (
    <section className="mb-8">
      <div className="flex justify-between gap-2">
        <h2 className="mb-2 text-2xl font-bold">Goals</h2>
      </div>
      <GoalDialog />
      <GoalsTable />
    </section>
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
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { goalsData } from "../../data/db";
import DeleteGoalButton from "../../../components/delete-item-button";
import GoalDialog from "./goal-dialog";
import { deleteGoal } from "./actions";

function GoalsTable() {
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
        {goalsData.map((goal) => (
          <TableRow key={goal.name}>
            <TableCell className="w-[200px] font-medium">{goal.name}</TableCell>
            <TableCell>{formatMoney(goal.amount)}</TableCell>
            <TableCell>
              {goal.philanthropic ? (
                <CheckCircle2Icon className="mx-auto stroke-green-600" />
              ) : (
                <XCircleIcon className="mx-auto stroke-red-600" />
              )}
            </TableCell>
            <TableCell className="text-right">
              <DeleteGoal id={goal.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
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
