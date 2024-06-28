"use client";

import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Client } from "@/types/db";
import { useForm } from "react-hook-form";
import type { EditLiquidityAllocatedTowardsGoals } from "./schema";
import { editLiquidityAllocatedTowardsGoalsSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSubmitButton from "@/components/form-submit-button";
import { useServerAction } from "zsa-react";
import { editLiquidityAllocatedTowardsGoals } from "./actions";

export default function EditLiquidityAllocatedTowardsGoalsDialog({
  client,
}: {
  client: Pick<Client, "id" | "liquidity_allocated_towards_goals">;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<EditLiquidityAllocatedTowardsGoals>({
    resolver: zodResolver(editLiquidityAllocatedTowardsGoalsSchema),
    defaultValues: {
      liquidity_allocated_towards_goals:
        client.liquidity_allocated_towards_goals || 100,
    },
  });
  const { isPending, execute } = useServerAction(
    editLiquidityAllocatedTowardsGoals
  );
  async function onSubmit(values: EditLiquidityAllocatedTowardsGoals) {
    await execute({ ...values, client_id: client.id });
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex w-full items-center gap-2">
          <PencilIcon className="h-4 w-4" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[500px]">
        <DialogHeader className="rounded-t-xl border-b bg-muted p-4">
          <DialogTitle className="font-bold text-secondary">Edit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-6 pt-0"
          >
            <FormField
              control={form.control}
              name="liquidity_allocated_towards_goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Liquidity Allocated Towards Goals</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <FormSubmitButton
                disabled={!form.formState.isValid}
                isPending={isPending}
                loadingValue="Saving..."
                value="Save Changes"
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
