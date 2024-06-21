"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import type { CreateBusinessSchema } from "./add-business-form";
import { AddBusinessForm } from "./add-business-form";
import type { ShareholderSchema } from "./shareholders";
import type { KeyPersonSchema } from "./key-people";

export default function AddBusinessDialog({
  onAddBusinessWithShareholdersAndKeyPeople,
}: {
  onAddBusinessWithShareholdersAndKeyPeople: (
    business: CreateBusinessSchema,
    shareholders: ShareholderSchema[],
    keyPeople: KeyPersonSchema[]
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  function handleCloseDialog() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="my-4 space-x-1 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
          variant="outline"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Business</span>
        </Button>
      </DialogTrigger>
      <AddBusinessForm
        onAddBusinessWithShareholdersAndKeyPeople={
          onAddBusinessWithShareholdersAndKeyPeople
        }
        onCloseDialog={handleCloseDialog}
      />
    </Dialog>
  );
}
