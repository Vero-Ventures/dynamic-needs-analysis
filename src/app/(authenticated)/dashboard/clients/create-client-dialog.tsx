"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateClientForm } from "./create-client-form";

export default function CreateClientDialog() {
  const [open, setOpen] = useState(false);
  function handleCloseDialog() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Client</Button>
      </DialogTrigger>
      <CreateClientForm onCloseDialog={handleCloseDialog} />
    </Dialog>
  );
}
