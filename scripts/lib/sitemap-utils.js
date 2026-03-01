/**
 * Shared sitemap XML helpers.
 * Used by product sitemap (and can be used by others that need per-URL lastmod).
 */

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Build sitemap XML from entries with optional per-URL lastmod.
 * @param {{ loc: string, lastmod?: string }[]} entries
 * @returns {string}
 */
function entriesToSitemapXml(entries) {
  const defaultLastmod = new Date().toISOString().split('T')[0];
  const urlEntries = entries
    .map((e) => {
      const lastmod = e.lastmod ? e.lastmod.split('T')[0] : defaultLastmod;
      return `  <url>\n    <loc>${escapeXml(e.loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

module.exports = { escapeXml, entriesToSitemapXml };
