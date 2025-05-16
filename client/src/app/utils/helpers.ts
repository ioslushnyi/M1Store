export function formatPrice(price: number | undefined) {
  return `$${price && (price / 100).toFixed(2)}`;
}
