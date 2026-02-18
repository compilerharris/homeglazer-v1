import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { Path2D } from 'path2d';
import { getWallMasksForVariant, getVariantMainImage } from '../../../src/lib/visualizer/serverWallMasks';

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

export const config = {
  api: { bodyParser: { sizeLimit: '32kb' } },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { variant, mode = 'single', color, assignments, wallKeys } = req.body || {};

    if (!variant || typeof variant !== 'string') {
      return res.status(400).json({ error: 'variant is required' });
    }

    const wallMasks = getWallMasksForVariant(variant);
    const mainImagePath = getVariantMainImage(variant);

    if (!wallMasks || Object.keys(wallMasks).length === 0) {
      return res.status(400).json({ error: `Unknown variant: ${variant}` });
    }
    if (!mainImagePath) {
      return res.status(400).json({ error: `No main image for variant: ${variant}` });
    }

    // Load from S3 in prod (Amplify) or local file in dev. S3 reduces deployment size (220MB limit).
    const baseUrl = process.env.S3_BUCKET && process.env.S3_REGION
      ? `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/visualiser`
      : null;
    const imageSrc = baseUrl
      ? baseUrl + (mainImagePath.startsWith('/') ? mainImagePath : '/' + mainImagePath)
      : path.join(process.cwd(), 'public', mainImagePath.startsWith('/') ? mainImagePath.slice(1) : mainImagePath);

    const img = await loadImage(imageSrc as string);
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    const ctx = canvas.getContext('2d');

    const imgWidth = img.width;
    const imgHeight = img.height;
    const scale = Math.max(CANVAS_WIDTH / imgWidth, CANVAS_HEIGHT / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const x = (CANVAS_WIDTH - drawWidth) / 2;
    const y = (CANVAS_HEIGHT - drawHeight) / 2;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);

    if (mode === 'single' && color) {
      const keys = Array.isArray(wallKeys) && wallKeys.length > 0
        ? wallKeys.filter((k: string) => wallMasks[k])
        : Object.keys(wallMasks);
      const combinedPath = keys.map((k: string) => wallMasks[k]).filter(Boolean).join(' ');
      if (combinedPath) {
        const pathObj = new Path2D(combinedPath);
        ctx.save();
        (ctx as unknown as { clip(path: Path2D): void }).clip(pathObj);
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.restore();
      }
    } else if (mode === 'advanced' && assignments && typeof assignments === 'object') {
      for (const wallKey of Object.keys(wallMasks)) {
        const pathData = wallMasks[wallKey];
        const wallColor = assignments[wallKey];
        if (!pathData || !wallColor) continue;
        const pathObj = new Path2D(pathData);
        ctx.save();
        (ctx as unknown as { clip(path: Path2D): void }).clip(pathObj);
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = wallColor;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.restore();
      }
    }

    const buffer = await canvas.encode('png');
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(buffer);
  } catch (err) {
    console.error('[render-image]', err);
    res.status(500).json({ error: 'Failed to render image' });
  }
}
