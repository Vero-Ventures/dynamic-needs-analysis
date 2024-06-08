"use client";

import FormSubmitButton from "@/components/form-submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sleep } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddBusinessSchema = z.object({
  name: z.string(),
  valuation: z.coerce.number(),
  EBITDA: z.coerce.number(),
  appreciationRate: z.coerce.number(),
  term: z.coerce.number(),
});

type FormSchema = z.infer<typeof AddBusinessSchema>;

export default function AddBusinessesForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(AddBusinessSchema),
    defaultValues: {
      name: "",
      valuation: 0,
      EBITDA: 0,
      appreciationRate: 0,
      term: 0,
    },
  });

  async function onSubmit() {
    if (!formRef.current) return;
    // const formData = new FormData(formRef.current);
    await sleep(3000);
    // await addGoal(formData);
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Widgets Co." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="valuation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valuation ($)</FormLabel>
              <FormControl>
                <Input id="valuation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="EBITDA"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EBITDA ($)</FormLabel>
              <FormControl>
                <Input id="EBITDA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="appreciationRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appreciation Rate (%)</FormLabel>
              <FormControl>
                <Input id="appreciationRate" {...field} />
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
              <FormLabel>Term (years)</FormLabel>
              <FormControl>
                <Input id="term" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          isPending={form.formState.isSubmitting}
          disabled={!form.formState.isDirty || !form.formState.isValid}
          value="Add New Business"
          loadingValue="Adding..."
        />
      </form>
    </Form>
  );
}
