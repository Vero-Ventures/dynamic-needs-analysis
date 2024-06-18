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

export default function AddBeneficiaryDialog({
  remainingAllocationParts,
}: {
  remainingAllocationParts: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="my-4 space-x-1 rounded-full bg-transparent"
          variant="outline"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Beneficiary</span>
        </Button>
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

const BeneficiarySchema = z.object({
  name: z.string().trim(),
  allocation: z.coerce.number(),
});

export type AddBeneficiaryFormSchema = z.infer<typeof BeneficiarySchema>;

function AddBeneficiaryForm({
  remainingAllocationParts,
  setOpen,
}: {
  remainingAllocationParts: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<AddBeneficiaryFormSchema>({
    resolver: zodResolver(BeneficiarySchema),
    defaultValues: {
      name: "",
      allocation: remainingAllocationParts,
    },
  });

  async function onSubmit(values: AddBeneficiaryFormSchema) {
    console.log(values);
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
