"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function AddShareholderDialog({
  onAddShareholder,
}: {
  onAddShareholder: (shareholder: AddShareholderFormSchema) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add new Shareholder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Shareholder</DialogTitle>
        </DialogHeader>
        <AddShareholderForm
          onAddShareholder={onAddShareholder}
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

const addShareholderSchema = z.object({
  name: z.string().trim(),
  sharePercentage: z.coerce.number(),
  insuranceCoverage: z.coerce.number(),
  ebitdaContributionPercentage: z.coerce.number(),
});

export type AddShareholderFormSchema = z.infer<typeof addShareholderSchema>;

function AddShareholderForm({
  setOpen,
  onAddShareholder,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddShareholder: (shareholder: AddShareholderFormSchema) => void;
}) {
  const form = useForm<AddShareholderFormSchema>({
    resolver: zodResolver(addShareholderSchema),
    defaultValues: {
      name: "",
      sharePercentage: 0,
      ebitdaContributionPercentage: 0,
      insuranceCoverage: 0,
    },
  });

  async function onSubmit(values: AddShareholderFormSchema) {
    onAddShareholder(values);
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
                <Input
                  id="name"
                  placeholder="Enter shareholder's name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sharePercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Share Percentage (%)</FormLabel>
              <FormControl>
                <Input id="sharePercentage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insuranceCoverage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance Coverage ($)</FormLabel>
              <FormControl>
                <Input id="insuranceCoverage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ebitdaContributionPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>% EBITDA Contribution</FormLabel>
              <FormControl>
                <Input id="ebitdaContributionPercentage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <FormSubmitButton
            isPending={form.formState.isSubmitting}
            disabled={!form.formState.isDirty || !form.formState.isValid}
            value="Add New Shareholder"
            loadingValue="Adding..."
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
