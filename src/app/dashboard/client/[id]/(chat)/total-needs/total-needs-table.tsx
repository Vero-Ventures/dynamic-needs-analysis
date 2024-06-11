"use client";

import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { calculateWant, formatMoney } from "@/lib/utils";

export interface TotalItem {
  id: number;
  purpose: string;
  need: number;
  priority: number;
}

type OnSetPriorityFN = (priority: number, id: number) => void;

export function TotalNeedsTable({
  data,
  onSetPriority,
}: {
  data: TotalItem[];
  onSetPriority: OnSetPriorityFN;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Purpose</TableHead>
          <TableHead>Need</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead className="w-[400px] text-right">Want</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((need) => (
          <TotalNeedsTableRow
            onSetPriority={onSetPriority}
            key={need.purpose}
            need={need}
          />
        ))}
      </TableBody>
    </Table>
  );
}

function TotalNeedsTableRow({
  need,
  onSetPriority,
}: {
  need: TotalItem;
  onSetPriority: OnSetPriorityFN;
}) {
  return (
    <TableRow key={need.purpose}>
      <TableCell className="font-medium">{need.purpose}</TableCell>
      <TableCell>{formatMoney(need.need)}</TableCell>
      <TableCell className="flex flex-col gap-2">
        <Slider
          onValueChange={([priority]) => onSetPriority(priority, need.id)}
          defaultValue={[need.priority]}
          max={100}
          step={1}
        />
        <span className="flex">{need.priority}%</span>
      </TableCell>
      <TableCell className="text-right">
        {formatMoney(calculateWant(need.need, need.priority))}
      </TableCell>
    </TableRow>
  );
}
