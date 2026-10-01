// inventory.js
export function calculateStockBalance(currentStock, change) {
  const newBalance = currentStock + change;

  return Math.max(0, newBalance);
}