import { cn } from "./utils";
import { test, expect } from "bun:test";

test("should merge class names correctly", () => {
  const result = cn("class1", "class2");
  expect(result).toBe("class1 class2");
});

test("should handle conditional class names", () => {
  const result = cn("class1", false && "class2", "class3");
  expect(result).toBe("class1 class3");
});

test("should handle arrays of class names", () => {
  const result = cn(["class1", "class2"], "class3");
  expect(result).toBe("class1 class2 class3");
});

test("should handle null and undefined values", () => {
  const result = cn("class1", null, undefined, "class2");
  expect(result).toBe("class1 class2");
});

test("should handle a mix of strings, arrays, and objects", () => {
  const result = cn("class1", ["class2", { class3: true, class4: false }]);
  expect(result).toBe("class1 class2 class3");
});

test("should handle objects with conditional class names", () => {
  const result = cn({ class1: true, class2: false, class3: true });
  expect(result).toBe("class1 class3");
});
