"use client";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

interface DeleteItemButtonProps extends ButtonProps {
  isPending?: boolean;
}

export default function DeleteItemButton({
  isPending,
  ...props
}: DeleteItemButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending || isPending}
      variant={pending || isPending ? "default" : "destructive"}
      {...props}
    >
      {pending || isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <Trash2Icon />
      )}
    </Button>
  );
}
