/**
 * Resolves media paths to S3 URLs in production when NEXT_PUBLIC_S3_MEDIA_URL is set.
 * In dev or when S3 URL is not set, returns the path as-is (served from public/).
 *
 * S3 setup (required for Amplify production):
 * 1. Set NEXT_PUBLIC_S3_MEDIA_URL in Amplify = https://<bucket>.s3.<region>.amazonaws.com
 * 2. Run: npm run upload:visualiser  (room images for advanced/basic visualiser)
 * 3. Run: npm run upload:media       (uploads/, media/)
 */

const S3_BASE = (process.env.NEXT_PUBLIC_S3_MEDIA_URL || '').trim().replace(/\/+$/, '');

// Room folders uploaded by npm run upload:visualiser to S3 key visualiser/assets/images/<folder>/...
const VISUALISER_ROOM_FOLDERS = [
  'bedroom',
  'bathroom',
  'kitchen',
  'livingroom',
  'homeoffice',
  'kidsroom',
  'office',
  'outdoor',
  'maingate',
];

export function getMediaUrl(path: string): string {
  if (!path || typeof path !== 'string') return path;

  // Already absolute URL - return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalized = path.replace(/^\/+/, '');
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (S3_BASE && !isDevelopment) {
    // Room images: S3 key is visualiser/assets/images/<room>/...
    if (normalized.startsWith('assets/images/')) {
      const rest = normalized.slice('assets/images/'.length);
      const firstSegment = rest.split('/')[0];
      if (VISUALISER_ROOM_FOLDERS.includes(firstSegment)) {
        const s3Url = `${S3_BASE}/visualiser/${normalized}`;
        if (typeof window !== 'undefined') {
          console.log('[getMediaUrl] Converting to S3:', path, '->', s3Url, 'S3_BASE:', S3_BASE);
        }
        return s3Url;
      }
      // Brand logos: S3 key is assets/images/brand-logos/...
      // Only use S3 in production - in development, serve from local public folder
      if (rest.startsWith('brand-logos/')) {
        const s3Url = `${S3_BASE}/${normalized}`;
        // #region agent log
        if (typeof window !== 'undefined') {
          fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'ddbf9a'},body:JSON.stringify({sessionId:'ddbf9a',location:'mediaUrl.ts:51',message:'Converting brand logo to S3 URL',data:{originalPath:path,normalized,resolvedS3Url:s3Url,S3_BASE},timestamp:Date.now(),runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        }
        // #endregion
        return s3Url;
      }
    }

    // uploads/* and media/*: S3 key matches path (uploaded by npm run upload:media)
    if (normalized.startsWith('uploads/') || normalized.startsWith('media/')) {
      return `${S3_BASE}/${normalized}`;
    }
  } else {
    // Log warning only in production if S3_BASE is not set but we're trying to load room images
    // In development, we serve from local public folder, so no warning needed
    if (!isDevelopment && normalized.startsWith('assets/images/') && typeof window !== 'undefined') {
      const rest = normalized.slice('assets/images/'.length);
      const firstSegment = rest.split('/')[0];
      if (VISUALISER_ROOM_FOLDERS.includes(firstSegment)) {
        console.warn('[getMediaUrl] NEXT_PUBLIC_S3_MEDIA_URL not set. Room images may not load in production:', path);
      }
    }
  }

  return path.startsWith('/') ? path : `/${path}`;
}

/** Returns absolute URL for media (for og:image, etc). Uses S3 when set, else siteUrl + path. */
export function getAbsoluteMediaUrl(path: string, siteUrl: string): string {
  const url = getMediaUrl(path);
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${siteUrl.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`;
}
