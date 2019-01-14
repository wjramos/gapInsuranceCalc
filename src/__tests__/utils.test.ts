import {
  fetchVehicleInfo,
  calculateMonthsSinceDate,
  calculateVehicleValue,
  calculateLoanBalance,
} from '../utils';
import { YEAR_MS } from '../constants';

describe('utils', () => {
  // fetchVehicleInfo is a mock api fetch
  xdescribe('fetchVehicleInfo', () => {});

  describe('calculateMonthsSinceDate', () => {
    it('Should return the number of months between now and a provided date', () => {
      expect(calculateMonthsSinceDate(Date.now())).toEqual(0);
      expect(calculateMonthsSinceDate(Date.now() - YEAR_MS)).toEqual(12);
      expect(calculateMonthsSinceDate(Date.now() - (YEAR_MS / 4))).toEqual(3);
    });
  });

  describe('calculateVehicleValue', () => {
    it('Should calculate current vehicle value by initial price, time elapsed, and constant depreciation rate', () => {
      expect(calculateVehicleValue(15000, 0, 0.5)).toBe(15000);
      expect(calculateVehicleValue(15000, 1, 0.5)).toBe(7500);
      expect(calculateVehicleValue(15000, 12, (0.2 / 12))).toBe(12260.28);
    });
  });

  describe('calculateLoanBalance', () => {
    it('Should calculate current loan balance from principal, APR, length of loan, and number of months since origination of the loan (assuming consistent payments)', () => {
      expect(calculateLoanBalance(15000, 0.042, 60, 12)).toEqual(13324.98);
      expect(calculateLoanBalance(15000, 0, 12, 0)).toEqual(15000);
      expect(calculateLoanBalance(15000, 0.01, 12, 6)).toEqual(7540.69);
      expect(calculateLoanBalance(15000, 1, 12, 12)).toEqual(0);
    });
  });
});
