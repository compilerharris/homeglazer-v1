import type { NextApiRequest, NextApiResponse } from 'next';

const DEFAULT_BASE = 'https://homeglazer.com';
const PRODUCTION_HOSTS = ['homeglazer.com', 'www.homeglazer.com'];

function getBaseUrlFromRequest(req: NextApiRequest): string | null {
  const host = (req.headers['x-forwarded-host'] as string) || req.headers.host;
  const proto = (req.headers['x-forwarded-proto'] as string) || (req.headers.host?.includes('localhost') ? 'http' : 'https');
  if (!host) return null;
  const hostname = host.split(':')[0];
  if (!PRODUCTION_HOSTS.includes(hostname)) return null;
  return `${proto}://${host}`.replace(/\/$/, '');
}

/** Sitemaps linked from this index (path only) */
const SITEMAP_PATHS = [
  '/sitemap.xml',
  '/sitemap-colour-visualiser.xml',
  '/sitemap-products-asian-paints.xml',
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  const baseUrlFromRequest = getBaseUrlFromRequest(req);
  const baseUrl = baseUrlFromRequest || process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_BASE;
  const lastmod = new Date().toISOString().split('T')[0];

  const sitemapEntries = SITEMAP_PATHS.map(
    (path) => `  <sitemap>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>
`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(xml);
}
