"use client";

import { useServerAction } from "zsa-react";

import DeleteItemButton from "@/components/delete-item-button";
import { useParams } from "next/navigation";
import { deleteBusiness } from "./actions";
import { toast } from "sonner";

export default function DeleteBusinessButton({ id }: { id: number }) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(deleteBusiness);

  return (
    <DeleteItemButton
      size="icon"
      isPending={isPending}
      onClick={async () => {
        toast.promise(execute({ client_id: clientId, business_id: id }), {
          loading: "Deleting...",
          success: "Business deleted successfully.",
          error: (error) => {
            if (error instanceof Error) return error.message;
          },
        });
      }}
    />
  );
}
