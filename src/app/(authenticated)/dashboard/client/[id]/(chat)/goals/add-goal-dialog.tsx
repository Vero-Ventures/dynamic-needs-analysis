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
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import FormSubmitButton from "@/components/form-submit-button";
import { addGoal } from "./actions";

export default function AddGoalDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="my-4">Add new Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Goal</DialogTitle>
        </DialogHeader>
        <AddGoalForm setOpen={setOpen} />
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
import { z } from "zod";

const addGoalSchema = z.object({
  name: z.string().trim(),
  amount: z.coerce.number(),
  philanthropic: z.boolean(),
});

export type AddGoalFormSchema = z.infer<typeof addGoalSchema>;

function AddGoalForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<AddGoalFormSchema>({
    resolver: zodResolver(addGoalSchema),
    defaultValues: {
      name: "",
      amount: 0,
      philanthropic: false,
    },
  });

  async function onSubmit(values: AddGoalFormSchema) {
    await addGoal(values);
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
                <Input id="name" placeholder="Red Cross" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input id="amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="philanthropic"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel>Philanthropic:</FormLabel>
                <FormControl>
                  <Switch
                    id="philanthropic"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <FormSubmitButton
            isPending={form.formState.isSubmitting}
            disabled={!form.formState.isDirty || !form.formState.isValid}
            value="Add Goal"
            loadingValue="Adding..."
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
