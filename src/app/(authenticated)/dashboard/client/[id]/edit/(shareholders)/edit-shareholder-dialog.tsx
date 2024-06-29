"use client";

import { PenSquareIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import type { BusinessesWithShareholders } from "@/data/businesses";
import { EditShareholderForm } from "./edit-shareholder-form";
import type { Shareholder } from "@/types/db";

export default function EditShareholderDialog({
  businesses,
  shareholder,
}: {
  shareholder: Shareholder;
  businesses: BusinessesWithShareholders;
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
      <EditShareholderForm
        businesses={businesses}
        shareholder={shareholder}
        onCloseDialog={handleCloseDialog}
      />
    </Dialog>
  );
}
