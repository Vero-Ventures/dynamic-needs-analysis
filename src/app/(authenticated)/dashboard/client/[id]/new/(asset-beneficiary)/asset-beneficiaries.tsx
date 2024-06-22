import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AssetBeneficiariesTable from "./asset-beneficiaries-table";
import AddAssetBeneficiaryDialog from "./add-asset-beneficiary-dialog";
import { createClient } from "@/lib/supabase/server";

export default async function AssetBeneficiaries({
  clientId,
}: {
  clientId: number;
}) {
  const sb = await createClient();

  const { data: assets, error: assetsError } = await sb
    .from("assets")
    .select(`*, asset_beneficiaries(*, beneficiaries(*))`)
    .eq("client_id", clientId);

  if (assetsError) throw assetsError;

  const { data: beneficiaries, error: beneficiariesError } = await sb
    .from("beneficiaries")
    .select()
    .eq("client_id", clientId);
  if (beneficiariesError) throw beneficiariesError;

  return (
    <Card className="border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Beneficiary Allocation
        </CardTitle>
        <AddAssetBeneficiaryDialog
          assets={assets}
          beneficiaries={beneficiaries}
        />
      </CardHeader>
      <CardContent>
        {assets &&
          assets.map((a) =>
            a.asset_beneficiaries.length > 0 ? (
              <div key={a.id}>
                <h2 className="text-lg font-bold">{a.name}</h2>
                <AssetBeneficiariesTable
                  assetBeneficiaries={a.asset_beneficiaries}
                />
              </div>
            ) : null
          )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
