import VehicleDetails from './types/VehicleDetails';

export const MONTHLY_DEPRECIATION: number = 0.2 / 12;
export const HIGH_MONTHLY_DEPRECIATION: number = 0.5 / 12;
export const LOW_MONTHLY_DEPRECIATION: number = 0.01 / 12;

// Vehicle with a 20% annual depreciation
export const baseVehicle: VehicleDetails = {
  monthlyDepreciation: MONTHLY_DEPRECIATION,
};

// Vehicle with a 50% annual depreciation
export const highDepreciationVehicle: VehicleDetails = {
  monthlyDepreciation: HIGH_MONTHLY_DEPRECIATION,
};

// Vehicle with a 1% annual depreciation
export const lowDepreciationVehicle: VehicleDetails = {
  monthlyDepreciation: LOW_MONTHLY_DEPRECIATION,
};
