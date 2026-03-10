/**
 * Generate optimized thumbnails for advanced visualiser variants.
 *
 * - Input:  public/visualizerManifest.json
 * - Output images: public/assets/images/visualizer-thumbnails/<roomType>--<variantName>.webp
 * - Output metadata: adds thumbnailImage to each variant in visualizerManifest.json
 *
 * Usage:
 *   npx tsx scripts/generate-visualiser-thumbnails.ts
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PROJECT_ROOT = process.cwd();
const MANIFEST_PATH = path.join(PROJECT_ROOT, 'public', 'visualizerManifest.json');
const THUMBNAIL_DIR = path.join(PROJECT_ROOT, 'public', 'assets', 'images', 'visualizer-thumbnails');

const THUMB_WIDTH = 316;
const THUMB_HEIGHT = 220;

interface WallManifest {
  [wallKey: string]: string;
}

interface VariantManifest {
  name: string;
  label: string;
  mainImage: string;
  thumbnailImage?: string;
  walls: WallManifest;
}

interface RoomManifest {
  roomType: string;
  label: string;
  variants: VariantManifest[];
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function normalisePublicPath(p: string): string {
  if (!p) return p;
  return p.startsWith('/') ? p.slice(1) : p;
}

function makeThumbnailFilename(roomType: string, variantName: string): string {
  const safeRoom = roomType.replace(/[^a-zA-Z0-9_-]+/g, '-').toLowerCase();
  const safeVariant = variantName.replace(/[^a-zA-Z0-9_-]+/g, '-').toLowerCase();
  return `${safeRoom}--${safeVariant}.webp`;
}

async function generateThumbnails() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(`visualizerManifest.json not found at ${MANIFEST_PATH}`);
  }

  const raw = fs.readFileSync(MANIFEST_PATH, 'utf-8');
  const manifest: RoomManifest[] = JSON.parse(raw);

  ensureDir(THUMBNAIL_DIR);

  let processed = 0;
  let skipped = 0;

  for (const room of manifest) {
    for (const variant of room.variants) {
      if (!variant.mainImage) {
        skipped++;
        continue;
      }

      const srcRelative = normalisePublicPath(variant.mainImage);
      const srcPath = path.join(PROJECT_ROOT, 'public', srcRelative);

      if (!fs.existsSync(srcPath)) {
        console.warn(`[generate-visualiser-thumbnails] Source image missing, skipping: ${srcPath}`);
        skipped++;
        continue;
      }

      const fileName = makeThumbnailFilename(room.roomType, variant.name);
      const destPath = path.join(THUMBNAIL_DIR, fileName);

      try {
        await sharp(srcPath)
          .resize(THUMB_WIDTH, THUMB_HEIGHT, {
            fit: 'cover',
            position: 'centre', // center crop
          })
          .webp({ quality: 80 })
          .toFile(destPath);

        variant.thumbnailImage = `/assets/images/visualizer-thumbnails/${fileName}`;
        processed++;
      } catch (err) {
        console.error(`[generate-visualiser-thumbnails] Failed to generate thumbnail for ${srcPath}`, err);
        skipped++;
      }
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');

  console.log(
    `[generate-visualiser-thumbnails] Done. Processed ${processed} variants, skipped ${skipped}. Thumbnails in ${THUMBNAIL_DIR}`,
  );
}

generateThumbnails().catch((err) => {
  console.error('[generate-visualiser-thumbnails] Fatal error', err);
  process.exitCode = 1;
});

