import {
  baseVehicle,
  oldVehicle,
  brandNewVehicle,
  expensiveVehicle,
  highDepreciationVehicle,
} from '../mocks';
import shouldShowGapInsurance, { ERROR_VEHICLE_LOOKUP } from '..';

const HIGH_INTEREST: number = 100;
const STANDARD_INTEREST: number = 0.042;

describe('shouldShowGapInsurance', () => {
  it('Should show GAP insurance products if the loan balance is greater than the value of the totaled vehicle with depreciation', async () => {
    const minLoanTermMonths: number = 49;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'baseVehicle',
      baseVehicle.purchaseValue,
      STANDARD_INTEREST,
      minLoanTermMonths,
    );

    expect(showGapInsurance).toBe(true);
  });

  it('Should not show GAP insurance products if the loan balance is less than the value of the totaled vehicle with depreciation', async () => {
    const maxLoanTermMonths: number = 48;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'baseVehicle',
      baseVehicle.purchaseValue,
      STANDARD_INTEREST,
      maxLoanTermMonths,
    );

    expect(showGapInsurance).toBe(false);
  });

  it('Should show GAP insurance products for a high interest loan with a longer loan term', async () => {
    const minLoanTermMonths: number = 13;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'baseVehicle',
      baseVehicle.purchaseValue,
      HIGH_INTEREST,
      minLoanTermMonths,
    );

    expect(showGapInsurance).toBe(true);
  });

  it('Should not show GAP insurance products for a high interest loan with a shorter loan term', async () => {
    const maxLoanTermMonths: number = 12;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'baseVehicle',
      baseVehicle.purchaseValue,
      HIGH_INTEREST,
      maxLoanTermMonths,
    );

    expect(showGapInsurance).toBe(false);
  });

  it('Should show GAP insurance products for a car purchased 2 years ago and with a longer loan term', async () => {
    const minLoanTermMonths: number = 61;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'oldVehicle',
      oldVehicle.purchaseValue,
      STANDARD_INTEREST,
      minLoanTermMonths,
    );

    expect(showGapInsurance).toBe(true);
  });

  it('Should not show GAP insurance products for a car purchased 2 years ago and with a shorter loan term', async () => {
    const maxLoanTermMonths: number = 60;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'oldVehicle',
      oldVehicle.purchaseValue,
      STANDARD_INTEREST,
      maxLoanTermMonths,
    );

    expect(showGapInsurance).toBe(false);
  });

  it('Should show GAP insurance products for a vehicle purchased today with any amount of remaining loan term', async () => {
    const maxLoanTermMonths: number = 1;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'brandNewVehicle',
      brandNewVehicle.purchaseValue,
      STANDARD_INTEREST,
      maxLoanTermMonths,
    );

    expect(showGapInsurance).toBe(true);
  });

  it('Should not show GAP insurance products for a vehicle purchased today and immediately paid off', async () => {
    const maxLoanTermMonths: number = 0;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'brandNewVehicle',
      brandNewVehicle.purchaseValue,
      STANDARD_INTEREST,
      maxLoanTermMonths,
    );

    expect(showGapInsurance).toBe(false);
  });

  it('Should show GAP insurance for an expensive vehicle and a longer loan term', async () => {
    const minLoanTermMonths: number = 49;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'expensiveVehicle',
      expensiveVehicle.purchaseValue,
      STANDARD_INTEREST,
      minLoanTermMonths,
    );

    expect(showGapInsurance).toBe(true);
  });

  it('Should not show GAP insurance for an expensive vehicle and a shorter loan term', async () => {
    const maxLoanTermMonths: number = 48;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'expensiveVehicle',
      expensiveVehicle.purchaseValue,
      STANDARD_INTEREST,
      maxLoanTermMonths,
    );

    expect(showGapInsurance).toBe(false);
  });

  it('Should show GAP insurance products for vehicles with especially high depreciation and a longer loan term', async () => {
    const minLoanTermMonths: number = 28;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'highDepreciationVehicle',
      highDepreciationVehicle.purchaseValue,
      STANDARD_INTEREST,
      minLoanTermMonths,
    );

    expect(showGapInsurance).toBe(true);
  });

  it('Should not show GAP insurance products for vehicles with especially high depreciation and a shorter loan term', async () => {
    const maxLoanTermMonths: number = 27;
    const showGapInsurance: boolean = await shouldShowGapInsurance(
      'highDepreciationVehicle',
      highDepreciationVehicle.purchaseValue,
      STANDARD_INTEREST,
      maxLoanTermMonths,
    );

    expect(showGapInsurance).toBe(false);
  });

  it('Should throw an error if unable to fetch vehicle information', async () => {
    try {
      await shouldShowGapInsurance(
        'unknownVehicle',
        1000,
        STANDARD_INTEREST,
        12,
      );
    } catch (e) {
      expect(e).toEqual(new Error(ERROR_VEHICLE_LOOKUP));
    }
  });
});
