"use client";
import {
  calculateAgeFromDate,
  calculateYearsOfActiveIncome,
  findSelectedBracket,
} from "@/lib/client/utils";
import type { ProvinceInitials } from "@/constants/provinces";
import { CANADIAN_PROVINCES } from "@/constants/provinces";

import {
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BirthDatePicker } from "@/components/date-picker";
import FormSubmitButton from "@/components/form-submit-button";
import { toast } from "sonner";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useServerAction } from "zsa-react";
import type { EditClient } from "./schema";
import { editClientSchema } from "./schema";
import { editClient } from "./actions";
import type { Client } from "@/types/db";

export function EditClientForm({
  onCloseDialog,
  client,
}: {
  onCloseDialog: () => void;
  client: Client;
}) {
  const form = useForm<EditClient>({
    resolver: zodResolver(editClientSchema),
    defaultValues: {
      name: client.name,
      annual_income: client.annual_income,
      birth_date: new Date(client.birth_date),
      expected_retirement_age: client.expected_retirement_age,
      income_multiplier: client.income_multiplier,
      province: client.province,
    },
  });
  const { isPending, execute } = useServerAction(editClient);

  const age = calculateAgeFromDate(form.watch("birth_date"));
  const taxBracket = findSelectedBracket(
    form.watch("province"),
    form.watch("annual_income")
  );
  const yearsOfActiveIncome = calculateYearsOfActiveIncome(
    age,
    form.watch("expected_retirement_age")
  );

  // 2. Define a submit handler.
  async function onSubmit(values: EditClient) {
    toast.promise(execute({ ...values, client_id: client.id }), {
      loading: "Editing...",
      success: "Client updated successfully.",
      error: (error) => {
        if (error instanceof Error) return error.message;
      },
    });
    onCloseDialog();
  }
  return (
    <DialogContent className="p-0 sm:max-w-[500px]">
      <DialogHeader className="rounded-t-xl border-b bg-muted p-4">
        <DialogTitle className="font-bold text-secondary">
          Create Client
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 p-6 pt-0"
        >
          <div className="grid grid-cols-2 items-center gap-4">
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
                      date={field.value}
                      onSelect={(date) => {
                        if (date) {
                          field.onChange(date);
                          const age = calculateAgeFromDate(
                            form.watch("birth_date")
                          );
                          const yearsOfActiveIncome =
                            calculateYearsOfActiveIncome(
                              age,
                              form.watch("expected_retirement_age")
                            );
                          form.setValue(
                            "income_multiplier",
                            yearsOfActiveIncome
                          );
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
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
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        const age = calculateAgeFromDate(
                          form.watch("birth_date")
                        );
                        const yearsOfActiveIncome =
                          calculateYearsOfActiveIncome(
                            age,
                            form.watch("expected_retirement_age")
                          );
                        form.setValue("income_multiplier", yearsOfActiveIncome);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="space-y-2">
              <h2 className="text-sm font-medium leading-none">
                Years of Active Income
              </h2>
              <p className="font-bold">{yearsOfActiveIncome}</p>
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
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
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
          </div>
          <div className="space-y-2">
            <h2 className="text-sm font-medium leading-none">Tax Bracket</h2>
            <div className="font-bold">
              ${taxBracket.minIncome} and up - {taxBracket.taxRate}%
            </div>
          </div>
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
  );
}
