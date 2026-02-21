/**
 * Proxies OG images from S3 so Facebook/WhatsApp crawlers fetch from homeglazer.com
 * instead of amazonaws.com (which can fail with crawler restrictions).
 */
import type { NextApiRequest, NextApiResponse } from 'next';

const S3_BASE = (process.env.NEXT_PUBLIC_S3_MEDIA_URL || '').trim().replace(/\/+$/, '');
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com').replace(/\/+$/, '');

const VISUALISER_ROOM_FOLDERS = [
  'bedroom', 'bathroom', 'kitchen', 'livingroom', 'homeoffice',
  'kidsroom', 'office', 'outdoor', 'maingate',
];

function getContentTypeFromPath(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  const map: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
  };
  return map[ext] || 'image/png';
}

function buildImageUrl(path: string): string | null {
  const normalized = (path || '').replace(/^\/+/, '');
  if (!normalized || normalized.includes('..')) return null;

  if (S3_BASE) {
    if (normalized.startsWith('assets/images/')) {
      const rest = normalized.slice('assets/images/'.length);
      const firstSegment = rest.split('/')[0];
      if (VISUALISER_ROOM_FOLDERS.includes(firstSegment)) {
        return `${S3_BASE}/visualiser/${normalized}`;
      }
      if (rest.startsWith('brand-logos/')) {
        return `${S3_BASE}/${normalized}`;
      }
    }
    if (normalized.startsWith('uploads/') || normalized.startsWith('media/')) {
      return `${S3_BASE}/${normalized}`;
    }
    return `${S3_BASE}/${normalized}`;
  }

  return `${SITE_URL}/${normalized}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).setHeader('Allow', 'GET').end();
  }

  const path = typeof req.query.path === 'string' ? req.query.path : null;
  if (!path) {
    return res.status(400).json({ error: 'Missing path query parameter' });
  }

  const imageUrl = buildImageUrl(path);
  if (!imageUrl) {
    return res.status(400).json({ error: 'Invalid path' });
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Image not found' });
    }

    const contentType = response.headers.get('content-type') || getContentTypeFromPath(path);
    const buffer = await response.arrayBuffer();

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error('[og-image] Fetch error:', err);
    return res.status(502).json({ error: 'Failed to fetch image' });
  }
}
