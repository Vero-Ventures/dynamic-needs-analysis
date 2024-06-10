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
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import FormSubmitButton from "@/components/form-submit-button";

export default function BeneficiaryDialog({
  remainingAllocationParts,
}: {
  remainingAllocationParts: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="my-4">Add new Beneficiary</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Beneficiary</DialogTitle>
        </DialogHeader>
        <AddBeneficiaryForm
          remainingAllocationParts={remainingAllocationParts}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { sleep } from "@/lib/utils";
import { AddBeneficiarySchema } from "@/app/data/db";
import { addBeneficiary } from "./actions";

type FormSchema = z.infer<typeof AddBeneficiarySchema>;

function AddBeneficiaryForm({
  remainingAllocationParts,
  setOpen,
}: {
  remainingAllocationParts: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(AddBeneficiarySchema),
    defaultValues: {
      name: "",
      allocation: remainingAllocationParts,
    },
  });

  async function onSubmit() {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    await sleep(3000);
    await addBeneficiary(formData);
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 pt-4"
      >
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
                <Input
                  id="allocation"
                  placeholder={`${remainingAllocationParts} parts`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <FormSubmitButton
            isPending={form.formState.isSubmitting}
            value="Add Beneficiary"
            loadingValue="Adding..."
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
