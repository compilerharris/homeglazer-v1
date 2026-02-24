#!/usr/bin/env npx tsx
/**
 * Submit URLs to IndexNow for faster indexing on Bing and Yandex.
 * Run after deploy: npx tsx scripts/submit-indexnow.ts
 * On first run, creates public/<key>.txt for verification. Deploy before submitting.
 */
import * as fs from 'fs';
import * as path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://homeglazer.com';
const KEY_FILE = process.env.INDEXNOW_KEY_FILE || 'indexnow-key.txt';

const PRIORITY_URLS = [
  '',
  '/about',
  '/contact',
  '/products',
  '/blog',
  '/services/painting',
  '/services/wall-decor',
  '/services/wood-services',
  '/colour-visualiser',
  '/faq',
  '/gallery',
  '/testimonials',
  '/paint-budget-calculator',
  '/terms-and-condition',
  '/privacy-policy',
  '/cookie-policy',
];

async function submitIndexNow() {
  const urls = PRIORITY_URLS.map((p) => `${SITE_URL}${p}`.replace(/\/$/, '') || SITE_URL);
  let key = process.env.INDEXNOW_KEY;

  const publicDir = path.join(process.cwd(), 'public');
  const keyPath = path.join(publicDir, KEY_FILE);

  if (!key) {
    if (fs.existsSync(keyPath)) {
      key = fs.readFileSync(keyPath, 'utf8').trim();
    } else {
      key = crypto.randomUUID();
      fs.mkdirSync(publicDir, { recursive: true });
      fs.writeFileSync(keyPath, key);
      console.log('Created', keyPath, '- deploy your site before submitting so', SITE_URL + '/' + KEY_FILE, 'is reachable');
    }
  }

  const keyLocation = `${SITE_URL}/${KEY_FILE}`;
  const body = {
    host: new URL(SITE_URL).hostname,
    key,
    keyLocation,
    urlList: [...new Set(urls)],
  };

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (res.ok) {
    console.log('IndexNow: Submitted', urls.length, 'URLs successfully');
  } else {
    console.error('IndexNow error:', res.status, await res.text());
    process.exit(1);
  }
}

submitIndexNow();
