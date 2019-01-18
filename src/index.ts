import {
  fetchVehicleInfo,
  calculateVehicleValue,
  calculateLoanBalance,
} from './utils';
import VehicleDetails from './types/VehicleDetails';

export const ERROR_VEHICLE_LOOKUP: string = 'Failed to retrieve vehicle information';

export default async function shouldShowGapInsurance(
  vehicleId: string,
  amountFinanced: number,
  annualInterestRate: number,
  loanTermMonths: number,
): Promise<boolean> {
  let vehicleInfo: VehicleDetails;

  try {
    vehicleInfo = await fetchVehicleInfo(vehicleId);

    if (!vehicleInfo) {
      throw new Error();
    }
  } catch (e) {
    throw new Error(ERROR_VEHICLE_LOOKUP);
  }

  const { monthlyDepreciation }: VehicleDetails = vehicleInfo;

  for (let monthsSincePurchase = 0; monthsSincePurchase <= loanTermMonths; monthsSincePurchase++) {
    const vehicleValue: number = calculateVehicleValue(
      amountFinanced,
      monthlyDepreciation,
      monthsSincePurchase,
    );

    const loanBalance: number = calculateLoanBalance(
      amountFinanced,
      annualInterestRate,
      loanTermMonths,
      monthsSincePurchase,
    );

    // @TODO add support for early termination fee (if applicable to loan)
    if (vehicleValue < loanBalance) {
      return true;
    }
  }

  return false;
}
