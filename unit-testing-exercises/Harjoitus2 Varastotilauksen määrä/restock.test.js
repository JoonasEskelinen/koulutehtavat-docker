import { calculateRestockQuantity } from "./restock.js";

describe("calculateRestockQuantity", () => {
  test("orders enough items to reach the target stock", () => {
    const currentStock = 3;
    const targetStock = 10;

    const result = calculateRestockQuantity(currentStock, targetStock);

    expect(result).toBe(7);
  });

  test("returns zero when current stock equals target stock", () => {
    const result = calculateRestockQuantity(10, 10);

    expect(result).toBe(0);
  });

  test("returns zero when current stock is already above target stock", () => {
    const result = calculateRestockQuantity(15, 10);

    expect(result).toBe(0);
  });

  test("orders the complete target quantity when current stock is zero", () => {
    const result = calculateRestockQuantity(0, 20);

    expect(result).toBe(20);
  });
});