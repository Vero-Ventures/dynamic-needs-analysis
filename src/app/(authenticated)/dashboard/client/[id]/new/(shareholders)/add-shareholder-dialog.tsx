"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { AddShareholderForm } from "./add-shareholder-form";
import type { BusinessesWithShareholders } from "@/data/businesses";

export default function AddShareholderDialog({
  businesses,
}: {
  businesses: BusinessesWithShareholders;
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
          <span>Add Shareholder</span>
        </Button>
      </DialogTrigger>
      <AddShareholderForm
        businesses={businesses}
        onCloseDialog={handleCloseDialog}
      />
    </Dialog>
  );
}
