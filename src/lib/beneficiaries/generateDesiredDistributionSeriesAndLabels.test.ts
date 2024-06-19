import { test, expect } from "bun:test";
import { generateDesiredDistributionSeriesAndLabels } from "./utils";
import type { Beneficiary} from "@/types/db";

const testCases = [
  {
    beneficiaries: [
      { id: 1, name: "Alice", allocation: 50, created_at: "2023-01-01" },
      { id: 2, name: "Bob", allocation: 50, created_at: "2023-01-01" },
    ],
    expected: { series: [50, 50], labels: ["Alice", "Bob"] },
  },
  {
    beneficiaries: [
      { id: 1, name: "Alice", allocation: 30, created_at: "2023-01-01" },
      { id: 2, name: "Alice", allocation: 20, created_at: "2023-01-01" },
      { id: 3, name: "Bob", allocation: 50, created_at: "2023-01-01" },
    ],
    expected: { series: [50, 50], labels: ["Alice", "Bob"] },
  },
  {
    beneficiaries: [],
    expected: { series: [], labels: [] },
  },
];

testCases.forEach(({ beneficiaries, expected }) => {
  const description = `should return series ${JSON.stringify(
    expected.series
  )} and labels ${JSON.stringify(expected.labels)} for beneficiaries ${JSON.stringify(
    beneficiaries
  )}`;

  test(description, () => {
    const result = generateDesiredDistributionSeriesAndLabels(beneficiaries as Beneficiary[]);
    expect(result.series).toEqual(expected.series);
    expect(result.labels).toEqual(expected.labels);
  });
});
