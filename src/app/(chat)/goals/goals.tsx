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

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { addGoalAction } from "./actions";

export function GoalDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="my-4">Add new Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Goal</DialogTitle>
        </DialogHeader>
        <form action={addGoalAction} id="goal-form" className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Red Cross" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" name="amount" />
          </div>
          <div className="grid grid-cols-4 items-center gap-6">
            <Label htmlFor="amount">Philanthropic:</Label>
            <Switch id="amount" name="philanthropic" />
          </div>
        </form>
        <DialogFooter>
          <Button form="goal-form" type="submit">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
import { goalsData } from "./data";
import DeleteGoalButton from "./delete-goal-button";

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
              <DeleteGoalButton id={goal.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
}
