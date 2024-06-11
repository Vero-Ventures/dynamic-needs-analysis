"use client";

import { DollarSignIcon, HandCoinsIcon } from "lucide-react";
import MoneyCardWithIcon from "./money-card-icon";
import type { TotalItem } from "./total-needs-table";
import { TotalNeedsTable } from "./total-needs-table";
import { calculateWant } from "@/lib/total-needs/utils";
import { useState } from "react";

const initialTotalInsurableNeeds: TotalItem[] = [
  {
    id: 1,
    purpose: "Income Replacement",
    need: 2468888888642.0,
    priority: 100,
  },
  {
    id: 2,
    purpose: "Goal Shortfall",
    need: 0.0,
    priority: 100,
  },
];

export default function TotalNeeds() {
  const [totalInsurableNeeds, setTotalInsurableNeeds] = useState(
    initialTotalInsurableNeeds,
  );

  const totalNeeds = totalInsurableNeeds.reduce((acc, item) => {
    return acc + item.need;
  }, 0);

  const totalWants = totalInsurableNeeds.reduce((acc, item) => {
    return acc + calculateWant(item.need, item.priority);
  }, 0);

  function handleSetPriority(priority: number, id: number) {
    setTotalInsurableNeeds((needs) =>
      needs.map((n) => (n.id === id ? { ...n, priority } : n)),
    );
  }
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <MoneyCardWithIcon
          title="Total Needs"
          icon={<DollarSignIcon className="h-6 w-6 text-muted-foreground" />}
          amount={totalNeeds}
        />
        <MoneyCardWithIcon
          title="Total Wants"
          icon={<HandCoinsIcon className="h-6 w-6 text-muted-foreground" />}
          amount={totalWants}
        />
      </div>
      <div className="px-4 pt-6">
        <TotalNeedsTable
          data={totalInsurableNeeds}
          onSetPriority={handleSetPriority}
        />
      </div>
    </div>
  );
}
