import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import { prisma } from '@/lib/prisma';

const STATIC_PATH = path.join(process.cwd(), 'public', 'sitemap-products-asian-paints.xml');
const DEFAULT_BASE = 'https://homeglazer.com';
const PRODUCTION_HOSTS = ['homeglazer.com', 'www.homeglazer.com'];
const ASIAN_PAINTS_SLUG = 'asian-paints';

function getBaseUrlFromRequest(req: NextApiRequest): string | null {
  const host = (req.headers['x-forwarded-host'] as string) || req.headers.host;
  const proto = (req.headers['x-forwarded-proto'] as string) || (req.headers.host?.includes('localhost') ? 'http' : 'https');
  if (!host) return null;
  const hostname = host.split(':')[0];
  if (!PRODUCTION_HOSTS.includes(hostname)) return null;
  return `${proto}://${host}`.replace(/\/$/, '');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const baseUrlFromRequest = getBaseUrlFromRequest(req);
  const baseUrl = baseUrlFromRequest || process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_BASE;

  const staticMatchesRequest = baseUrl === DEFAULT_BASE || !baseUrlFromRequest;
  try {
    if (staticMatchesRequest && fs.existsSync(STATIC_PATH)) {
      const xml = fs.readFileSync(STATIC_PATH, 'utf8');
      return res.status(200).send(xml);
    }
  } catch {
    // fall through to generate
  }

  try {
    const products = await prisma.product.findMany({
      where: { brand: { slug: ASIAN_PAINTS_SLUG } },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });

    const { entriesToSitemapXml } = require('../../scripts/lib/sitemap-utils');
    const entries = products.map((p: { slug: string; updatedAt: Date | null }) => ({
      loc: `${baseUrl}/products/${ASIAN_PAINTS_SLUG}/${p.slug}`,
      lastmod: p.updatedAt?.toISOString?.() || new Date().toISOString(),
    }));

    const xml = entriesToSitemapXml(entries);
    return res.status(200).send(xml);
  } catch (err) {
    console.error('sitemap-products-asian-paints:', err);
    res.status(500).send('<?xml version="1.0"?><error>Failed to generate sitemap</error>');
  }
}
