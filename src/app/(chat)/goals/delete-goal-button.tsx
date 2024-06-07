"use client";

import { Button } from "@/components/ui/button";
import { deleteGoalAction } from "./actions";
import { Trash2Icon } from "lucide-react";

export default function DeleteGoalButton({ id }: { id: number }) {
  return (
    <Button
      onClick={async () => {
        await deleteGoalAction(id);
      }}
      variant="destructive"
    >
      <Trash2Icon />
    </Button>
  );
}
