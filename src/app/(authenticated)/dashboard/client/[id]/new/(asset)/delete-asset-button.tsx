"use client";

import { useServerAction } from "zsa-react";

import DeleteItemButton from "@/components/delete-item-button";
import { useParams } from "next/navigation";
import { deleteAsset } from "./actions";

export default function DeleteAssetButton({ id }: { id: number }) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(deleteAsset);

  return (
    <DeleteItemButton
      size="icon"
      isPending={isPending}
      onClick={async () => {
        await execute({
          client_id: clientId,
          asset_id: id,
        });
      }}
    />
  );
}
