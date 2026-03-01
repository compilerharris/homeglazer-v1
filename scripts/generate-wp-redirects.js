/**
 * Parses Old-WordPress-Pages.csv and generates redirect mappings.
 * Run: node scripts/generate-wp-redirects.js
 * Output: JSON to stdout, or use --write to update wp-redirects.json
 */
const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../public/Old-WordPress-Pages.csv');
const outputPath = path.join(__dirname, '../wp-redirects.json');
const csv = fs.readFileSync(csvPath, 'utf8');
const lines = csv.split('\n').slice(1); // skip header

// Known mappings: old path -> new path
const KNOWN_MAPPINGS = {
  'contact-us': '/contact',
  'about-us-about-homeglazer': '/about',
  'our-team': '/about',
  'carpentry-services': '/services/wood/carpentry',
  'wood-polishing-services': '/services/wood/wood-polishing',
  'wood-coating-services': '/services/wood/wood-coating',
  'commercial-painting-services': '/services/painting/commercial',
  'interior-painting-services': '/services/painting/residential',
  'exterior-painting-services': '/services/customized-painting/exterior-painting',
  'residential-painting-services': '/services/painting/residential',
  'kids-room-painting-services': '/services/painting/kids-room',
  'wow-one-day-painting-services': '/services/customized-painting/one-day-painting',
  'wow-per-day-painting-services': '/services/customized-painting/per-day-painting',
  'texture-painting-services': '/services/wall-decor/texture-painting',
  'stencil-painting-services': '/services/wall-decor/stencil-art',
  'graffiti-painting-services-wall-art-services': '/services/wall-decor/graffiti-painting',
  'customized-wallpaper-services': '/services/wall-decor/wallpaper',
  'painters-in-delhi': '/contact',
};

// Short or alternate URLs seen in GSC / traffic that aren't in CSV (old WP short links, typos, etc.)
const ADDITIONAL_REDIRECTS = {
  'difference-between-apcolite-premium': '/blog/difference-between-apcolite-premium-emulsion-and-royale-luxury-emulsion',
};

const seen = new Set();
const redirects = [];

// Add additional redirects first (so they're not overwritten by CSV)
for (const [sourcePathNoLeading, destination] of Object.entries(ADDITIONAL_REDIRECTS)) {
  const pathname = '/' + sourcePathNoLeading;
  if (!seen.has(pathname)) {
    seen.add(pathname);
    redirects.push({ source: pathname, destination, permanent: true });
  }
}

for (const line of lines) {
  const match = line.match(/^([^,]+),/);
  if (!match) continue;
  const url = match[1].trim();
  if (!url.startsWith('http')) continue;

  const parsed = new URL(url);
  let pathname = parsed.pathname.replace(/\/$/, '') || '/';
  const pathNoLeading = pathname.replace(/^\//, '');

  // Skip homepage, wp-content, media
  if (pathname === '/' || pathname === '') continue;
  if (pathname.includes('wp-content/') || pathname.includes('/uploads/')) continue;

  // Skip if already seen (e.g. same path with different #fragment)
  if (seen.has(pathname)) continue;
  seen.add(pathname);

  // Known mappings
  if (KNOWN_MAPPINGS[pathNoLeading]) {
    redirects.push({ source: pathname, destination: KNOWN_MAPPINGS[pathNoLeading], permanent: true });
    continue;
  }

  // Already correct paths (products, services, etc.)
  if (pathNoLeading.startsWith('products') && !pathNoLeading.includes('category')) continue;
  if (pathNoLeading.startsWith('services/') && pathNoLeading.split('/').length >= 2) continue;

  // category/*, tag/*, page/* -> /blog
  if (pathNoLeading.startsWith('category/') || pathNoLeading.startsWith('tag/') || pathNoLeading.startsWith('page/')) {
    redirects.push({ source: pathname, destination: '/blog', permanent: true });
    continue;
  }

  // painting-and-wood-coating-blog/* -> /blog
  if (pathNoLeading.startsWith('painting-and-wood-coating-blog/')) {
    redirects.push({ source: pathname, destination: '/blog', permanent: true });
    continue;
  }

  // blog/slug - already correct path, skip (www->non-www handled at host level)
  if (pathNoLeading.startsWith('blog/')) continue;

  // Root-level blog posts (old WP had /slug) -> /blog/slug
  redirects.push({ source: pathname, destination: `/blog/${pathNoLeading}`, permanent: true });
}

if (process.argv.includes('--write')) {
  fs.writeFileSync(outputPath, JSON.stringify(redirects, null, 2));
  console.error(`Wrote ${redirects.length} redirects to wp-redirects.json`);
} else {
  console.log(JSON.stringify(redirects, null, 2));
  console.error(`\nGenerated ${redirects.length} redirects`);
}
