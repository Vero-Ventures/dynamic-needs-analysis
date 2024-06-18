"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AssetsTable from "./assets-table";
import AddAssetDialog from "./add-asset-dialog";

export default function Assets() {
  return (
    <Card className="mx-auto max-w-3xl border-none bg-secondary">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AssetsTable />
      </CardContent>
      <CardFooter>
        <AddAssetDialog />
      </CardFooter>
    </Card>
  );
}
