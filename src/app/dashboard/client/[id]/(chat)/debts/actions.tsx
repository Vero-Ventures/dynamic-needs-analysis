"use server";

import { revalidatePath } from "next/cache";
import { debts } from "@/app/data/db";
import type { AddDebtFormSchema } from "./add/debt-form";
import {
  calculateAmountPaidOffDollars,
  calculateCurrentYearsHeld,
  calculateFutureValueOfActualTermDebtDollars,
  calculateInsurableFutureValueDollars,
} from "@/lib/debts/utils";

export async function addDebt(data: AddDebtFormSchema) {
  const { name, initialValue, yearAcquired, rate, term, annualPayment } = data;

  const insurableFutureValueDollars = calculateInsurableFutureValueDollars(
    calculateFutureValueOfActualTermDebtDollars(initialValue, rate, term),
    calculateAmountPaidOffDollars(
      annualPayment,
      calculateCurrentYearsHeld(yearAcquired)
    )
  );

  debts.push({
    id: debts.length,
    name,
    initialValue,
    yearAcquired,
    rate,
    term,
    annualPayment,
    insurableFutureValueDollars,
  });
  revalidatePath("/dashboard/client/[id]/debts", "page");
}

export async function editDebt(id: number, data: AddDebtFormSchema) {
  const i = debts.findIndex((g) => g.id === id);
  if (i === -1) {
    throw new Error("No debt found at this index");
  }

  const { name, initialValue, yearAcquired, rate, term, annualPayment } = data;

  const insurableFutureValueDollars = calculateInsurableFutureValueDollars(
    calculateFutureValueOfActualTermDebtDollars(initialValue, rate, term),
    calculateAmountPaidOffDollars(
      annualPayment,
      calculateCurrentYearsHeld(yearAcquired)
    )
  );

  debts[i] = {
    id,
    name,
    initialValue,
    yearAcquired,
    rate,
    term,
    annualPayment,
    insurableFutureValueDollars,
  };
  revalidatePath("/dashboard/client/[id]/debts", "page");
}

export async function deleteDebt(id: number) {
  const i = debts.findIndex((g) => g.id === id);
  if (i === -1) {
    throw new Error("No debt found at this index");
  }
  debts.splice(i, 1);
  revalidatePath("/dashboard/client/[id]/debts", "page");
}
