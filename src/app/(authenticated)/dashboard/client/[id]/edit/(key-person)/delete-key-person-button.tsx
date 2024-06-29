"use client";

import { useServerAction } from "zsa-react";

import DeleteItemButton from "@/components/delete-item-button";
import { useParams } from "next/navigation";
import { deleteKeyPerson } from "./actions";
import { toast } from "sonner";

export default function DeleteKeyPersonButton({
  id,
  businessId,
}: {
  id: number;
  businessId: number;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(deleteKeyPerson);

  return (
    <DeleteItemButton
      size="icon"
      isPending={isPending}
      onClick={async () => {
        // await execute({
        //   client_id: clientId,
        //   key_person_id: id,
        //   business_id: businessId,
        // });
        toast.promise(
          execute({
            client_id: clientId,
            key_person_id: id,
            business_id: businessId,
          }),
          {
            loading: "Deleting...",
            success: "Key person deleted successfully.",
            error: (error) => {
              if (error instanceof Error) return error.message;
            },
          }
        );
      }}
    />
  );
}
