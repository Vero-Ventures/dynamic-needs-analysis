import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteGoalsAndPhilanthropyButton from "@/components/delete-item-button";
import { CheckCircle2Icon } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import type { Goal } from "@/types/db";
import { createClient } from "@/lib/supabase/server";

export default async function GoalsAndPhilanthropyTable({
  clientId,
}: {
  clientId: number;
}) {
  const sb = await createClient();
  const { data: goals, error } = await sb
    .from("goals")
    .select()
    .eq("client_id", clientId);

  if (error) {
    // handle error
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Goal name</TableHead>
          <TableHead className="text-center">Desired funding amount</TableHead>
          <TableHead className="text-center">Is philanthropic?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {goals?.map((g) => (
          <GoalsAndPhilanthropyTableRow key={g.id} goals={g} />
        ))}
      </TableBody>
    </Table>
  );
}

function GoalsAndPhilanthropyTableRow({ goals }: { goals: Goal }) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">{goals.name}</TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(goals.amount)}
      </TableCell>
      <TableCell className="p-0 text-center">
        {goals.philanthropic && (
          <CheckCircle2Icon className="mx-auto stroke-green-600" />
        )}
      </TableCell>
      <TableCell className="text-right">
        <DeleteGoalsAndPhilanthropyButton size="icon" />
      </TableCell>
    </TableRow>
  );
}
