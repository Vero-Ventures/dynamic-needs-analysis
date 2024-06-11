export function currentYearsHeld(yearAcquired: number): number {
  const currentYear: number = new Date().getFullYear();
  return currentYear - yearAcquired;
}

export function amountPaidOffDollars(
  annualPayment: number,
  currentYearsHeld: number,
): number {
  return annualPayment * currentYearsHeld;
}

export function currentValueOfDebtDollars(
  initialValue: number,
  interestRate: number,
  currentYearsHeld: number,
): number {
  return initialValue * Math.pow(1 + interestRate / 100, currentYearsHeld);
}

export function debtRemainingDollars(
  currentValueOfDebtDollars: number,
  amountPaidOffDollars: number,
): number {
  return Math.max(0, currentValueOfDebtDollars - amountPaidOffDollars);
}

export function yearsToBePaidOff(
  interestRate: number,
  annualPayment: number,
  debtRemainingDollars: number,
): number {
  if (annualPayment <= 0 || debtRemainingDollars <= 0) return 0;

  return numberOfPaymentPeriods(
    interestRate,
    annualPayment,
    debtRemainingDollars,
  );
}

export function numberOfPaymentPeriods(
  interestRate: number,
  annualPayment: number,
  presentValue: number,
): number {
  interestRate = interestRate / 100;

  if (interestRate <= 0) {
    interestRate *= -1;
  }

  const numerator: number = Math.log(
    annualPayment / (annualPayment - presentValue * interestRate),
  );
  const denominator: number = Math.log(1 + interestRate);
  return numerator / denominator;
}

export function futureValueOfActualTermDebtDollars(
  initialValue: number,
  interestRate: number,
  term: number,
): number {
  return initialValue * Math.pow(1 + interestRate / 100, term);
}

export function insurableFutureValueDollars(
  futureValueOfActualTermDebtDollars: number,
  amountPaidOffDollars: number,
): number {
  return futureValueOfActualTermDebtDollars - amountPaidOffDollars;
}
