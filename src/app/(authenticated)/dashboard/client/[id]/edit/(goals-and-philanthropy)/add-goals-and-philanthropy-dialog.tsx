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

export default function AddGoalsAndPhilanthropyDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="my-4 space-x-1 rounded-full border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
          variant="outline"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add Goal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Goals & Philanthropy</DialogTitle>
        </DialogHeader>
        <AddGoalsAndPhilanthropyForm setOpen={setOpen} />
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
import { Checkbox } from "@/components/ui/checkbox";
import FormSubmitButton from "@/components/form-submit-button";
import { useState } from "react";
import { createGoalSchema, type CreateGoal } from "./schema";
import { useServerAction } from "zsa-react";
import { createGoal } from "./actions";
import { useParams } from "next/navigation";
import { toast } from "sonner";

function AddGoalsAndPhilanthropyForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(createGoal);
  const form = useForm<CreateGoal>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      name: "",
      amount: 0,
      philanthropic: false,
    },
  });

  async function onSubmit(values: CreateGoal) {
    toast.promise(execute({ ...values, client_id: clientId }), {
      loading: "Adding...",
      success: "Goal added successfully.",
      error: (error) => {
        if (error instanceof Error) return error.message;
      },
    });
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
              <FormLabel>Goal name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Name" {...field} />
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
              <FormLabel>Desired funding amount</FormLabel>
              <FormControl>
                <Input id="amount" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="philanthropic"
          render={({ field }) => (
            <FormItem className="mt-2 flex flex-row items-end space-x-2.5 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Is philanthropic?</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <FormSubmitButton
            isPending={isPending || form.formState.isSubmitting}
            value="Add Goal"
            loadingValue="Adding..."
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
