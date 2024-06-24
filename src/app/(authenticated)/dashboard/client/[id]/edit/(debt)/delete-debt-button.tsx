"use client";

import { useServerAction } from "zsa-react";

import DeleteItemButton from "@/components/delete-item-button";
import { deleteDebt } from "./actions";
import { useParams } from "next/navigation";

export default function DeleteDebtButton({ id }: { id: number }) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(deleteDebt);

  return (
    <DeleteItemButton
      size="icon"
      isPending={isPending}
      onClick={async () => {
        await execute({ client_id: clientId, debt_id: id });
      }}
    />
  );
}
