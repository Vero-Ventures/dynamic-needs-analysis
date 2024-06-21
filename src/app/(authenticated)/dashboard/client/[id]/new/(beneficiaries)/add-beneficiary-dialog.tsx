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

export default function AddBeneficiaryDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="my-4 space-x-1 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
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
        <AddBeneficiaryForm setOpen={setOpen} />
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
import type { CreateBeneficiary } from "./schema";
import { createBeneficiarySchema } from "./schema";
import { useParams } from "next/navigation";
import { createBeneficiary } from "./actions";
import { useServerAction } from "zsa-react";

function AddBeneficiaryForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const params = useParams();
  const { isPending, execute } = useServerAction(createBeneficiary);

  const form = useForm<CreateBeneficiary>({
    resolver: zodResolver(createBeneficiarySchema),
    defaultValues: {
      name: "",
      allocation: 0,
    },
  });

  const clientId = Number.parseInt(params.id as string);

  async function onSubmit(values: CreateBeneficiary) {
    await execute({ ...values, client_id: clientId });
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
            value="Add Beneficiary"
            loadingValue="Adding..."
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
