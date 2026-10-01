import { canFulfillOrder } from "./availability.js";

describe("canFulfillOrder", () => {
	test("returns true when stock is enough for the order", () => {
		expect(canFulfillOrder(10, 3)).toBe(true);
	});

	test("returns false when stock is not enough for the order", () => {
		expect(canFulfillOrder(2, 5)).toBe(false);
	});

	test("returns true when stock exactly matches the order", () => {
		expect(canFulfillOrder(10, 10)).toBe(true);
	});

	test("returns true when the order quantity is zero", () => {
		expect(canFulfillOrder(0, 0)).toBe(true);
	});
});