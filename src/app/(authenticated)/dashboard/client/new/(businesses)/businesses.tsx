"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BusinessesTable from "./businesses-table";
import AddBusinessDialog from "./add-business-dialog";
import { useState } from "react";
import type { CreateBusinessSchema } from "./add-business-form";
import type { ShareholderSchema } from "./shareholders";

export interface BusinessWithShareholders extends CreateBusinessSchema {
  id: number;
  shareholders: ShareholderSchema[];
}

export default function Businesses() {
  const [businessesWithShareholders, setBusinessesWithShareholders] = useState<
    BusinessWithShareholders[]
  >([]);
  function handleAddBusinessesWithShareholder(
    business: CreateBusinessSchema,
    shareholders: ShareholderSchema[]
  ) {
    setBusinessesWithShareholders([
      ...businessesWithShareholders,
      {
        id: businessesWithShareholders.length,
        ...business,
        shareholders,
      },
    ]);
  }
  function handleDeleteBusinessesWithShareholder(id: number) {
    setBusinessesWithShareholders(
      businessesWithShareholders.filter((b) => b.id !== id)
    );
  }
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Businesses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BusinessesTable
          onDeleteBusinessWithShareholder={
            handleDeleteBusinessesWithShareholder
          }
          businesses={businessesWithShareholders}
        />
      </CardContent>
      <CardFooter>
        <AddBusinessDialog
          onAddBusinessWithShareholder={handleAddBusinessesWithShareholder}
        />
      </CardFooter>
    </Card>
  );
}
