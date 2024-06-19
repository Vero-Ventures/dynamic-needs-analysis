"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ShareholdersTable from "./shareholders-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { z } from "zod";
import { BusinessForm } from "./business-form";

const shareholderSchema = z.object({
  id: z.number(),
  name: z.string(),
  insurance_coverage: z.coerce.number(),
  business_owned: z.coerce.number(),
});

export type ShareholderSchema = z.infer<typeof shareholderSchema>;

export default function Shareholders() {
  const [shareholders, setShareholders] = useState<ShareholderSchema[]>([
    {
      id: 0,
      name: "",
      insurance_coverage: 0,
      business_owned: 0,
    },
  ]);
  function handleAddShareholders(shareholder: ShareholderSchema) {
    setShareholders([...shareholders, shareholder]);
  }

  function handleDeleteShareholder(id: number) {
    setShareholders(shareholders.filter((s) => s.id !== id));
  }

  function handleOnChangeShareholder(shareholder: ShareholderSchema) {
    setShareholders(
      shareholders.map((s) => (s.id === shareholder.id ? shareholder : s))
    );
  }
  return (
    <Card className="mx-auto max-w-3xl border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Businesses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-9">
        <BusinessForm />
        <ShareholdersTable
          shareholders={shareholders}
          onChangeShareholder={handleOnChangeShareholder}
          onDeleteShareholder={handleDeleteShareholder}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() =>
            handleAddShareholders({
              id: shareholders.length,
              name: "",
              insurance_coverage: 0,
              business_owned: 0,
            })
          }
          className="my-4 space-x-1 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
          variant="outline"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Shareholder</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
