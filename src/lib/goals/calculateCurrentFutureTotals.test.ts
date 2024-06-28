import { test, expect } from "bun:test";
import { calculateCurrentFutureTotals } from "./utils";
import { Asset } from "@/types/db";

const testCases = [
  {
    assets: [
      {
        current_value: 1000,
        rate: 5,
        term: 10,
        is_liquid: true,
        to_be_sold: false,
      },
      {
        current_value: 2000,
        rate: 3,
        term: 5,
        is_liquid: false,
        to_be_sold: true,
      },
      {
        current_value: 1500,
        rate: 4,
        term: 7,
        is_liquid: false,
        to_be_sold: false,
      },
    ] as Asset[],
    expected: {
      totalCurrentValueFixed: 1500,
      totalFutureValueFixed: 1973.9,
      totalCurrentValueLiquid: 1000,
      totalFutureValueLiquidAssets: 1628.89,
      totalCurrentValueToBeSold: 2000,
      totalFutureValueToBeSold: 2318.55,
    },
  },
  {
    assets: [] as Asset[],
    expected: {
      totalCurrentValueFixed: 0,
      totalFutureValueFixed: 0,
      totalCurrentValueLiquid: 0,
      totalFutureValueLiquidAssets: 0,
      totalCurrentValueToBeSold: 0,
      totalFutureValueToBeSold: 0,
    },
  },
];

testCases.forEach(({ assets, expected }) => {
  test(`should return correct totals for assets`, () => {
    const result = calculateCurrentFutureTotals(assets);
    expect(result.totalCurrentValueFixed).toBeCloseTo(
      expected.totalCurrentValueFixed,
      2
    );
    expect(result.totalFutureValueFixed).toBeCloseTo(
      expected.totalFutureValueFixed,
      2
    );
    expect(result.totalCurrentValueLiquid).toBeCloseTo(
      expected.totalCurrentValueLiquid,
      2
    );
    expect(result.totalFutureValueLiquidAssets).toBeCloseTo(
      expected.totalFutureValueLiquidAssets,
      2
    );
    expect(result.totalCurrentValueToBeSold).toBeCloseTo(
      expected.totalCurrentValueToBeSold,
      2
    );
    expect(result.totalFutureValueToBeSold).toBeCloseTo(
      expected.totalFutureValueToBeSold,
      2
    );
  });
});
