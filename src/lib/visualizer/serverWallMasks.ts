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
const mainImageCache = new Map<string, string>();

function normalizePath(urlPath: string): string {
  return urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
}

function getS3Base(): string {
  const publicBase = (process.env.NEXT_PUBLIC_S3_MEDIA_URL || '').trim().replace(/\/+$/, '');
  if (publicBase) return publicBase;
  const bucket = (process.env.S3_BUCKET || '').trim();
  const region = (process.env.S3_REGION || '').trim();
  if (bucket && region) return `https://${bucket}.s3.${region}.amazonaws.com`;
  return '';
}

function buildRemoteCandidates(relativePath: string, requestOrigin?: string): string[] {
  const normalized = normalizePath(relativePath);
  const candidates: string[] = [];

  const s3Base = getS3Base();
  if (s3Base) {
    const prefixed = normalized.startsWith('visualiser/') ? normalized : `visualiser/${normalized}`;
    candidates.push(`${s3Base}/${prefixed}`);
    candidates.push(`${s3Base}/${normalized}`);
  }

  const siteCandidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.SITE_URL,
    requestOrigin,
  ]
    .map((v) => (v || '').trim().replace(/\/+$/, ''))
    .filter(Boolean);

  for (const siteBase of siteCandidates) {
    candidates.push(`${siteBase}/${normalized}`);
  }

  return [...new Set(candidates)];
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

async function getManifest(requestOrigin?: string): Promise<RoomManifest[]> {
  if (manifestCache) return manifestCache;

  try {
    const raw = fs.readFileSync(MANIFEST_PATH, 'utf-8');
    manifestCache = JSON.parse(raw);
    return manifestCache!;
  } catch {
    // Fall back to remotely served static asset in production bundles.
  }

  const remoteCandidates = buildRemoteCandidates('visualizerManifest.json', requestOrigin);
  for (const remoteUrl of remoteCandidates) {
    const raw = await fetchText(remoteUrl);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw) as RoomManifest[];
      if (Array.isArray(parsed)) {
        manifestCache = parsed;
        return manifestCache!;
      }
    } catch {
      // Try next candidate
    }
  }

  throw new Error('Unable to load visualizer manifest');
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
  const relative = normalizePath(urlPath);
  return path.join(PROJECT_ROOT, 'public', relative);
}

async function readSvgContent(svgUrl: string, requestOrigin?: string): Promise<string | null> {
  const localPath = resolveSvgPath(svgUrl);
  if (fs.existsSync(localPath)) {
    return fs.readFileSync(localPath, 'utf-8');
  }

  const relative = normalizePath(svgUrl);
  const remoteCandidates = buildRemoteCandidates(relative, requestOrigin);
  for (const remoteUrl of remoteCandidates) {
    const svg = await fetchText(remoteUrl);
    if (svg) return svg;
  }

  return null;
}

export async function getWallMasksForVariant(
  variantName: string,
  requestOrigin?: string
): Promise<Record<string, string> | null> {
  const cached = wallMasksCache.get(variantName);
  if (cached) return cached;

  const manifest = await getManifest(requestOrigin);
  for (const room of manifest) {
    const variant = room.variants.find((v) => v.name === variantName);
    if (!variant) continue;

    const masks: Record<string, string> = {};
    for (const [wallKey, svgUrl] of Object.entries(variant.walls)) {
      const svgContent = await readSvgContent(svgUrl, requestOrigin);
      if (!svgContent) continue;
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

export async function getVariantMainImage(
  variantName: string,
  requestOrigin?: string
): Promise<string | null> {
  const cached = mainImageCache.get(variantName);
  if (cached) return cached;

  const manifest = await getManifest(requestOrigin);
  for (const room of manifest) {
    const variant = room.variants.find((v) => v.name === variantName);
    if (variant?.mainImage) {
      mainImageCache.set(variantName, variant.mainImage);
      return variant.mainImage;
    }
  }
  return null;
}
