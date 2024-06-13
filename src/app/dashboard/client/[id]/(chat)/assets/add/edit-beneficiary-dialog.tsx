"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { SquarePenIcon } from "lucide-react";
import type { AssetBeneficiary } from "./add-assets-stepper";

export default function EditBeneficiaryDialog({
  beneficiary,
  onEditBeneficiary,
}: {
  beneficiary: AssetBeneficiary;
  onEditBeneficiary: (updatedBeneficiary: AssetBeneficiary) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SquarePenIcon className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Beneficiary</DialogTitle>
        </DialogHeader>
        <EditBeneficiaryForm
          beneficiary={beneficiary}
          onEditBeneficiary={onEditBeneficiary}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

import FormSubmitButton from "@/components/form-submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EditBeneficiarySchema = z.object({
  allocation: z.coerce.number(),
});

export type EditBeneficiaryFormSchema = z.infer<typeof EditBeneficiarySchema>;

function EditBeneficiaryForm({
  setOpen,
  beneficiary,
  onEditBeneficiary,
}: {
  beneficiary: AssetBeneficiary;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEditBeneficiary: (updatedBeneficiary: AssetBeneficiary) => void;
}) {
  const form = useForm<EditBeneficiaryFormSchema>({
    resolver: zodResolver(EditBeneficiarySchema),
    defaultValues: beneficiary,
  });

  async function onSubmit(values: EditBeneficiaryFormSchema) {
    onEditBeneficiary({ ...beneficiary, ...values });
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 pt-4">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input id="name" placeholder={beneficiary.name} disabled />
          </FormControl>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="allocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allocation (%)</FormLabel>
              <FormControl>
                <Input id="allocation" {...field} />
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
            loadingValue="Saving..."
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
