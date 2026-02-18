/**
 * Resolves media paths to S3 URLs in production when NEXT_PUBLIC_S3_MEDIA_URL is set.
 * In dev or when S3 URL is not set, returns the path as-is (served from public/).
 */

const S3_BASE = process.env.NEXT_PUBLIC_S3_MEDIA_URL || '';

// Room folders that are uploaded under visualiser/ prefix (optional - kept in deploy when S3 not used)
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

  const normalized = path.startsWith('/') ? path.slice(1) : path;

  if (S3_BASE) {
    // Room images: S3 key is visualiser/assets/images/...
    if (normalized.startsWith('assets/images/')) {
      const rest = normalized.slice('assets/images/'.length);
      const firstSegment = rest.split('/')[0];
      if (VISUALISER_ROOM_FOLDERS.includes(firstSegment)) {
        return `${S3_BASE.replace(/\/$/, '')}/visualiser/${normalized}`;
      }
    }

    // uploads/* and media/*: S3 key matches path
    if (normalized.startsWith('uploads/') || normalized.startsWith('media/')) {
      return `${S3_BASE.replace(/\/$/, '')}/${normalized}`;
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
