"use client";

import { useServerAction } from "zsa-react";

import DeleteItemButton from "@/components/delete-item-button";
import { useParams } from "next/navigation";
import { deleteAsset } from "./actions";
import { toast } from "sonner";

export default function DeleteAssetButton({ id }: { id: number }) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(deleteAsset);

  return (
    <DeleteItemButton
      size="icon"
      isPending={isPending}
      onClick={async () => {
        toast.promise(execute({ client_id: clientId, asset_id: id }), {
          loading: "Deleting...",
          success: "Asset deleted successfully.",
          error: (error) => {
            if (error instanceof Error) return error.message;
          },
        });
      }}
    />
  );
}
