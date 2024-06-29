"use client";

import { PenSquareIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import FormSubmitButton from "@/components/form-submit-button";

export default function EditBeneficiaryDialog({
  beneficiary,
}: {
  beneficiary: Beneficiary;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PenSquareIcon className="h-6 w-6 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Beneficiary</DialogTitle>
        </DialogHeader>
        <EditBeneficiaryForm beneficiary={beneficiary} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import type { EditBeneficiary } from "./schema";
import { editBeneficiarySchema } from "./schema";
import { useParams } from "next/navigation";
import { editBeneficiary } from "./actions";
import { useServerAction } from "zsa-react";
import { Beneficiary } from "@/types/db";

function EditBeneficiaryForm({
  setOpen,
  beneficiary,
}: {
  beneficiary: Beneficiary;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(editBeneficiary);

  const form = useForm<EditBeneficiary>({
    resolver: zodResolver(editBeneficiarySchema),
    defaultValues: {
      name: beneficiary.name,
      allocation: beneficiary.allocation,
    },
  });

  async function onSubmit(values: EditBeneficiary) {
    await execute({
      ...values,
      client_id: clientId,
      beneficiary_id: beneficiary.id,
    });
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 pt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allocation</FormLabel>
              <FormControl>
                <Input id="allocation" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <FormSubmitButton
            isPending={isPending || form.formState.isSubmitting}
            value="Save Changes"
            loadingValue="Saving..."
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
