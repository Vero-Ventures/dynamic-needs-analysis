"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton({
  value,
  loadingValue,
  isPending,
}: {
  value: string;
  loadingValue: string;
  isPending?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <Button disabled={isPending || pending} type="submit">
      {isPending || pending ? (
        <div className="flex items-center gap-2">
          <Loader2Icon className="animate-spin" />
          <span>{loadingValue}</span>
        </div>
      ) : (
        value
      )}
    </Button>
  );
}
