export function canFulfillOrder(currentStock, orderedQuantity) {
	return currentStock >= orderedQuantity;
}
