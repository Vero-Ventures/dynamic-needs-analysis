import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { TAX_BRACKETS } from "@/constants/tax";
import type { ProvinceInitials } from "@/constants/provinces";
import type { TaxBracket } from "@/constants/tax";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAgeFromDate(birthDate: Date): number {
  const birthDateObj = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birthDateObj.getFullYear();
  // Check if birthday hasn't happened this year yet
  const month = today.getMonth();
  const birthMonth = birthDateObj.getMonth();
  if (
    month < birthMonth ||
    (month === birthMonth && today.getDate() < birthDateObj.getDate())
  ) {
    return age - 1;
  }
  return age;
}

export function calculateYearsOfActiveIncome(
  age: number,
  expectedRetirementAge: number,
) {
  return expectedRetirementAge - age;
}

export function calculateInsuredIncomeAmount(
  annualIncome: number,
  incomeReplacementMultiplier: number,
) {
  return annualIncome * incomeReplacementMultiplier;
}

export function findSelectedBracket(
  province: ProvinceInitials,
  annualIncome: number,
): TaxBracket {
  const result = TAX_BRACKETS[province].find(
    (bracket: TaxBracket, index: number, array: TaxBracket[]) => {
      const nextBracket: TaxBracket = array[index + 1];
      return (
        annualIncome >= bracket.minIncome &&
        (!nextBracket || annualIncome < nextBracket.minIncome)
      );
    },
  );
  if (!result) {
    throw new Error("No bracket found");
  }
  return result;
}

export function formatMoney(amount: number, currency = "CAD") {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
  }).format(amount);
}

export function calculateWant(need: number, priority: number) {
  return need * (priority / 100);
}
