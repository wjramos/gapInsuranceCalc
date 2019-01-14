import VehicleDetails from './types/VehicleDetails';
import { YEAR_MS } from './constants';

export const MONTHLY_DEPRECIATION: number = 0.2 / 12;

const NOW_MS: number = Date.now();

// Vehicle worth $50,000, purchased 1 year ago today, with a 20% annual depreciation
export const baseVehicle: VehicleDetails = {
  datePurchased: NOW_MS - YEAR_MS,
  purchaseValue: 15000,
  monthlyDepreciation: MONTHLY_DEPRECIATION,
};

// Vehicle worth $50,000, purchased 2 year ago today, with a 20% annual depreciation
export const oldVehicle: VehicleDetails = {
  datePurchased: NOW_MS - (2 * YEAR_MS),
  purchaseValue: 15000,
  monthlyDepreciation: MONTHLY_DEPRECIATION,
};

// Vehicle worth $50,000, purchased today, with a 20% annual depreciation
export const brandNewVehicle: VehicleDetails = {
  datePurchased: NOW_MS,
  purchaseValue: 15000,
  monthlyDepreciation: MONTHLY_DEPRECIATION,
};

// Vehicle worth $100,000, purchased 1 year ago today, with a 20% annual depreciation
export const expensiveVehicle: VehicleDetails = {
  datePurchased: NOW_MS - YEAR_MS,
  purchaseValue: 100000,
  monthlyDepreciation: MONTHLY_DEPRECIATION,
};

// Vehicle worth $15,000, purchased 1 year ago today, with a 50% annual depreciation
export const highDepreciationVehicle: VehicleDetails = {
  datePurchased: NOW_MS - YEAR_MS,
  purchaseValue: 15000,
  monthlyDepreciation: 0.5 / 12,
};

export const MOCK_VEHICLE_LOOKUP = {
  baseVehicle,
  oldVehicle,
  brandNewVehicle,
  expensiveVehicle,
  highDepreciationVehicle,
};
