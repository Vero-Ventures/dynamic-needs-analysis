"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoalsAndPhilanthropyTable from "./goals-and-philanthropy-table";
import { useState } from "react";
import { z } from "zod";
import AddGoalsAndPhilanthropyDialog from "./add-goals-and-philanthropy-dialog";

const goalsAndPhilanthropySchema = z.object({
  id: z.number(),
  name: z.string().trim(),
  amount: z.coerce.number(),
  is_philanthropic: z.boolean(),
  total_liquidity: z.coerce.number(),
  liquid_assets_allocation: z.coerce.number(),
});

export type GoalsAndPhilanthropySchema = z.infer<
  typeof goalsAndPhilanthropySchema
>;

export default function GoalsAndPhilanthropy() {
  const [goalsAndPhilanthropies, setGoalsAndPhilanthropies] = useState<
    GoalsAndPhilanthropySchema[]
  >([
    {
      id: 0,
      name: "Red Cross",
      amount: 20000,
      is_philanthropic: true,
      total_liquidity: 0,
      liquid_assets_allocation: 0,
    },
  ]);

  function handleDeleteGoalsAndPhilanthropy(id: number) {
    setGoalsAndPhilanthropies(
      goalsAndPhilanthropies.filter((g) => g.id !== id)
    );
  }

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Goals & Philanthropy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-9">
        <GoalsAndPhilanthropyTable
          goalsAndPhilanthropies={goalsAndPhilanthropies}
          onDeleteGoalsAndPhilanthropy={handleDeleteGoalsAndPhilanthropy}
        />
      </CardContent>
      <CardFooter>
        <AddGoalsAndPhilanthropyDialog />
      </CardFooter>
    </Card>
  );
}
