import { add } from "./add";

describe("Add Function", () => {
  test("adds two positive numbers", () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });

  test("adds two negative numbers", () => {
    const result = add(-5, -2);
    expect(result).toBe(-7);
  });

  test("adds zero to a number", () => {
    const result = add(0, 10);
    expect(result).toBe(10);
  });

  test("adds a number to zero", () => {
    const result = add(15, 0);
    expect(result).toBe(15);
  });

  test("handles decimal numbers", () => {
    const result = add(2.5, 3.1);
    expect(result).toBeCloseTo(5.6); // Use toBeCloseTo for floating-point numbers
  });
});
