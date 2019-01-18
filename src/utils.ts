import * as mockVehicleLookup from './mocks';

// @NOTE Mocked async api request
export async function fetchVehicleInfo(
  vehicleId: string,
): Promise<any> {
  return new Promise((resolve: Function, reject?: Function) =>
    setTimeout(() => resolve(mockVehicleLookup[vehicleId]), 1000));
}

export const roundToHundredths: Function = (num: number): number =>
  Math.round(num * 100) / 100;

export function calculateVehicleValue(
  purchaseValue: number,
  monthlyDepreciation: number,
  monthsSincePurchase: number,
): number {
  return roundToHundredths(purchaseValue * (1 - monthlyDepreciation) ** monthsSincePurchase);
}

export function calculateLoanBalance(
  principal: number,
  annualInterestRate: number,
  loanTermMonths: number,
  monthsSinceOrigination: number,
): number {
  if (!monthsSinceOrigination) return principal;

  const monthsRemaining: number = loanTermMonths - monthsSinceOrigination;

  if (!annualInterestRate) {
    return roundToHundredths((principal / loanTermMonths) * monthsRemaining);
  }

  const monthlyInterestRate: number = annualInterestRate / 12;
  const monthlyPayment: number = (monthlyInterestRate * principal)
    / (1 - ((1 + monthlyInterestRate) ** -loanTermMonths));

  return roundToHundredths(monthsRemaining * monthlyPayment);
}
