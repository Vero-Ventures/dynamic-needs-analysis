"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import { StepperFormActions } from "./stepper-form-actions";
import { useStepper } from "@/components/ui/stepper";
import { ASSET_TYPES } from "@/constants/assetTypes";
import { Switch } from "@/components/ui/switch";
import InvestmentGrowthProjectionsTable from "./investment-growth-projections-table";
import { formatMoney } from "@/lib/utils";
import {
  calculateCurrentGrowthDollars,
  calculateCurrentGrowthPercentage,
  calculateCurrentYearsHeld,
  calculateFutureValueDollars,
  calculateFutureValueGrowthPercentage,
} from "@/lib/asset/utils";

const addAssetSchema = z.object({
  name: z.string().trim(),
  initialValue: z.coerce.number(),
  currentValue: z.coerce.number(),
  yearAcquired: z.coerce.number(),
  rate: z.coerce.number(),
  term: z.coerce.number(),
  type: z.union([
    z.literal("Cash"),
    z.literal("Stocks"),
    z.literal("Bonds"),
    z.literal("Real Estate"),
    z.literal("Mutual Funds"),
    z.literal("Retirement Account"),
    z.literal("Crypto"),
    z.literal("Life Insurance"),
  ]),
  isTaxable: z.boolean(),
  isLiquid: z.boolean(),
  isToBeSold: z.boolean(),
});

export type AddAssetsFormSchema = z.infer<typeof addAssetSchema>;

export default function AddAssetsForm({
  asset,
  onAddAsset,
}: {
  asset: AddAssetsFormSchema;
  onAddAsset: (values: AddAssetsFormSchema) => void;
}) {
  const { nextStep } = useStepper();
  const form = useForm<AddAssetsFormSchema>({
    resolver: zodResolver(addAssetSchema),
    defaultValues: asset,
  });

  const [initialValue, currentValue, yearAcquired, rate, term] = form.watch([
    "initialValue",
    "currentValue",
    "yearAcquired",
    "rate",
    "term",
    "type",
  ]);

  const currentYearsHeld = calculateCurrentYearsHeld(yearAcquired);
  const currentGrowthDollars = calculateCurrentGrowthDollars(
    initialValue,
    currentValue
  );
  const currentGrowthPercentage = calculateCurrentGrowthPercentage(
    initialValue,
    currentValue
  );
  const futureValueDollars = calculateFutureValueDollars(
    currentValue,
    rate,
    term
  );
  const futureValueGrowthPercentage = calculateFutureValueGrowthPercentage(
    futureValueDollars,
    initialValue
  );

  async function onSubmit(values: AddAssetsFormSchema) {
    onAddAsset(values);
    nextStep();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2 px-2"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSET_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asset Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="Checking Account" {...field} />
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
        <FormField
          control={form.control}
          name="initialValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Value ($)</FormLabel>
              <FormControl>
                <Input id="initialValue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Value ($)</FormLabel>
              <FormControl>
                <Input id="currentValue" {...field} />
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
              <FormLabel>Appreciation Rate (%)</FormLabel>
              <FormControl>
                <Input id="rate" {...field} />
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
        <div className="mb-6 mt-2 space-y-3">
          <FormField
            control={form.control}
            name="isTaxable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-lg border p-4">
                <FormLabel>Taxable</FormLabel>
                <FormControl>
                  <Switch
                    className="mt-0"
                    id="isTaxable"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isLiquid"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-lg border p-4">
                <FormLabel>Liquid</FormLabel>
                <FormControl>
                  <Switch
                    id="isLiquid"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isToBeSold"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-lg border p-4">
                <FormLabel>To Be Sold</FormLabel>
                <FormControl>
                  <Switch
                    id="isToBeSold"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mb-8">
          <InvestmentGrowthProjectionsTable
            data={[
              {
                label: "Current Years Held",
                value: `${currentYearsHeld}`,
              },
              {
                label: "Current Growth Dollars ($)",
                value: formatMoney(currentGrowthDollars),
              },
              {
                label: "Current Growth Percentage (%)",
                value: `${currentGrowthPercentage}`,
              },
              {
                label: "Future Value Dollars ($)",
                value: formatMoney(futureValueDollars),
              },
              {
                label: "Future Value Growth Percentage (%)",
                value: `${futureValueGrowthPercentage}`,
              },
            ]}
          />
        </div>
        <StepperFormActions />
      </form>
    </Form>
  );
}
