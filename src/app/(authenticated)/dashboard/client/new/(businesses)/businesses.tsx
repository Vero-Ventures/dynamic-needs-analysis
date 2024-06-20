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
import type { KeyPersonSchema } from "./key-people";

export interface BusinessWithShareholdersAndKeyPeople
  extends CreateBusinessSchema {
  id: number;
  shareholders: ShareholderSchema[];
  keyPeople: KeyPersonSchema[];
}

export default function Businesses() {
  const [
    businessesWithShareholdersAndKeyPeople,
    setBusinessesWithShareholdersAndKeyPeople,
  ] = useState<BusinessWithShareholdersAndKeyPeople[]>([]);

  function handleAddBusinessesWithShareholdersAndKeyPeople(
    business: CreateBusinessSchema,
    shareholders: ShareholderSchema[],
    keyPeople: KeyPersonSchema[]
  ) {
    setBusinessesWithShareholdersAndKeyPeople([
      ...businessesWithShareholdersAndKeyPeople,
      {
        id: businessesWithShareholdersAndKeyPeople.length,
        ...business,
        shareholders,
        keyPeople,
      },
    ]);
  }
  function handleDeleteBusinessesWithShareholder(id: number) {
    setBusinessesWithShareholdersAndKeyPeople(
      businessesWithShareholdersAndKeyPeople.filter((b) => b.id !== id)
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
          businesses={businessesWithShareholdersAndKeyPeople}
        />
      </CardContent>
      <CardFooter>
        <AddBusinessDialog
          onAddBusinessWithShareholdersAndKeyPeople={
            handleAddBusinessesWithShareholdersAndKeyPeople
          }
        />
      </CardFooter>
    </Card>
  );
}
