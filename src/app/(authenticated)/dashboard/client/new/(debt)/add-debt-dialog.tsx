"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
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

export default function AddDebtDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="my-4 space-x-1 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
          variant="outline"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Debt</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Add Debt</DialogTitle>
        </DialogHeader>
        <AddBeneficiaryForm setOpen={setOpen} />
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
import { useState } from "react";

const debtSchema = z.object({
  name: z.string().trim(),
  initial_value: z.coerce.number(),
  rate: z.coerce.number(),
  annual_payment: z.coerce.number(),
  years_held: z.coerce.number(),
  actual_term: z.coerce.number(),
});

export type AddDebtFormSchema = z.infer<typeof debtSchema>;

function AddBeneficiaryForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<AddDebtFormSchema>({
    resolver: zodResolver(debtSchema),
    defaultValues: {
      name: "",
      initial_value: 0,
      rate: 0,
      annual_payment: 0,
      years_held: 0,
      actual_term: 0,
    },
  });

  async function onSubmit(values: AddDebtFormSchema) {
    console.log(values);
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-0">
        <div className="grid grid-cols-3 items-center gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="initial_value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Value</FormLabel>
                <FormControl>
                  <Input id="initial_value" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest rate</FormLabel>
                <FormControl>
                  <Input id="rate" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 items-center gap-4">
          <FormField
            control={form.control}
            name="annual_payment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual payment</FormLabel>
                <FormControl>
                  <Input id="annual_payment" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="years_held"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year held</FormLabel>
                <FormControl>
                  <Input id="years_held" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="actual_term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Actual term</FormLabel>
                <FormControl>
                  <Input id="actual_term" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <FormSubmitButton
            isPending={form.formState.isSubmitting}
            value="Add Debt"
            loadingValue="Adding..."
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
