import {
  fetchVehicleInfo,
  calculateMonthsSinceDate,
  calculateVehicleValue,
  calculateLoanBalance,
} from './utils';
import VehicleDetails from './types/VehicleDetails';

export default async function shouldShowGapInsurance(
  vehicleId: string,
  amountFinanced: number,
  annualInterestRate: number,
  loanTermMonths: number,
): Promise<boolean> {
  let vehicleInfo: VehicleDetails;

  try {
    vehicleInfo = await fetchVehicleInfo(vehicleId);
  } catch (e) {
    throw new Error('Failed to retrieve vehicle Information');
  }

  const {
    purchaseValue,
    datePurchased,
    monthlyDepreciation,
  }: VehicleDetails = vehicleInfo;

  const monthsSincePurchase: number = calculateMonthsSinceDate(datePurchased);
  const vehicleValue: number = calculateVehicleValue(
    purchaseValue,
    monthsSincePurchase,
    monthlyDepreciation,
  );

  const loanBalance: number = calculateLoanBalance(
    amountFinanced,
    annualInterestRate,
    loanTermMonths,
    monthsSincePurchase,
  );

  // @TODO add support for early termination fee (if applicable to loan)
  return vehicleValue < loanBalance;
}
