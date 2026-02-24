# SEO Post-Launch Manual Actions

Complete these steps in the listed order. Code changes from the SEO checklist are already implemented.

## 1. Google Search Console (GSC)

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property for `https://homeglazer.com` (or both www and non-www if applicable)
3. Verify ownership using one of:
   - HTML meta tag (add to `_app.tsx` if needed)
   - DNS record
   - Google Analytics (you already have GA4)
4. Submit sitemap: `https://homeglazer.com/sitemap.xml`
5. In **Settings > Sitemaps**, add the URL and click Submit

## 2. Request Indexing for Priority Pages (GSC URL Inspection)

1. In GSC, open **URL Inspection** (top search bar)
2. Enter each URL and click **Request Indexing** for:
   - `https://homeglazer.com`
   - `https://homeglazer.com/products`
   - `https://homeglazer.com/about`
   - `https://homeglazer.com/contact`
   - `https://homeglazer.com/services/painting`
   - `https://homeglazer.com/services/wall-decor`
   - `https://homeglazer.com/services/wood-services`
   - Top 5–10 product URLs (e.g. from `/products/[brand]/[slug]`)
   - Top 5–10 blog URLs (e.g. from `/blog/[slug]`)

## 3. Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site: `https://homeglazer.com`
3. Verify via meta tag or DNS
4. Submit sitemap: `https://homeglazer.com/sitemap.xml`
5. Optionally import from GSC if you use the same property

## 4. Google Analytics 4 Verification

1. In GA4 Admin, confirm the data stream URL is `https://homeglazer.com`
2. Enable **Enhanced measurement** (scrolls, outbound clicks, etc.)
3. Link GA4 to Search Console: Admin > Product Links > Search Console Links > Link

## 5. IndexNow Submission

Run the IndexNow script to submit URLs to Bing and Yandex:

```bash
npx tsx scripts/submit-indexnow.ts
```

Or manually submit via [IndexNow](https://www.indexnow.org/).

## 6. 301 Redirects for Old WordPress URLs

If your old WordPress site used different URL structures, add redirects in `next.config.js` under `redirects()`. Export old URLs from GSC (Pages report) or a WordPress plugin, then map them to new URLs.

## 7. Google Business Profile

1. Go to [Google Business Profile](https://business.google.com)
2. Update the website URL to `https://homeglazer.com` if it was different on WordPress
