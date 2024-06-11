"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { useRef } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn, sleep } from "@/lib/utils";
import { DebtSchema } from "@/app/data/db";
import { addDebt } from "../actions";
import FormSubmitButton from "@/components/form-submit-button";
import { useRouter } from "next/navigation";

type FormSchema = z.infer<typeof DebtSchema>;

export default function DebtForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(DebtSchema),
    defaultValues: {
      name: "",
      initialValue: 0,
      yearAcquired: 0,
      rate: 0,
      term: 0,
      annualPayment: 0,
      insurableFutureValueDollars: 0,
    },
  });

  async function onSubmit() {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    await sleep(3000);
    await addDebt(formData);
    router.replace("/dashboard/client/1/debts");
  }

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="mb-3">
        <CardTitle>Debt</CardTitle>
        <CardDescription>
          Enter your debt to see a clear picture of your financial situation.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form {...form}>
          <form
            ref={formRef}
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
                      <Input id="yearAcquired" placeholder="2024" {...field} />
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
                <div className="font-bold">3</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount-paid-off">Amount Paid Off ($)</Label>
                <div className="font-bold">$50</div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="current-debt-value">
                  Current Value of Debt ($)
                </Label>
                <div className="font-bold">$250</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="debt-remaining">Debt Remaining</Label>
                <div className="font-bold">$180</div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="years-to-be-paid-off">
                  Years to be Paid Off
                </Label>
                <div className="font-bold">5</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurable-future-value">
                  Insurable Future Value ($)
                </Label>
                <div className="font-bold">$170.20</div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="mt-3">
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
            className="order-1 w-full lg:order-2"
            isPending={form.formState.isSubmitting}
            value="Add Debt"
            loadingValue="Adding..."
          />
        </div>
      </CardFooter>
    </Card>
  );
}
