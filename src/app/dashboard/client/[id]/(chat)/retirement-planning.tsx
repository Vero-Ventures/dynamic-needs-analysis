"use client";

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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BirthDatePicker } from "@/components/date-picker";
import { useState } from "react";
import {
  calculateAgeFromDate,
  calculateInsuredIncomeAmount,
  calculateYearsOfActiveIncome,
  findSelectedBracket,
} from "@/lib/utils";
import type { ProvinceInitials } from "@/constants/provinces";
import { CANADIAN_PROVINCES } from "@/constants/provinces";

export type RetirementPlanningForm = {
  name: string;
  birthDate: Date;
  expectedRetirementAge: number;
  province: ProvinceInitials;
  annualIncome: number;
  incomeMultiplier: number;
  taxBracket: number;
};

const defaultFormValues: RetirementPlanningForm = {
  name: "",
  birthDate: new Date(),
  expectedRetirementAge: 0,
  province: "AB",
  annualIncome: 0,
  incomeMultiplier: 0,
  taxBracket: 0,
};
export default function RetirementPlanning() {
  const [form, setForm] = useState<RetirementPlanningForm>(defaultFormValues);
  const age = calculateAgeFromDate(form.birthDate);
  const taxBracket = findSelectedBracket(form.province, form.annualIncome);

  return (
    <Card className="mx-auto w-full border-none shadow-none">
      <CardHeader>
        <CardTitle>Retirement Planning</CardTitle>
        <CardDescription>
          Enter your information to calculate your retirement income.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <BirthDatePicker date={form.birthDate} setForm={setForm} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="retirement-age">Expected Retirement Age</Label>
            <Input
              id="retirement-age"
              type="number"
              value={form.expectedRetirementAge}
              onChange={(e) =>
                setForm({ ...form, expectedRetirementAge: +e.target.value })
              }
              placeholder="Enter retirement age"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Select
              onValueChange={(province: ProvinceInitials) =>
                setForm((form) => ({ ...form, province }))
              }
            >
              <SelectTrigger id="province">
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(CANADIAN_PROVINCES) as ProvinceInitials[]).map(
                  (provinceInitial) => (
                    <SelectItem key={provinceInitial} value={provinceInitial}>
                      {CANADIAN_PROVINCES[provinceInitial]}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="annual-income">Annual Income ($)</Label>
            <Input
              id="annual-income"
              type="number"
              min={0}
              pattern="/^\d+(\.\d{1,2})?$/"
              placeholder="Enter your annual income"
              value={form.annualIncome}
              onChange={(e) =>
                setForm({ ...form, annualIncome: +e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="income-multiplier">
              Income Replacement Multiplier
            </Label>
            <Input
              id="income-multiplier"
              type="number"
              min={0}
              placeholder="Enter income replacement multiplier"
              value={form.incomeMultiplier}
              onChange={(e) =>
                setForm({ ...form, incomeMultiplier: +e.target.value })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="active-income">Years of Active Income</Label>
            <div className="font-bold">
              {calculateYearsOfActiveIncome(age, form.expectedRetirementAge)}
            </div>
          </div>
          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <div className="font-bold">{age}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="estimated-retirement">
              Amount Insured for Income ($)
            </Label>
            <div className="font-bold">
              {calculateInsuredIncomeAmount(
                form.annualIncome,
                form.incomeMultiplier,
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-bracket">Tax Bracket</Label>
            <div className="font-bold">
              ${taxBracket.minIncome} and up - {taxBracket.taxRate}%
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="ml-auto">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
