"use client";

import { useServerAction } from "zsa-react";

import DeleteItemButton from "@/components/delete-item-button";
import { useParams } from "next/navigation";
import { deleteShareholder } from "./actions";

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
        await execute({
          client_id: clientId,
          shareholder_id: id,
          business_id: businessId,
        });
      }}
    />
  );
}
