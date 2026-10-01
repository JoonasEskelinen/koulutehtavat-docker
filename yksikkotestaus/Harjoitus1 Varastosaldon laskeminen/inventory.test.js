import { calculateStockBalance } from "./inventory.js";

describe("calculateStockBalance", () => {
  test("decreases stock when items are removed", () => {
    const currentStock = 10;
    const change = -3;

    const result = calculateStockBalance(currentStock, change);

    expect(result).toBe(7);
  });

  test("increases stock when items are added", () => {
    const result = calculateStockBalance(10, 5);

    expect(result).toBe(15);
  });

  test("returns zero when removing more items than are in stock", () => {
    const result = calculateStockBalance(2, -5);

    // TODO: This expectation is wrong. Fix the test without changing inventory.js.
    expect(result).toBe(0);
  });

  test("keeps stock unchanged when change is zero", () => {
    const result = calculateStockBalance(12, 0);

    expect(result).toBe(12);
  });
});