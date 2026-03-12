import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { createCanvas, loadImage, Path2D } from '@napi-rs/canvas';
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

    // Use NEXT_PUBLIC_S3_MEDIA_URL in production (matches frontend getMediaUrl behaviour).
    // Falls back to S3_BUCKET/S3_REGION, then local filesystem.
    const s3MediaUrl = (process.env.NEXT_PUBLIC_S3_MEDIA_URL || '').trim().replace(/\/+$/, '');
    const s3BucketUrl = process.env.S3_BUCKET && process.env.S3_REGION
      ? `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`
      : null;
    const s3Base = s3MediaUrl || s3BucketUrl;
    const normalizedPath = mainImagePath.startsWith('/') ? mainImagePath.slice(1) : mainImagePath;

    let imageSrc: string;
    const isProduction = s3Base && process.env.NODE_ENV !== 'development';
    if (isProduction && normalizedPath.startsWith('assets/images/')) {
      imageSrc = `${s3Base}/visualiser/${normalizedPath}`;
    } else if (isProduction) {
      imageSrc = `${s3Base}/visualiser${mainImagePath.startsWith('/') ? mainImagePath : '/' + mainImagePath}`;
    } else {
      imageSrc = path.join(process.cwd(), 'public', normalizedPath);
    }

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',location:'render-image.ts:loadImage',message:'loading image',data:{imageSrc,isProduction:!!isProduction,nodeEnv:process.env.NODE_ENV},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log

    let img: Awaited<ReturnType<typeof loadImage>>;
    if (isProduction) {
      const fetchRes = await fetch(imageSrc);
      if (!fetchRes.ok) {
        console.error('[render-image] S3 fetch failed:', imageSrc, fetchRes.status);
        return res.status(502).json({ error: 'Failed to load room image' });
      }
      img = await loadImage(Buffer.from(await fetchRes.arrayBuffer()));
    } else {
      img = await loadImage(imageSrc);
    }

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',location:'render-image.ts:imageLoaded',message:'image loaded successfully',data:{width:img.width,height:img.height},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log

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
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',location:'render-image.ts:done',message:'render complete',data:{mode,bufferSize:buffer.byteLength,variant},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(buffer);
  } catch (err) {
    console.error('[render-image]', err);
    res.status(500).json({ error: 'Failed to render image' });
  }
}
