/**
 * Shared product constants used by API, admin forms, and migration scripts.
 */

export const CATEGORY_OPTIONS = [
  'Interior',
  'Exterior',
  'Interior & Exterior Both',
  'Wood Finish',
  'Metal Finish',
  'Wood & Metal Finish',
  'Tile & Grout',
  'Waterproof',
] as const;

export const SUB_CATEGORY_OPTIONS = [
  'Putty (Base Material)',
  'Economy',
  'Premium',
  'Luxury',
  'Ultra Luxury',
  'Tool',
  'Texture',
  'Waterproof Chemical',
  'Adhesive',
] as const;

export type ProductCategory = (typeof CATEGORY_OPTIONS)[number];
export type ProductSubCategory = (typeof SUB_CATEGORY_OPTIONS)[number];

export function isValidCategory(value: string): value is ProductCategory {
  return (CATEGORY_OPTIONS as readonly string[]).includes(value);
}

export function isValidSubCategory(value: string): value is ProductSubCategory {
  return (SUB_CATEGORY_OPTIONS as readonly string[]).includes(value);
}

// Size unit: L = Liter, K = KG
export const SIZE_UNIT_OPTIONS = [
  { value: 'L', label: 'Liter (L)' },
  { value: 'K', label: 'KG (K)' },
] as const;
