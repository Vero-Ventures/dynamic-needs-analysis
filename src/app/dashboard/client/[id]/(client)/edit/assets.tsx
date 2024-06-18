"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AssetsTable from "./assets-table";

export default function Assets() {
  return (
    <Card className="mx-auto max-w-3xl border-none bg-secondary">
      <CardHeader>
        <CardTitle className="mt-3 text-center font-bold">Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <AssetsTable
          assets={[
            {
              id: 1,
              created_at: "2024-06-14T00:11:55.309875+00:00",
              name: "Emergency Fund",
              initial_value: 10000,
              current_value: 10500,
              year_acquired: 2021,
              rate: 1,
              term: 1,
              type: "Cash",
              taxable: true,
              liquid: true,
              to_be_sold: false,
              asset_beneficiaries: [
                {
                  id: 1,
                  asset_id: 1,
                  allocation: 60,
                  created_at: "2024-06-14T00:11:55.309875+00:00",
                  beneficary_id: 1,
                  beneficiaries: {
                    id: 1,
                    name: "Alice Smith",
                    allocation: 50,
                    created_at: "2024-06-14T00:11:55.309875+00:00",
                  },
                  already_assigned: true,
                },
              ],
            },
          ]}
          businesses={[
            {
              appreciation_rate: 0,
              created_at: "2024-06-14T00:11:55.309875+00:00",
              ebitda: 100000,
              id: 1,
              name: "APPL Stock",
              term: 8,
              valuation: 1000000,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
