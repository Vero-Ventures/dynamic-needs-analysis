"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn, formatMoney, sleep } from "@/lib/utils";
import { editDebt } from "../actions";
import FormSubmitButton from "@/components/form-submit-button";
import { useRouter } from "next/navigation";
import {
  calculateAmountPaidOffDollars,
  calculateCurrentValueOfDebtDollars,
  calculateCurrentYearsHeld,
  calculateDebtRemainingDollars,
  calculateFutureValueOfActualTermDebtDollars,
  calculateInsurableFutureValueDollars,
  calculateYearsToBePaidOff,
} from "@/lib/debts/utils";
import type { Tables } from "../../../../../../../../types/supabase";

const editDebtSchema = z.object({
  name: z.string().trim(),
  initialValue: z.coerce.number(),
  yearAcquired: z.coerce.number(),
  rate: z.coerce.number(),
  term: z.coerce.number(),
  annualPayment: z.coerce.number(),
});

export type EditDebtFormSchema = z.infer<typeof editDebtSchema>;

export default function EditDebtForm({
  defaultFormValues,
}: {
  defaultFormValues: Pick<
    Tables<"debts">,
    | "name"
    | "initial_value"
    | "year_acquired"
    | "rate"
    | "term"
    | "annual_payment"
  >;
}) {
  const { name, initial_value, year_acquired, annual_payment } =
    defaultFormValues;
  const router = useRouter();
  const form = useForm<EditDebtFormSchema>({
    resolver: zodResolver(editDebtSchema),
    defaultValues: {
      name,
      initialValue: initial_value,
      yearAcquired: year_acquired,
      rate: defaultFormValues.rate,
      term: defaultFormValues.term,
      annualPayment: annual_payment,
    },
  });

  const [initialValue, yearAcquired, rate, term, annualPayment] = form.watch([
    "initialValue",
    "yearAcquired",
    "rate",
    "term",
    "annualPayment",
  ]);

  // derived values
  const currentYearsHeld = calculateCurrentYearsHeld(yearAcquired);
  const amountPaidOff = calculateAmountPaidOffDollars(
    annualPayment,
    currentYearsHeld
  );
  const currentDebtValue = calculateCurrentValueOfDebtDollars(
    initialValue,
    rate,
    currentYearsHeld
  );
  const debtRemaining = calculateDebtRemainingDollars(
    currentDebtValue,
    amountPaidOff
  );
  const yearsToBePaidOff = calculateYearsToBePaidOff(
    rate,
    annualPayment,
    debtRemaining
  );
  const insurableFutureValue = calculateInsurableFutureValueDollars(
    calculateFutureValueOfActualTermDebtDollars(initialValue, rate, term),
    amountPaidOff
  );

  async function onSubmit(values: EditDebtFormSchema) {
    await sleep(3000);
    await editDebt(0, values);
    router.replace("/dashboard/client/1/debts");
  }

  return (
    <Card className="mt-2 w-full border-none shadow-none">
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 pt-3"
          >
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Debt Name</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="Bank Loan" {...field} />
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
                    <FormLabel>Interest Rate (%)</FormLabel>
                    <FormControl>
                      <Input id="rate" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="initialValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Value ($)</FormLabel>
                    <FormControl>
                      <Input id="initialValue" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearAcquired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Acquired</FormLabel>
                    <FormControl>
                      <Input
                        id="yearAcquired"
                        placeholder={`${new Date().getFullYear()}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Term (years)</FormLabel>
                    <FormControl>
                      <Input id="term" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="annualPayment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Payment</FormLabel>
                    <FormControl>
                      <Input id="annualPayment" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="current-years-held">Current Years Held</Label>
                <div className="font-bold">{currentYearsHeld}</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="years-to-be-paid-off">
                  Years to be Paid Off
                </Label>
                <div className="font-bold">
                  {!isNaN(yearsToBePaidOff) && yearsToBePaidOff}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="current-debt-value">
                  Current Value of Debt ($)
                </Label>
                <div className="font-bold">{formatMoney(currentDebtValue)}</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="debt-remaining">Debt Remaining ($)</Label>
                <div className="font-bold">{formatMoney(debtRemaining)}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="amount-paid-off">Amount Paid Off ($)</Label>
                <div className="font-bold">{formatMoney(amountPaidOff)}</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurable-future-value">
                  Insurable Future Value ($)
                </Label>
                <div className="font-bold">
                  {formatMoney(insurableFutureValue)}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex w-full flex-col gap-3 lg:flex-row">
                <Link
                  href="/dashboard/client/1/debts"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "order-2 w-full lg:order-1"
                  )}
                >
                  Cancel
                </Link>
                <FormSubmitButton
                  disabled={!form.formState.isDirty || !form.formState.isValid}
                  className="order-1 w-full lg:order-2"
                  isPending={form.formState.isSubmitting}
                  value="Save Changes"
                  loadingValue="Saving..."
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
