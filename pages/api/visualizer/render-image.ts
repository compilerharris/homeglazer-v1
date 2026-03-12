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

    // Use same URL as frontend (getMediaUrl): NEXT_PUBLIC_S3_MEDIA_URL/visualiser/... in prod.
    // Load via fetch then buffer so serverless has no native HTTPS/SSL issues with loadImage(url).
    const normalizedPath = mainImagePath.replace(/^\//, '');
    const s3Base = (process.env.NEXT_PUBLIC_S3_MEDIA_URL || '').trim().replace(/\/+$/, '');
    const isProductionS3 = s3Base && process.env.NODE_ENV !== 'development';

    let img: Awaited<ReturnType<typeof loadImage>>;
    if (isProductionS3 && normalizedPath.startsWith('assets/images/')) {
      const s3Url = `${s3Base}/visualiser/${normalizedPath}`;
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',location:'render-image.ts:s3-fetch',message:'attempting S3 fetch',data:{s3Url,s3Base,normalizedPath,nodeEnv:process.env.NODE_ENV},timestamp:Date.now()})}).catch(()=>{});
      // #endregion agent log
      const fetchRes = await fetch(s3Url);
      if (!fetchRes.ok) {
        console.error('[render-image] S3 fetch failed:', s3Url, fetchRes.status);
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',location:'render-image.ts:s3-fetch-failed',message:'S3 fetch failed',data:{s3Url,status:fetchRes.status},timestamp:Date.now()})}).catch(()=>{});
        // #endregion agent log
        return res.status(502).json({ error: 'Failed to load room image' });
      }
      const arrayBuffer = await fetchRes.arrayBuffer();
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',location:'render-image.ts:s3-fetch-ok',message:'S3 fetch succeeded',data:{s3Url,bufferSize:arrayBuffer.byteLength},timestamp:Date.now()})}).catch(()=>{});
      // #endregion agent log
      img = await loadImage(Buffer.from(arrayBuffer));
    } else {
      const localPath = path.join(process.cwd(), 'public', normalizedPath);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',location:'render-image.ts:local-load',message:'loading local image',data:{localPath,s3Base:s3Base||'(empty)',nodeEnv:process.env.NODE_ENV},timestamp:Date.now()})}).catch(()=>{});
      // #endregion agent log
      img = await loadImage(localPath);
    }
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
