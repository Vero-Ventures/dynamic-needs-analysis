import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteGoalsAndPhilanthropyButton from "@/components/delete-item-button";
import type { GoalsAndPhilanthropySchema } from "./goals-and-philanthropy";
import { CheckCircle2Icon } from "lucide-react";
import { formatMoney } from "@/lib/utils";

export default function GoalsAndPhilanthropyTable({
  goalsAndPhilanthropies,
  onDeleteGoalsAndPhilanthropy,
}: {
  goalsAndPhilanthropies: GoalsAndPhilanthropySchema[];
  onDeleteGoalsAndPhilanthropy: (id: number) => void;
}) {
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
        {goalsAndPhilanthropies.map((g) => (
          <GoalsAndPhilanthropyTableRow
            key={g.id}
            goalsAndPhilanthropy={g}
            onDeleteGoalsAndPhilanthropy={onDeleteGoalsAndPhilanthropy}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function GoalsAndPhilanthropyTableRow({
  goalsAndPhilanthropy,
  onDeleteGoalsAndPhilanthropy,
}: {
  goalsAndPhilanthropy: GoalsAndPhilanthropySchema;
  onDeleteGoalsAndPhilanthropy: (id: number) => void;
}) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">
        {goalsAndPhilanthropy.name}
      </TableCell>
      <TableCell className="text-center font-medium">
        {formatMoney(goalsAndPhilanthropy.amount)}
      </TableCell>
      <TableCell className="p-0 text-center">
        {goalsAndPhilanthropy.is_philanthropic && (
          <CheckCircle2Icon className="mx-auto stroke-green-600" />
        )}
      </TableCell>
      <TableCell className="text-right">
        <DeleteGoalsAndPhilanthropyButton
          size="icon"
          onClick={() => onDeleteGoalsAndPhilanthropy(goalsAndPhilanthropy.id)}
        />
      </TableCell>
    </TableRow>
  );
}
