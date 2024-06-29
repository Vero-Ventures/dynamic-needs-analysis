"use client";

import { PenSquareIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import type { BusinessesWithKeyPeople } from "@/data/businesses";
import { EditKeyPersonForm } from "./edit-key-people-form";
import { KeyPerson } from "@/types/db";

export default function EditKeyPeopleDialog({
  businesses,
  keyPerson,
}: {
  keyPerson: KeyPerson;
  businesses: BusinessesWithKeyPeople;
}) {
  const [open, setOpen] = useState(false);
  function handleCloseDialog() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PenSquareIcon className="h-6 w-6 hover:cursor-pointer" />
      </DialogTrigger>
      <EditKeyPersonForm
        keyPerson={keyPerson}
        businesses={businesses}
        onCloseDialog={handleCloseDialog}
      />
    </Dialog>
  );
}
