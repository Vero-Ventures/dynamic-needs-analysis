"use client";
import StatCard from "@/components/stat-card";
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

export default function TotalInsurableNeedsTable({
  data,
}: {
  data: {
    id: number;
    purpose: string;
    need: number;
    priority: number;
  }[];
}) {
  const [totalInsurableNeeds, setTotalInsurableNeeds] = useState(data);
  const totalNeeds = totalInsurableNeeds.reduce((acc, item) => {
    return acc + item.need;
  }, 0);

  const totalWants = totalInsurableNeeds.reduce((acc, item) => {
    return acc + calculateWant(item.need, item.priority);
  }, 0);

  function handleSetPriority(priority: number, id: number) {
    setTotalInsurableNeeds((needs) =>
      needs.map((n) => (n.id === id ? { ...n, priority } : n))
    );
  }
  return (
    <div>
      <div className="mb-4 grid gap-2 md:grid-cols-2">
        <StatCard description="Total Needs" value={formatMoney(totalNeeds)} />
        <StatCard description="Total Wants" value={formatMoney(totalWants)} />
      </div>
      <Table className="w-fit">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Purpose</TableHead>
            <TableHead>Need</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Want</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {totalInsurableNeeds.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-[200px] font-medium">
                {item.purpose}
              </TableCell>
              <TableCell className="w-[100px]">
                {formatMoney(item.need)}
              </TableCell>
              <TableCell className="flex w-[200px] flex-col gap-2">
                <Slider
                  onValueChange={([priority]) =>
                    handleSetPriority(priority, item.id)
                  }
                  defaultValue={[item.priority]}
                  max={100}
                  step={1}
                />
                <span className="flex">{item.priority}%</span>
              </TableCell>
              <TableCell className="w-[100px]">
                {formatMoney(calculateWant(item.need, item.priority))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
