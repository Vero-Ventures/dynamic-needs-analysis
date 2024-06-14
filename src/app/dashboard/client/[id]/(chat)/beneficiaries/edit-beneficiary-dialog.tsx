"use client";

import { SquarePenIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import FormSubmitButton from "@/components/form-submit-button";

export default function EditBeneficiaryDialog({
  id,
  name,
  allocation,
}: {
  id: number;
  name: string;
  allocation: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mx-auto">
        <SquarePenIcon className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Beneficiary</DialogTitle>
        </DialogHeader>
        <EditBeneficiaryForm
          id={id}
          name={name}
          allocation={allocation}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sleep } from "@/lib/utils";
import { editBeneficiary } from "./actions";

const BeneficiarySchema = z.object({
  name: z.string(),
  allocation: z.coerce.number(),
});

export type AddBeneficiaryFormSchema = z.infer<typeof BeneficiarySchema>;

function EditBeneficiaryForm({
  id,
  name,
  allocation,
  setOpen,
}: {
  id: number;
  name: string;
  allocation: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<AddBeneficiaryFormSchema>({
    resolver: zodResolver(BeneficiarySchema),
    defaultValues: {
      name,
      allocation,
    },
  });

  async function onSubmit(values: AddBeneficiaryFormSchema) {
    await sleep(3000);
    await editBeneficiary(id, values);
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
            isPending={form.formState.isSubmitting}
            disabled={!form.formState.isDirty || !form.formState.isValid}
            value="Save Changes"
            loadingValue="Editing..."
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
