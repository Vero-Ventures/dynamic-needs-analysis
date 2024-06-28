"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function EditGoalsAndPhilanthropyDialog({
  goal,
}: {
  goal: Goal;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PenSquareIcon className="h-6 w-6 hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Goal</DialogTitle>
        </DialogHeader>
        <EditGoalsAndPhilanthropyForm goal={goal} setOpen={setOpen} />
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
import { EditGoal, editGoalSchema, type CreateGoal } from "./schema";
import { useServerAction } from "zsa-react";
import { editGoal } from "./actions";
import { useParams } from "next/navigation";
import { Goal } from "@/types/db";
import { PenSquareIcon } from "lucide-react";

function EditGoalsAndPhilanthropyForm({
  goal,
  setOpen,
}: {
  goal: Goal;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const params = useParams<{ id: string }>();
  const clientId = Number.parseInt(params.id);
  const { isPending, execute } = useServerAction(editGoal);
  const form = useForm<EditGoal>({
    resolver: zodResolver(editGoalSchema),
    defaultValues: {
      name: goal.name,
      amount: goal.amount,
      philanthropic: goal.philanthropic,
    },
  });

  async function onSubmit(values: CreateGoal) {
    await execute({ ...values, client_id: clientId, goal_id: goal.id });
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
            value="Save Changes"
            loadingValue="Saving..."
          />
        </DialogFooter>
      </form>
    </Form>
  );
}
