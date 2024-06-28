"use client";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateWant } from "@/lib/total-needs/utils";
import { formatMoney } from "@/lib/utils";
import { useState } from "react";

interface TotalInsurableNeedsTableData {
  id: number;
  purpose: string;
  need: number;
  priority: number;
}

export default function TotalInsurableNeedsTable({
  data,
}: {
  data: TotalInsurableNeedsTableData[];
}) {
  return (
    <Table className="w-fit">
      <TableHeader>
        <TableRow>
          <TableHead>Purpose</TableHead>
          <TableHead>Need</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Want</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TotalInsurableNeedsTableRow key={item.id} item={item} />
        ))}
      </TableBody>
    </Table>
  );
}

function TotalInsurableNeedsTableRow({
  item,
}: {
  item: TotalInsurableNeedsTableData;
}) {
  const [priority, setPriority] = useState(item.priority);
  return (
    <TableRow key={item.id}>
      <TableCell className="font-medium">{item.purpose}</TableCell>
      <TableCell>{formatMoney(item.need)}</TableCell>
      <TableCell className="flex w-[200px] flex-col gap-2">
        <Slider
          onValueChange={([priority]) => setPriority(priority)}
          defaultValue={[priority]}
          max={100}
          step={1}
        />
        <span className="flex">{priority}%</span>
      </TableCell>
      <TableCell>{formatMoney(calculateWant(item.need, priority))}</TableCell>
    </TableRow>
  );
}
