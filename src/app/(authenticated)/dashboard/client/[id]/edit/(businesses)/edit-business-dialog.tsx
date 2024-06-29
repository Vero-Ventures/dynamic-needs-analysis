"use client";

import { PenSquareIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { EditBusinessForm } from "./edit-business-form";
import { Business } from "@/types/db";

export default function EditBusinessDialog({
  business,
}: {
  business: Business;
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
      <EditBusinessForm business={business} onCloseDialog={handleCloseDialog} />
    </Dialog>
  );
}
