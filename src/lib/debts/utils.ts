import type { Tables } from "../../types/supabase";

export function calculateCurrentYearsHeld(yearAcquired: number): number {
  const currentYear: number = new Date().getFullYear();
  return currentYear - yearAcquired;
}

export function calculateAmountPaidOffDollars(
  annualPayment: number,
  currentYearsHeld: number
): number {
  return annualPayment * currentYearsHeld;
}

export function calculateCurrentValueOfDebtDollars(
  initialValue: number,
  interestRate: number,
  currentYearsHeld: number
): number {
  return initialValue * Math.pow(1 + interestRate / 100, currentYearsHeld);
}

export function calculateDebtRemainingDollars(
  currentValueOfDebtDollars: number,
  amountPaidOffDollars: number
): number {
  return Math.max(0, currentValueOfDebtDollars - amountPaidOffDollars);
}

export function calculateYearsToBePaidOff(
  interestRate: number,
  annualPayment: number,
  debtRemainingDollars: number
): number {
  if (annualPayment <= 0 || debtRemainingDollars <= 0) return 0;

  return calculateNumberOfPaymentPeriods(
    interestRate,
    annualPayment,
    debtRemainingDollars
  );
}

export function calculateNumberOfPaymentPeriods(
  interestRate: number,
  annualPayment: number,
  presentValue: number
): number {
  if (interestRate === 0) {
    return presentValue / annualPayment;
  }
  interestRate = interestRate / 100;

  if (interestRate <= 0) {
    interestRate *= -1;
  }

  const numerator: number = Math.log(
    annualPayment / (annualPayment - presentValue * interestRate)
  );
  const denominator: number = Math.log(1 + interestRate);
  return numerator / denominator;
}

export function calculateFutureValueOfActualTermDebtDollars(
  initialValue: number,
  interestRate: number,
  term: number
): number {
  return initialValue * Math.pow(1 + interestRate / 100, term);
}


export function generateDebtsSeries(debts: Tables<"debts">[]) {
  const series: ApexAxisChartSeries = [];
  let latestYear: number = 0;

  debts.forEach((debt: Tables<"debts">): void => {
    const dataPoints: [number, number][] = [];
    let year: number = debt.year_acquired;
    let value: number;

    let debtRemaining: boolean = true;
    do {
      value = calculateDebtValueOverTime(debt, year, new Map<string, number>());
      if (value > 0) {
        dataPoints.push([year, value]);
      } else {
        latestYear = Math.max(latestYear, year);
        debtRemaining = false;
      }
      year++;
    } while (debtRemaining);

    series.push({
      name: debt.name,
      data: dataPoints,
    });
  });

  const minYear: number = Math.min(...debts.map((d) => d.year_acquired));
  const maxYear: number = latestYear;

  let tickAmount: number = maxYear - minYear + 1;
  while (tickAmount > 20) {
    tickAmount = tickAmount / 2;
  }

  return {
    series,
    xAxisOptions: {
      min: minYear,
      max: maxYear,
      tickAmount,
    },
  };
}

export function calculateDebtValueOverTime(
  debt: Tables<"debts">,
  year: number,
  debtValuesCache: Map<string, number>
): number {
  const cacheKey: string = `${debt.name}-${year}`;
  if (debtValuesCache.has(cacheKey)) {
    return debtValuesCache.get(cacheKey)!;
  }

  if (year > new Date().getFullYear() + Math.max(debt.term, 10)) {
    return 0;
  }

  let remainingDebt: number =
    year === debt.year_acquired
      ? debt.initial_value
      : calculateDebtValueOverTime(debt, year - 1, debtValuesCache);

  if (remainingDebt <= 0) {
    debtValuesCache.set(cacheKey, 0);
    return 0;
  }

  remainingDebt *= Math.pow(1 + debt.rate / 100, 1);
  remainingDebt = Math.max(0, remainingDebt - debt.annual_payment);

  debtValuesCache.set(cacheKey, remainingDebt);
  return remainingDebt;
}
