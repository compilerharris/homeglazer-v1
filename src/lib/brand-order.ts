/**
 * Brand display order - matches Advanced Colour Visualiser (Step 3: Choose a Paint Brand).
 * Used to sort brands consistently across product page, filters, and visualiser.
 * Order: Asian Paints, Sherwin Williams, Nerolac, Berger, JSW, Birla Opus, Dulux,
 *        JK Maxx, Shalimar, Nippon Paint, MRF Paints, RAL, NCS.
 */
export const BRAND_DISPLAY_ORDER = [
  'asian-paints',
  'sherwin-williams',
  'nerolac',
  'berger',
  'jsw',
  'birla-opus',
  'dulux',
  'jk-maxx',
  'shalimar',
  'nippon',
  'mrf-paints',
  'ral',
  'ncs',
] as const;

/** Slug to sort index; API slugs (e.g. kansai-nerolac, berger-paints, jsw-paints) map to visualiser order */
const SLUG_TO_INDEX: Record<string, number> = {
  'asian-paints': 0,
  'sherwin-williams': 1,
  'nerolac': 2,
  'kansai-nerolac': 2,
  'berger': 3,
  'berger-paints': 3,
  'jsw': 4,
  'jsw-paints': 4,
  'birla-opus': 5,
  'dulux': 6,
  'jk-maxx': 7,
  'shalimar': 8,
  'nippon': 9,
  'nippon-paint': 9,
  'mrf-paints': 10,
  'ral': 11,
  'ncs': 12,
};

export function getBrandSortIndex(slug: string): number {
  return SLUG_TO_INDEX[slug] ?? Number.MAX_SAFE_INTEGER;
}

export function sortBrandsByDisplayOrder<T extends { id: string }>(brands: T[]): T[] {
  return [...brands].sort((a, b) => {
    const ia = getBrandSortIndex(a.id);
    const ib = getBrandSortIndex(b.id);
    return ia - ib;
  });
}
