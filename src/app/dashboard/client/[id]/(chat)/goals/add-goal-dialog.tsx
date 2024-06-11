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
import { useRef, useState } from "react";
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
import type { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addGoalSchema } from "@/app/data/db";

type FormSchema = z.infer<typeof addGoalSchema>;

function AddGoalForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(addGoalSchema),
    defaultValues: {
      name: "",
      amount: 0,
      philanthropic: "",
    },
  });

  async function onSubmit() {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    await addGoal(formData);
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
                  <Switch id="philanthropic" {...field} />
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
