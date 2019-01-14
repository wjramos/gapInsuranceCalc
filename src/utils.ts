import { YEAR_MS } from './constants';
import { MOCK_VEHICLE_LOOKUP } from './mocks';

// @NOTE Mocked async api request
export async function fetchVehicleInfo(
  vehicleId: string,
): Promise<any> {
  return new Promise((resolve: Function, reject?: Function) =>
    setTimeout(() => resolve(MOCK_VEHICLE_LOOKUP[vehicleId]), 1000));
}

export function calculateVehicleValue(
  purchaseValue: number,
  monthsSincePurchase: number,
  monthlyDepreciation: number,
): number {
  return Math.round((purchaseValue * (1 - monthlyDepreciation) ** monthsSincePurchase) * 100) / 100;
}

export function calculateLoanBalance(
  principal: number,
  annualInterestRate: number,
  loanTermMonths: number,
  monthsSinceOrigination: number,
): number {
  const monthsRemaining: number = loanTermMonths - monthsSinceOrigination;

  if (!annualInterestRate) {
    return Math.round((principal / loanTermMonths) * monthsRemaining * 100) / 100 ;
  }

  const monthlyInterestRate: number = annualInterestRate / 12;
  const monthlyPayment: number = (monthlyInterestRate * principal)
    / (1 - ((1 + monthlyInterestRate) ** -loanTermMonths));

  return Math.round(monthsRemaining * monthlyPayment * 100) / 100;
}

export function calculateMonthsSinceDate(
  timestamp: number,
): number {
  return Math.floor((Date.now() - timestamp) / (YEAR_MS / 12));
}
