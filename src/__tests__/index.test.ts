import {
  baseVehicle,
  highDepreciationVehicle,
  MONTHLY_DEPRECIATION,
  HIGH_MONTHLY_DEPRECIATION,
  LOW_MONTHLY_DEPRECIATION,
} from '../mocks';
import shouldShowGapInsurance, { ERROR_VEHICLE_LOOKUP } from '..';

const BASE_APR: number = 0.042;
const BASE_PRICE: number = 15000;

const HIGH_APR: number = 100;
const HIGH_PRICE: number = 100000;

const LOW_APR: number = 0.0001;

describe('shouldShowGapInsurance', () => {
  describe('Base case', () => {
    const minLoanTermMonths: number = 20;

    it(`Should display GAP insurance for a $${BASE_PRICE} loan on a vehicle with ${MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${BASE_APR * 100}% APR if the duration is ${minLoanTermMonths} months or longer`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'baseVehicle',
        BASE_PRICE,
        BASE_APR,
        minLoanTermMonths,
      );

      expect(showGapInsurance).toBe(true);
    });

    it(`Should not display GAP insurance for a $${BASE_PRICE} loan on a vehicle with ${MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${BASE_APR * 100}% APR if the duration is less than ${minLoanTermMonths} months`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'baseVehicle',
        BASE_PRICE,
        BASE_APR,
        minLoanTermMonths - 1,
      );

      expect(showGapInsurance).toBe(false);
    });
  });

  describe('Loan amount (does not affect the minimum loan duration)', () => {
    const minLoanTermMonths: number = 20;

    it(`Should display GAP insurance for a $${HIGH_PRICE} loan on a vehicle with ${MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${BASE_APR * 100}% APR if the duration is ${minLoanTermMonths} months or longer`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'baseVehicle',
        HIGH_PRICE,
        BASE_APR,
        minLoanTermMonths,
      );

      expect(showGapInsurance).toBe(true);
    });

    it(`Should not display GAP insurance for a $${HIGH_PRICE} loan on a vehicle with ${MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${BASE_APR * 100}% APR if the duration is less than ${minLoanTermMonths} months`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'baseVehicle',
        HIGH_PRICE,
        BASE_APR,
        minLoanTermMonths - 1,
      );

      expect(showGapInsurance).toBe(false);
    });
  });

  describe('High interest rate', () => {
    const minLoanTermMonths: number = 2;

    it(`Should display GAP insurance for a $${BASE_PRICE} loan on a vehicle with ${MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${HIGH_APR * 100}% APR if the duration is ${minLoanTermMonths} months or longer`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'baseVehicle',
        BASE_PRICE,
        HIGH_APR,
        minLoanTermMonths,
      );

      expect(showGapInsurance).toBe(true);
    });

    it(`Should not display GAP insurance for a $${BASE_PRICE} loan on a vehicle with ${MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${HIGH_APR * 100}% APR if the duration is shorter than ${minLoanTermMonths} months`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'baseVehicle',
        BASE_PRICE,
        HIGH_APR,
        minLoanTermMonths - 1,
      );

      expect(showGapInsurance).toBe(false);
    });
  });

  describe('Low interest rate', () => {
    const minLoanTermMonths: number = 60;

    it(`Should display GAP insurance for a $${BASE_PRICE} loan on a vehicle with ${MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${LOW_APR * 100}% APR if the duration is ${minLoanTermMonths} months or longer`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'baseVehicle',
        BASE_PRICE,
        LOW_APR,
        minLoanTermMonths,
      );

      expect(showGapInsurance).toBe(true);
    });

    it(`Should not display GAP insurance for a $${BASE_PRICE} loan on a vehicle with ${MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${LOW_APR * 100}% APR if the duration is less than ${minLoanTermMonths} months`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'baseVehicle',
        BASE_PRICE,
        LOW_APR,
        minLoanTermMonths - 1,
      );

      expect(showGapInsurance).toBe(false);
    });
  });

  describe('High depreciation rate', () => {
    const minLoanTermMonths: number = 15;

    it(`Should display GAP insurance for a $${BASE_PRICE} loan on a vehicle with ${HIGH_MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${BASE_APR * 100}% APR if the duration is ${minLoanTermMonths} months or longer`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'highDepreciationVehicle',
        BASE_PRICE,
        BASE_APR,
        minLoanTermMonths,
      );

      expect(showGapInsurance).toBe(true);
    });

    it(`Should not display GAP insurance for a $${BASE_PRICE} loan on a vehicle with ${HIGH_MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${BASE_APR * 100}% APR if the duration is less than ${minLoanTermMonths} months`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'highDepreciationVehicle',
        BASE_PRICE,
        BASE_APR,
        minLoanTermMonths - 1,
      );

      expect(showGapInsurance).toBe(false);
    });
  });

  describe('Low depreciation rate', () => {
    const minLoanTermMonths: number = 24;

    it(`Should display GAP insurance for a $${BASE_PRICE} loan on a vehicle with ${LOW_MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${BASE_APR * 100}% APR if the duration is ${minLoanTermMonths} months or longer`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'lowDepreciationVehicle',
        BASE_PRICE,
        BASE_APR,
        minLoanTermMonths,
      );

      expect(showGapInsurance).toBe(true);
    });

    xit(`Should not display GAP insurance for a $${BASE_PRICE} loan on a vehicle with ${LOW_MONTHLY_DEPRECIATION * 100}% monthly depreciation with a ${BASE_APR * 100}% APR if the duration is less than ${minLoanTermMonths} months`, async () => {
      const showGapInsurance: boolean = await shouldShowGapInsurance(
        'lowDepreciationVehicle',
        BASE_PRICE,
        BASE_APR,
        minLoanTermMonths - 1,
      );

      expect(showGapInsurance).toBe(false);
    });
  });

  it('Should throw an error if unable to fetch vehicle information', async () => {
    try {
      await shouldShowGapInsurance(
        'unknownVehicle',
        1000,
        BASE_APR,
        12,
      );
    } catch (e) {
      expect(e).toEqual(new Error(ERROR_VEHICLE_LOOKUP));
    }
  });
});
