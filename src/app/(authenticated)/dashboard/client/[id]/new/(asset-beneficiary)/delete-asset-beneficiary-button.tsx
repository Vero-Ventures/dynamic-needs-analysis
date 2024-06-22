"use client";

import { useServerAction } from "zsa-react";

import DeleteItemButton from "@/components/delete-item-button";
import { useParams } from "next/navigation";
import { deleteAssetBeneficiary } from "./actions";

export default function DeleteAssetBeneficiaryButton({
  id,
  assetId,
  beneficiaryId,
}: {
  id: number;
  assetId: number;
  beneficiaryId: number;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(deleteAssetBeneficiary);

  return (
    <DeleteItemButton
      size="icon"
      isPending={isPending}
      onClick={async () => {
        await execute({
          client_id: clientId,
          asset_beneficiary_id: id,
          asset_id: assetId,
          beneficiary_id: beneficiaryId,
        });
      }}
    />
  );
}
