"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const incomeReplacementSchema = z.object({
  initial_value: z.coerce.number(),
  rate: z.coerce.number(),
  annual_payment: z.coerce.number(),
  years_held: z.coerce.number(),
  actual_term: z.coerce.number(),
});

type IncomeReplacementSchema = z.infer<typeof incomeReplacementSchema>;

export function DebtForm() {
  const form = useForm<IncomeReplacementSchema>({
    resolver: zodResolver(incomeReplacementSchema),
    defaultValues: {
      initial_value: 0,
      rate: 0,
      annual_payment: 0,
      years_held: 0,
      actual_term: 0,
    },
  });
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Debt
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="initial_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial value of debt</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest rate</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="annual_payment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual payments</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="years_held"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years held</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="actual_term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Actual term</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
