export function calculateRestockQuantity(currentStock, targetStock) {
  // Tilattava määrä saadaan vähentämällä nykyinen varasto tavoitevarastosta.
  const quantityToOrder = targetStock - currentStock;

  return Math.max(0, quantityToOrder);
}