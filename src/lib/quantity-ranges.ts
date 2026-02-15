/**
 * Quantity/weight range filter for products.
 * Parses size keys (1L, 4L, 10L, 1K, 50gK, etc.) and groups into ranges.
 */

export const QUANTITY_RANGES = [
  { value: 'lt1', label: '< 1' },
  { value: '1-5', label: '1-5' },
  { value: '6-10', label: '6-10' },
  { value: '11-20', label: '11-20' },
  { value: '21-30', label: '21-30' },
  { value: '31-40', label: '31-40' },
  { value: '41-50', label: '41-50' },
  { value: '50+', label: '50+' },
] as const;

export type QuantityRangeValue = (typeof QUANTITY_RANGES)[number]['value'];

/** Parse a single size part to numeric value (L, K, P, gK, gL). */
function parseSizePart(part: string, fullKeyHasUnit: boolean): number {
  const trimmed = part.trim();
  const m = trimmed.match(/^(\d+(?:\.\d+)?)\s*(g)?\s*[LKP]+$/i);
  if (m) {
    const num = parseFloat(m[1]);
    const isGrams = !!m[2];
    return isGrams ? num / 1000 : num;
  }
  // Fallback: bare number when key has unit (e.g. "20" in "20 & 50L")
  const bareNum = trimmed.match(/^(\d+(?:\.\d+)?)\s*$/);
  if (bareNum && fullKeyHasUnit) return parseFloat(bareNum[1]);
  return NaN;
}

/** Get all numeric size values from a product's prices. */
export function getProductSizeValues(prices: Record<string, number> | null | undefined): number[] {
  if (!prices || typeof prices !== 'object') return [];
  const values: number[] = [];
  for (const key of Object.keys(prices)) {
    if (!prices[key]) continue;
    const hasUnit = /[LKP]/i.test(key);
    for (const part of key.split(/[&,]/)) {
      const v = parseSizePart(part, hasUnit);
      if (!Number.isNaN(v)) values.push(v);
    }
  }
  return values;
}

/** Check if any product size falls within the given range. */
export function productHasSizeInRange(
  prices: Record<string, number> | null | undefined,
  rangeValue: QuantityRangeValue
): boolean {
  const values = getProductSizeValues(prices);
  if (values.length === 0) return false;

  return values.some((v) => {
    if (rangeValue === 'lt1') return v < 1;
    if (rangeValue === '1-5') return v >= 1 && v < 6;
    if (rangeValue === '6-10') return v >= 6 && v < 11;
    if (rangeValue === '11-20') return v >= 11 && v < 21;
    if (rangeValue === '21-30') return v >= 21 && v < 31;
    if (rangeValue === '31-40') return v >= 31 && v < 41;
    if (rangeValue === '41-50') return v >= 41 && v < 51;
    if (rangeValue === '50+') return v >= 50;
    return false;
  });
}
