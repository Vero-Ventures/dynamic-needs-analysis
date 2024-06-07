"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function DeleteItemButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant={pending ? "default" : "destructive"}>
      {pending ? <Loader2Icon className="animate-spin" /> : <Trash2Icon />}
    </Button>
  );
}
