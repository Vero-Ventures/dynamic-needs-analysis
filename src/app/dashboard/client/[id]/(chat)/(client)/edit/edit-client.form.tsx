"use client";

import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BirthDatePicker } from "@/components/date-picker";
import {
  calculateAgeFromDate,
  calculateInsuredIncomeAmount,
  calculateYearsOfActiveIncome,
  findSelectedBracket,
} from "@/lib/client/utils";

import type { ProvinceInitials } from "@/constants/provinces";
import { CANADIAN_PROVINCES } from "@/constants/provinces";
import Link from "next/link";

import { z } from "zod";
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
import { editClient } from "./actions";
import { useRouter } from "next/navigation";
import FormSubmitButton from "@/components/form-submit-button";
import type { Tables } from "../../../../../../../types/supabase";

const editClientFormSchema = z.object({
  name: z.string(),
  birth_date: z.string(),
  expected_retirement_age: z.coerce.number(),
  province: z.union([
    z.literal("AB"),
    z.literal("BC"),
    z.literal("MB"),
    z.literal("NB"),
    z.literal("NL"),
    z.literal("NS"),
    z.literal("NT"),
    z.literal("NU"),
    z.literal("ON"),
    z.literal("PE"),
    z.literal("QC"),
    z.literal("SK"),
    z.literal("YT"),
  ]),
  annual_income: z.coerce.number(),
  income_multiplier: z.coerce.number(),
});

export type EditClientFormSchema = z.infer<typeof editClientFormSchema>;

export default function EditClientForm({
  client,
}: {
  client: Tables<"clients">;
}) {
  const router = useRouter();
  const form = useForm<EditClientFormSchema>({
    resolver: zodResolver(editClientFormSchema),
    defaultValues: {
      name: client.name,
      annual_income: client.annual_income,
      birth_date: client.birth_date,
      expected_retirement_age: client.expected_retirement_age,
      income_multiplier: client.income_multiplier,
      province: client.province,
    },
  });

  const age = calculateAgeFromDate(form.watch("birth_date"));
  const taxBracket = findSelectedBracket(
    form.watch("province"),
    form.watch("annual_income")
  );

  async function onSubmit(values: EditClientFormSchema) {
    await editClient(client.id, values);
    router.replace("/dashboard/client/1");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birthdate</FormLabel>
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
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">Age</h2>
            <div className="font-bold">{age}</div>
          </div>
          <FormField
            control={form.control}
            name="expected_retirement_age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Retirement Age</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">
              Years of Active Income
            </h2>
            <p className="font-bold">
              {calculateYearsOfActiveIncome(
                age,
                form.watch("expected_retirement_age")
              )}
            </p>
          </div>
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger id="province">
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {(
                        Object.keys(CANADIAN_PROVINCES) as ProvinceInitials[]
                      ).map((provinceInitial) => (
                        <SelectItem
                          key={provinceInitial}
                          value={provinceInitial}
                        >
                          {CANADIAN_PROVINCES[provinceInitial]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <FormLabel>Income Replacement Multiplier</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">
              Amount Insured for Income ($)
            </h2>
            <div className="font-bold">
              {calculateInsuredIncomeAmount(
                form.watch("annual_income"),
                form.watch("income_multiplier")
              )}
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">Tax Bracket</h2>
            <div className="font-bold">
              ${taxBracket.minIncome} and up - {taxBracket.taxRate}%
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="space-x-2">
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/dashboard/client/1"
            >
              Cancel
            </Link>
            <FormSubmitButton
              loadingValue="Saving..."
              value="Save Changes"
              disabled={!form.formState.isValid}
              isPending={form.formState.isSubmitting}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
