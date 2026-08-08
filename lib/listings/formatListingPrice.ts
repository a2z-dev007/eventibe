const PLACEHOLDER_PRICES = ['Custom Quote', 'Price on request', 'Custom Quotes'];

export function cleanListingPrice(priceStr?: string): string {
  if (!priceStr) return '';
  return priceStr
    .replace(/\/[\s]*(pax|plate|plat)/gi, '')
    .replace(/per[\s]*(pax|plate|plat)/gi, '')
    .replace(/[\s]*(pax|plate|plat)/gi, '')
    .trim()
    .replace(/\/+$/, '')
    .trim();
}

export function formatPackagePrice(rawPrice?: string | number | null): string | undefined {
  if (rawPrice == null || rawPrice === '') return undefined;
  const num = typeof rawPrice === 'number' ? rawPrice : parseFloat(String(rawPrice));
  if (isNaN(num) || num <= 0) return undefined;
  return `From ₹${num.toLocaleString('en-IN')}`;
}

export function isDisplayablePrice(price?: string): boolean {
  if (!price) return false;
  if (price.includes('NaN')) return false;
  return !PLACEHOLDER_PRICES.some((p) => price.toLowerCase() === p.toLowerCase());
}
