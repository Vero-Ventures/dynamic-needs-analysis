"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatMoney } from "@/lib/utils";
import type { Client } from "@/types/db";
import EditClientDialog from "./edit-client-dialog";

export function ClientInfoForm({ client }: { client: Client }) {
  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="mt-3 text-4xl font-bold">
          Client Information
        </CardTitle>
        <EditClientDialog client={client} />
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-bold">Name</div>
              <div>{client.name}</div>
            </div>
            <div>
              <div className="font-bold">Birth Date</div>
              <div>{client.birth_date}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-bold">Province</div>
              <div>{client.province}</div>
            </div>
            <div>
              <div className="font-bold">Expected Retirement Age</div>
              <div>{client.expected_retirement_age}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-bold">Annual Income</div>
              <div>{formatMoney(client.annual_income)}</div>
            </div>
            <div>
              <div className="font-bold">Income Replacement Mutiplier</div>
              <div>{client.income_multiplier}</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
