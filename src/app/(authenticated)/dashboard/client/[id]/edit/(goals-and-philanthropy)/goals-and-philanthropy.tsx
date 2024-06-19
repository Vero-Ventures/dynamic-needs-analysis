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
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { z } from "zod";

const goalsAndPhilanthropySchema = z.object({
  id: z.number(),
  name: z.string().trim(),
  funding_amount: z.coerce.number(),
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
      name: "",
      funding_amount: 0,
      is_philanthropic: false,
      total_liquidity: 0,
      liquid_assets_allocation: 0,
    },
  ]);
  function handleAddGoalsAndPhilanthropy(
    goalsAndPhilanthropy: GoalsAndPhilanthropySchema
  ) {
    setGoalsAndPhilanthropies([
      ...goalsAndPhilanthropies,
      goalsAndPhilanthropy,
    ]);
  }

  function handleDeleteGoalsAndPhilanthropy(id: number) {
    setGoalsAndPhilanthropies(
      goalsAndPhilanthropies.filter((g) => g.id !== id)
    );
  }

  function handleOnChangeGoalsAndPhilanthropy(
    goalsAndPhilanthropy: GoalsAndPhilanthropySchema
  ) {
    setGoalsAndPhilanthropies(
      goalsAndPhilanthropies.map((g) =>
        g.id === goalsAndPhilanthropy.id ? goalsAndPhilanthropy : g
      )
    );
  }
  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Goals & Philanthropy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-9">
        <GoalsAndPhilanthropyTable
          goalsAndPhilanthropies={goalsAndPhilanthropies}
          onChangeGoalsAndPhilanthropy={handleOnChangeGoalsAndPhilanthropy}
          onDeleteGoalsAndPhilanthropy={handleDeleteGoalsAndPhilanthropy}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() =>
            handleAddGoalsAndPhilanthropy({
              id: goalsAndPhilanthropies.length,
              name: "",
              funding_amount: 0,
              is_philanthropic: false,
              total_liquidity: 0,
              liquid_assets_allocation: 0,
            })
          }
          className="my-4 space-x-1 rounded-full border-primary bg-transparent hover:bg-primary hover:text-primary-foreground"
          variant="outline"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Goal</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
