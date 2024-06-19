import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import DeleteGoalsAndPhilanthropyButton from "@/components/delete-item-button";
import type { GoalsAndPhilanthropySchema } from "./goals-and-philanthropy";

export default function GoalsAndPhilanthropyTable({
  goalsAndPhilanthropies,
  onChangeGoalsAndPhilanthropy,
  onDeleteGoalsAndPhilanthropy,
}: {
  goalsAndPhilanthropies: GoalsAndPhilanthropySchema[];
  onChangeGoalsAndPhilanthropy: (
    goalsAndPhilanthropy: GoalsAndPhilanthropySchema
  ) => void;
  onDeleteGoalsAndPhilanthropy: (id: number) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Goal name</TableHead>
          <TableHead>Desired funding amount</TableHead>
          <TableHead>Is philanthropic?</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {goalsAndPhilanthropies.map((g) => (
          <GoalsAndPhilanthropyTableRow
            key={g.id}
            goalsAndPhilanthropy={g}
            onChangeGoalsAndPhilanthropy={onChangeGoalsAndPhilanthropy}
            onDeleteGoalsAndPhilanthropy={onDeleteGoalsAndPhilanthropy}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function GoalsAndPhilanthropyTableRow({
  goalsAndPhilanthropy,
  onChangeGoalsAndPhilanthropy,
  onDeleteGoalsAndPhilanthropy,
}: {
  goalsAndPhilanthropy: GoalsAndPhilanthropySchema;
  onChangeGoalsAndPhilanthropy: (
    goalsAndPhilanthropy: GoalsAndPhilanthropySchema
  ) => void;
  onDeleteGoalsAndPhilanthropy: (id: number) => void;
}) {
  return (
    <TableRow>
      <TableCell className="text-center font-medium">
        <Input
          placeholder="Name"
          value={goalsAndPhilanthropy.name}
          onChange={(e) =>
            onChangeGoalsAndPhilanthropy({
              ...goalsAndPhilanthropy,
              name: e.target.value,
            })
          }
        />
      </TableCell>
      <TableCell className="text-center font-medium">
        <Input
          value={goalsAndPhilanthropy.funding_amount}
          onChange={(e) =>
            onChangeGoalsAndPhilanthropy({
              ...goalsAndPhilanthropy,
              funding_amount: e.target.value ? +e.target.value : 0,
            })
          }
        />
      </TableCell>
      <TableCell className="p-0 text-center">
        <Checkbox
          checked={goalsAndPhilanthropy.is_philanthropic}
          onCheckedChange={(checked) =>
            onChangeGoalsAndPhilanthropy({
              ...goalsAndPhilanthropy,
              is_philanthropic:
                typeof checked === "boolean"
                  ? checked
                  : !goalsAndPhilanthropy.is_philanthropic,
            })
          }
        />
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
