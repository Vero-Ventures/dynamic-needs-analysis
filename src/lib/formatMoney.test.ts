import { test, expect } from "bun:test";
import { formatMoney } from "./utils";

test("Formats a number with default currency (CAD)", () => {
  const formattedMoney = formatMoney(1234.56);

  expect(formattedMoney).toBe("$1,234.56");
});

test("Formats a number with USD currency", () => {
  const formattedMoney = formatMoney(1234.56, "USD");

  expect(formattedMoney).toBe("US$1,234.56");
});

test("Formats a number with EUR currency", () => {
  const formattedMoney = formatMoney(2468.9, "EUR");

  expect(formattedMoney).toBe("€2,468.90");
});

test("Formats a negative number with default currency (CAD)", () => {
  const formattedMoney = formatMoney(-1234.56);

  expect(formattedMoney).toBe("-$1,234.56");
});

test("Formats a number with no decimals", () => {
  const formattedMoney = formatMoney(1000);

  expect(formattedMoney).toBe("$1,000.00");
});

test("Formats a very large number with default currency (CAD)", () => {
  const formattedMoney = formatMoney(1234567890.12);

  expect(formattedMoney).toBe("$1,234,567,890.12");
});
