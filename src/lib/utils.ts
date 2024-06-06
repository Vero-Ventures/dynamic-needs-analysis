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

  if (age < 0) {
    throw new Error("Age cannot be negative");
  }

  const month = today.getMonth();
  const birthMonth = birthDateObj.getMonth();
  const day = today.getDate();
  const birthDay = birthDateObj.getDate();

  if (month < birthMonth || (month === birthMonth && day < birthDay)) {
    return age - 1;
  }

  return age;
}

export function calculateYearsOfActiveIncome(
  age: number,
  expectedRetirementAge: number,
) {
  if (age < 0 || expectedRetirementAge < 0) {
    throw new Error("Age and retirement age must be positive");
  }
  const yearsOfActiveIncome = expectedRetirementAge - age;
  return yearsOfActiveIncome < 0 ? 0 : yearsOfActiveIncome;
}

export function calculateInsuredIncomeAmount(
  annualIncome: number,
  incomeReplacementMultiplier: number,
) {
  if (annualIncome < 0 || incomeReplacementMultiplier < 0) {
    throw new Error("Income and multiplier must be positive");
  }
  return annualIncome * incomeReplacementMultiplier;
}

export function findSelectedBracket(
  province: ProvinceInitials,
  annualIncome: number,
): TaxBracket {
  const result = TAX_BRACKETS[province].find(
    (bracket: TaxBracket, index: number, array: TaxBracket[]) => {
      const nextBracket = array.at(index + 1);
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
  if (need < 0 || priority < 0) {
    throw new Error("Need and priority must be positive");
  }
  const priorityInDecimal = priority / 100;
  return need * priorityInDecimal;
}
