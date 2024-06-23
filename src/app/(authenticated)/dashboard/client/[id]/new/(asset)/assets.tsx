import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AssetsTable from "./assets-table";
import AddAssetDialog from "./add-asset-dialog";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function Assets({ clientId }: { clientId: number }) {
  const sb = await createClient();
  const { data: beneficiaries, error } = await sb
    .from("beneficiaries")
    .select("id, name, allocation")
    .eq("client_id", clientId);

  if (error) {
    // handle error
  }
  if (!beneficiaries) {
    notFound();
  }

  const assetBeneficiaries = beneficiaries.map((b) => ({
    ...b,
    already_assigned: true,
  }));

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Assets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <AssetsTable clientId={clientId} beneficiaries={beneficiaries} />
      </CardContent>
      <CardFooter>
        <AddAssetDialog beneficiaries={assetBeneficiaries} />
      </CardFooter>
    </Card>
  );
}
