"use client";

import { useServerAction } from "zsa-react";

import DeleteItemButton from "@/components/delete-item-button";
import { useParams } from "next/navigation";
import { deleteShareholder } from "./actions";
import { toast } from "sonner";

export default function DeleteShareholderButton({
  id,
  businessId,
}: {
  id: number;
  businessId: number;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(deleteShareholder);

  return (
    <DeleteItemButton
      size="icon"
      isPending={isPending}
      onClick={async () => {
        toast.promise(
          execute({
            client_id: clientId,
            shareholder_id: id,
            business_id: businessId,
          }),
          {
            loading: "Deleting...",
            success: "Shareholder deleted successfully.",
            error: (error) => {
              if (error instanceof Error) return error.message;
            },
          }
        );
      }}
    />
  );
}
