"use client";

import { AddShareholderSchema } from "@/app/data/db";
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
import type { z } from "zod";

type FormSchema = z.infer<typeof AddShareholderSchema>;

export default function AddShareholderForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(AddShareholderSchema),
    defaultValues: {},
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
        className="grid gap-4 pt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  id="name"
                  placeholder="Enter shareholder's name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sharePercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Share Percentage (%)</FormLabel>
              <FormControl>
                <Input id="sharePercentage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insuranceCoverage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insurance Coverage ($)</FormLabel>
              <FormControl>
                <Input id="insuranceCoverage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="EBITDAPercentContribution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>% EBITDA Contribution</FormLabel>
              <FormControl>
                <Input id="EBITDAPercentContribution" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSubmitButton
          isPending={form.formState.isSubmitting}
          disabled={!form.formState.isDirty || !form.formState.isValid}
          value="Add New Shareholder"
          loadingValue="Adding..."
        />
      </form>
    </Form>
  );
}
