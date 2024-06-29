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

export default function EditDebtDialog({ debt }: { debt: Debt }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PenSquareIcon className="h-6 w-6 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Edit Debt</DialogTitle>
        </DialogHeader>
        <EditDebtForm debt={debt} setOpen={setOpen} />
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
import type { EditDebt } from "./schema";
import { editDebtSchema } from "./schema";
import { editDebt } from "./actions";
import { useServerAction } from "zsa-react";
import { useParams } from "next/navigation";
import { Debt } from "@/types/db";

function EditDebtForm({
  setOpen,
  debt,
}: {
  debt: Debt;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(editDebt);
  const form = useForm<EditDebt>({
    resolver: zodResolver(editDebtSchema),
    defaultValues: {
      name: debt.name,
      initial_value: debt.initial_value,
      rate: debt.rate,
      annual_payment: debt.annual_payment,
      year_acquired: debt.year_acquired,
      term: debt.term,
    },
  });

  async function onSubmit(values: EditDebt) {
    await execute({ ...values, client_id: clientId, debt_id: debt.id });
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
            name="year_acquired"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Acquired</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Actual term</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
