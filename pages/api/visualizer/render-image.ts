import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { createCanvas, loadImage, Path2D } from '@napi-rs/canvas';
import { getWallMasksForVariant, getVariantMainImage } from '../../../src/lib/visualizer/serverWallMasks';

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

export const config = {
  api: { bodyParser: { sizeLimit: '32kb' } },
};

function toSingleHeaderValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] || '';
  return value || '';
}

function buildRequestOrigin(req: NextApiRequest): string | undefined {
  const host = toSingleHeaderValue(req.headers['x-forwarded-host']) || toSingleHeaderValue(req.headers.host);
  if (!host) return undefined;
  const proto = toSingleHeaderValue(req.headers['x-forwarded-proto']) || (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

function buildImageSourceCandidates(mainImagePath: string, requestOrigin?: string): string[] {
  const normalizedPath = mainImagePath.startsWith('/') ? mainImagePath.slice(1) : mainImagePath;
  const s3MediaUrl = (process.env.NEXT_PUBLIC_S3_MEDIA_URL || '').trim().replace(/\/+$/, '');
  const s3BucketUrl = process.env.S3_BUCKET && process.env.S3_REGION
    ? `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`
    : '';
  const s3Base = s3MediaUrl || s3BucketUrl;
  const siteBase = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    requestOrigin ||
    ''
  ).trim().replace(/\/+$/, '');

  const candidates: string[] = [];
  if (s3Base) {
    const prefixed = normalizedPath.startsWith('visualiser/') ? normalizedPath : `visualiser/${normalizedPath}`;
    candidates.push(`${s3Base}/${prefixed}`);
    candidates.push(`${s3Base}/${normalizedPath}`);
  }
  if (siteBase) {
    candidates.push(`${siteBase}/${normalizedPath}`);
  }
  if (process.env.NODE_ENV === 'development') {
    candidates.push(path.join(process.cwd(), 'public', normalizedPath));
  }

  return [...new Set(candidates)];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { variant, mode = 'single', color, assignments, wallKeys } = req.body || {};

    if (!variant || typeof variant !== 'string') {
      return res.status(400).json({ error: 'variant is required' });
    }

    const requestOrigin = buildRequestOrigin(req);
    const wallMasks = await getWallMasksForVariant(variant, requestOrigin);
    const mainImagePath = await getVariantMainImage(variant, requestOrigin);

    if (!wallMasks || Object.keys(wallMasks).length === 0) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',runId:'run-3',hypothesisId:'H5',location:'render-image.ts:maskLookupFailed',message:'variant masks missing',data:{variant,requestOrigin,nodeEnv:process.env.NODE_ENV},timestamp:Date.now()})}).catch(()=>{});
      // #endregion agent log
      return res.status(400).json({ error: `Unknown variant: ${variant}` });
    }
    if (!mainImagePath) {
      return res.status(400).json({ error: `No main image for variant: ${variant}` });
    }
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',runId:'run-3',hypothesisId:'H5',location:'render-image.ts:requestShape',message:'render request parsed',data:{variant,mode,maskCount:Object.keys(wallMasks).length,assignmentCount:assignments&&typeof assignments==='object'?Object.keys(assignments).length:0,mainImagePath,requestOrigin,nodeEnv:process.env.NODE_ENV},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log

    const sourceCandidates = buildImageSourceCandidates(mainImagePath, requestOrigin);
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',runId:'run-3',hypothesisId:'H6',location:'render-image.ts:imageSourceCandidates',message:'built image source candidates',data:{candidateCount:sourceCandidates.length,firstCandidate:sourceCandidates[0]||''},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log

    let img: Awaited<ReturnType<typeof loadImage>> | null = null;
    let loadedFrom = '';
    for (const source of sourceCandidates) {
      try {
        if (/^https?:\/\//i.test(source)) {
          const fetchRes = await fetch(source);
          if (!fetchRes.ok) continue;
          img = await loadImage(Buffer.from(await fetchRes.arrayBuffer()));
        } else {
          img = await loadImage(source);
        }
        loadedFrom = source;
        break;
      } catch {
        // Try next candidate source
      }
    }

    if (!img) {
      console.error('[render-image] Failed to load room image from all sources:', sourceCandidates);
      return res.status(502).json({ error: 'Failed to load room image' });
    }

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',runId:'run-3',hypothesisId:'H6',location:'render-image.ts:imageLoaded',message:'image loaded successfully',data:{width:img.width,height:img.height,loadedFrom},timestamp:Date.now()})}).catch(()=>{});
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
        ctx.clip(pathObj);
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
        ctx.clip(pathObj);
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = wallColor;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.restore();
      }
    }

    const buffer = await canvas.encode('png');
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/743b1d01-8481-4e0a-a23c-c93d930c801e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'3eba01'},body:JSON.stringify({sessionId:'3eba01',runId:'run-3',hypothesisId:'H7',location:'render-image.ts:done',message:'render complete',data:{mode,bufferSize:buffer.byteLength,variant},timestamp:Date.now()})}).catch(()=>{});
    // #endregion agent log
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(buffer);
  } catch (err) {
    console.error('[render-image]', err);
    res.status(500).json({ error: 'Failed to render image' });
  }
}
