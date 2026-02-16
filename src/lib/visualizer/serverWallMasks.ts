/**
 * Server-only: Loads SVG path data from disk. Never import in client code.
 * Used only by API routes for server-side rendering.
 */

import * as fs from 'fs';
import * as path from 'path';

const PROJECT_ROOT = process.cwd();
const MANIFEST_PATH = path.join(PROJECT_ROOT, 'public', 'visualizerManifest.json');

interface WallManifest {
  [wallKey: string]: string;
}

interface VariantManifest {
  name: string;
  label: string;
  mainImage: string;
  walls: WallManifest;
}

interface RoomManifest {
  roomType: string;
  label: string;
  variants: VariantManifest[];
}

let manifestCache: RoomManifest[] | null = null;
const wallMasksCache = new Map<string, Record<string, string>>();

function getManifest(): RoomManifest[] {
  if (manifestCache) return manifestCache;
  const raw = fs.readFileSync(MANIFEST_PATH, 'utf-8');
  manifestCache = JSON.parse(raw);
  return manifestCache!;
}

function extractPathFromSvg(svgContent: string): string {
  const pathMatch = svgContent.match(/<path[^>]*\sd=["']([^"']+)["'][^>]*>/i);
  if (pathMatch && pathMatch[1]) return pathMatch[1].trim();
  const allPaths = svgContent.matchAll(/<path[^>]*d=["']([^"']+)["'][^>]*>/gi);
  const first = allPaths.next();
  if (first.value && first.value[1]) return first.value[1].trim();
  return '';
}

function resolveSvgPath(urlPath: string): string {
  const relative = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
  return path.join(PROJECT_ROOT, 'public', relative);
}

export function getWallMasksForVariant(variantName: string): Record<string, string> | null {
  const cached = wallMasksCache.get(variantName);
  if (cached) return cached;

  const manifest = getManifest();
  for (const room of manifest) {
    const variant = room.variants.find((v) => v.name === variantName);
    if (!variant) continue;

    const masks: Record<string, string> = {};
    for (const [wallKey, svgUrl] of Object.entries(variant.walls)) {
      const filePath = resolveSvgPath(svgUrl);
      if (!fs.existsSync(filePath)) continue;
      const svgContent = fs.readFileSync(filePath, 'utf-8');
      const pathData = extractPathFromSvg(svgContent);
      if (pathData) masks[wallKey] = pathData;
    }
    if (Object.keys(masks).length > 0) {
      wallMasksCache.set(variantName, masks);
      return masks;
    }
  }
  return null;
}

export function getVariantMainImage(variantName: string): string | null {
  const manifest = getManifest();
  for (const room of manifest) {
    const variant = room.variants.find((v) => v.name === variantName);
    if (variant?.mainImage) return variant.mainImage;
  }
  return null;
}
