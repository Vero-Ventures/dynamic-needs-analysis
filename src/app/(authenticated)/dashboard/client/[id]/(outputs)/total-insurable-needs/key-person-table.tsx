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

interface KeyPersonTableData {
  id: number;
  name: string;
  need: number;
  priority: number;
}

export default function KeyPersonTable({
  data,
}: {
  data: KeyPersonTableData[];
}) {
  return (
    <Table className="w-fit">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead>Need</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Want</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <KeyPersonTableRow item={item} key={item.id} />
        ))}
      </TableBody>
    </Table>
  );
}

function KeyPersonTableRow({ item }: { item: KeyPersonTableData }) {
  const [priority, setPriority] = useState(item.priority);
  return (
    <TableRow key={item.id}>
      <TableCell className="w-[200px] font-medium">{item.name}</TableCell>
      <TableCell className="w-[100px]">{formatMoney(item.need)}</TableCell>
      <TableCell className="flex w-[200px] flex-col gap-2">
        <Slider
          onValueChange={([priority]) => setPriority(priority)}
          defaultValue={[priority]}
          max={100}
          step={1}
        />
        <span className="flex">{priority}%</span>
      </TableCell>
      <TableCell className="w-[100px]">
        {formatMoney(calculateWant(item.need, priority))}
      </TableCell>
    </TableRow>
  );
}
