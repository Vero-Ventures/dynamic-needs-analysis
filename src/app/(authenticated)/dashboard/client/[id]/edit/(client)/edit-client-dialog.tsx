"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { EditClientForm } from "./edit-client-form";
import type { Client } from "@/types/db";
import { PencilIcon } from "lucide-react";

export default function EditClientDialog({ client }: { client: Client }) {
  const [open, setOpen] = useState(false);
  function handleCloseDialog() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PencilIcon className="h-4 w-4" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <EditClientForm client={client} onCloseDialog={handleCloseDialog} />
    </Dialog>
  );
}
