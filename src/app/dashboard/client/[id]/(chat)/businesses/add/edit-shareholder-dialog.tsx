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
import type { Tables } from "../../../../../../../../types/supabase";

export default function EditShareholderDialog({
  shareholder,
  onEditShareholder,
}: {
  shareholder: Omit<
    Tables<"shareholders">,
    "created_at" | "business_id" | "id"
  >;
  onEditShareholder: (
    updatedShareholder: Omit<
      Tables<"shareholders">,
      "created_at" | "business_id" | "id"
    >
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SquarePenIcon className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Shareholder</DialogTitle>
        </DialogHeader>
        <EditShareholderForm
          shareholder={shareholder}
          onEditShareholder={onEditShareholder}
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

const EditShareholderSchema = z.object({
  name: z.string().trim(),
  share_percentage: z.coerce.number(),
  insurance_coverage: z.coerce.number(),
  ebitda_contribution_percentage: z.coerce.number(),
});

export type EditShareholderFormSchema = z.infer<typeof EditShareholderSchema>;

function EditShareholderForm({
  setOpen,
  shareholder,
  onEditShareholder,
}: {
  shareholder: Omit<
    Tables<"shareholders">,
    "created_at" | "business_id" | "id"
  >;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEditShareholder: (
    updatedShareholder: Omit<
      Tables<"shareholders">,
      "created_at" | "business_id" | "id"
    >
  ) => void;
}) {
  const form = useForm<EditShareholderFormSchema>({
    resolver: zodResolver(EditShareholderSchema),
    defaultValues: shareholder,
  });

  async function onSubmit(values: EditShareholderFormSchema) {
    onEditShareholder(values);
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
          name="share_percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Share Percentage (%)</FormLabel>
              <FormControl>
                <Input id="share_percentage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insurance_coverage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance Coverage ($)</FormLabel>
              <FormControl>
                <Input id="insurance_coverage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ebitda_contribution_percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>% EBITDA Contribution</FormLabel>
              <FormControl>
                <Input id="ebitda_contribution_percentage" {...field} />
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
