"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { AddKeyPersonForm } from "./add-key-people-form";
import type { BusinessesWithKeyPeople } from "@/data/businesses";

export default function AddKeyPeopleDialog({
  businesses,
}: {
  businesses: BusinessesWithKeyPeople;
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
          <span>Add Key Person</span>
        </Button>
      </DialogTrigger>
      <AddKeyPersonForm
        businesses={businesses}
        onCloseDialog={handleCloseDialog}
      />
    </Dialog>
  );
}
