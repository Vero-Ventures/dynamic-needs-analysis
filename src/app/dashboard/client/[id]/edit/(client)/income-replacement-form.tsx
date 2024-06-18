"use client";

import { BirthDatePicker } from "@/components/date-picker";
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
  birth_date: z.date({
    required_error: "Please enter your birth date",
  }),
  annual_income: z.coerce.number({
    required_error: "Please enter your annual income",
  }),
  income_multiplier: z.coerce.number({
    required_error: "Please enter an income multiplier",
  }),
});

type IncomeReplacementSchema = z.infer<typeof incomeReplacementSchema>;

export function IncomeReplacementForm() {
  const form = useForm<IncomeReplacementSchema>({
    resolver: zodResolver(incomeReplacementSchema),
    defaultValues: {
      annual_income: 0,
      birth_date: new Date(),
      income_multiplier: 0,
    },
  });
  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle className="mt-3 text-center text-4xl font-bold">
          Income Replacement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <BirthDatePicker
                      date={new Date(field.value)}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="annual_income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Income ($)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="income_multiplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="space-y-2">
                    <p>Income replacement multiplier</p>
                    <p className="font-normal">
                      (usually very close to years left to retirement)
                    </p>
                  </FormLabel>
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
