import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

const STATIC_PATH = path.join(process.cwd(), 'public', 'sitemap-colour-visualiser.xml');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  // Prefer static file when present (build output)
  try {
    if (fs.existsSync(STATIC_PATH)) {
      const xml = fs.readFileSync(STATIC_PATH, 'utf8');
      return res.status(200).send(xml);
    }
  } catch {
    // fall through to generate
  }

  // Generate on-the-fly when static file not available (e.g. serverless)
  const baseUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';
  const { getColourVisualiserSitemapXml } = require('../../scripts/lib/colour-visualiser-sitemap');
  const xml = getColourVisualiserSitemapXml(baseUrl);
  return res.status(200).send(xml);
}
