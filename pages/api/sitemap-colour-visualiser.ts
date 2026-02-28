import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

const STATIC_PATH = path.join(process.cwd(), 'public', 'sitemap-colour-visualiser.xml');
const DEFAULT_BASE = 'https://homeglazer.com';
const PRODUCTION_HOSTS = ['homeglazer.com', 'www.homeglazer.com'];

function getBaseUrlFromRequest(req: NextApiRequest): string | null {
  const host = (req.headers['x-forwarded-host'] as string) || req.headers.host;
  const proto = (req.headers['x-forwarded-proto'] as string) || (req.headers.host?.includes('localhost') ? 'http' : 'https');
  if (!host) return null;
  const hostname = host.split(':')[0];
  // Only use request host when it's production; otherwise preview/staging (e.g. Amplify) would get sitemap URLs with preview domain
  if (!PRODUCTION_HOSTS.includes(hostname)) return null;
  return `${proto}://${host}`.replace(/\/$/, '');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const baseUrlFromRequest = getBaseUrlFromRequest(req);
  const baseUrl = baseUrlFromRequest || process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_BASE;

  // Use static file only when base URL is non-www production (or no request host), so we don't serve wrong-domain XML
  const staticMatchesRequest = baseUrl === DEFAULT_BASE || !baseUrlFromRequest;
  try {
    if (staticMatchesRequest && fs.existsSync(STATIC_PATH)) {
      const xml = fs.readFileSync(STATIC_PATH, 'utf8');
      return res.status(200).send(xml);
    }
  } catch {
    // fall through to generate
  }

  const { getColourVisualiserSitemapXml } = require('../../scripts/lib/colour-visualiser-sitemap');
  const xml = getColourVisualiserSitemapXml(baseUrl);
  return res.status(200).send(xml);
}
