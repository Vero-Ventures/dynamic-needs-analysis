"use server";

import { revalidatePath } from "next/cache";
import type { AddDebtFormSchema } from "./add/debt-form";
import {
  calculateAmountPaidOffDollars,
  calculateCurrentYearsHeld,
  calculateFutureValueOfActualTermDebtDollars,
  calculateInsurableFutureValueDollars,
} from "@/lib/debts/utils";
import { createClient } from "@/lib/supabase/server";

export async function addDebt(debt: AddDebtFormSchema) {
  const sb = createClient();

  const {
    name,
    initialValue: initial_value,
    yearAcquired: year_acquired,
    rate,
    term,
    annualPayment: annual_payment,
  } = debt;
  const insurableFutureValueDollars = calculateInsurableFutureValueDollars(
    calculateFutureValueOfActualTermDebtDollars(initial_value, rate, term),
    calculateAmountPaidOffDollars(
      annual_payment,
      calculateCurrentYearsHeld(year_acquired)
    )
  );

  const { data: addedDebt } = await sb.from("debts").insert({
    name,
    initial_value,
    year_acquired,
    rate,
    term,
    annual_payment,
    insurable_future_value_dollars: insurableFutureValueDollars,
  });
  if (!addedDebt) {
    throw new Error();
  }
  revalidatePath("/dashboard/client/[id]/debts", "page");
}

export async function editDebt(id: number, debt: AddDebtFormSchema) {
  const sb = createClient();

  const {
    name,
    initialValue: initial_value,
    yearAcquired: year_acquired,
    rate,
    term,
    annualPayment: annual_payment,
  } = debt;
  const insurableFutureValueDollars = calculateInsurableFutureValueDollars(
    calculateFutureValueOfActualTermDebtDollars(initial_value, rate, term),
    calculateAmountPaidOffDollars(
      annual_payment,
      calculateCurrentYearsHeld(year_acquired)
    )
  );

  await sb
    .from("debts")
    .update({
      name,
      initial_value,
      year_acquired,
      rate,
      term,
      annual_payment,
      insurable_future_value_dollars: insurableFutureValueDollars,
    })
    .eq("id", id);
  revalidatePath("/dashboard/client/[id]/debts", "page");
}

export async function deleteDebt(id: number) {
  const sb = createClient();
  await sb.from("debts").delete().eq("id", id);
  revalidatePath("/dashboard/client/[id]/debts", "page");
}
