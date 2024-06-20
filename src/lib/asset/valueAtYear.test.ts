import { test, expect } from "bun:test";
import { valueAtYear } from "./utils";
import type { Tables } from "../../types/supabase";

// Helper function to create mock asset
const createAsset = (
  name: string,
  year_acquired: number,
  initial_value: number,
  current_value: number,
  rate: number
): Tables<"assets"> => ({
  name,
  year_acquired,
  initial_value,
  current_value,
  rate,
  term: 0,
  type: "Stocks",
  client_id: 0,
  created_at: "",
  id: 0,
  is_liquid: false,
  is_taxable: false,
  to_be_sold: false,
});

const currentYear = new Date().getFullYear();

test("should return 0 if yearGiven is before year_acquired", () => {
  const asset = createAsset("Asset 1", 2000, 1000, 2000, 5);
  const result = valueAtYear(asset, 1999);
  expect(result).toBe(0);
});

test("should return initial_value if yearGiven is the same as year_acquired", () => {
  const asset = createAsset("Asset 2", currentYear, 1500, 3000, 7);
  const result = valueAtYear(asset, currentYear);
  expect(result).toBe(1500);
});

test("should return interpolated value if yearGiven is between year_acquired and currentYear", () => {
  const asset = createAsset("Asset 3", 2010, 1000, 2000, 5);
  const result = valueAtYear(asset, 2015);
  const expectedValue =
    1000 * Math.pow(2000 / 1000, (2015 - 2010) / (currentYear - 2010));
  expect(result).toBeCloseTo(expectedValue, 2);
});

test("should return projected value if yearGiven is after currentYear", () => {
  const asset = createAsset("Asset 4", 2000, 1000, 2000, 5);
  const result = valueAtYear(asset, currentYear + 10);
  const expectedValue = 2000 * Math.pow(1 + 5 / 100, 10);
  expect(result).toBeCloseTo(expectedValue, 2);
});

test("should handle case where yearGiven is the same as currentYear", () => {
  const asset = createAsset("Asset 5", 2010, 1000, 2000, 5);
  const result = valueAtYear(asset, currentYear);
  expect(result).toBe(2000);
});
