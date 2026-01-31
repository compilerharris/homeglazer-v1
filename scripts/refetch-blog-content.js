/* eslint-disable no-console */
/**
 * Re-fetch blog HTML content from source URLs and update the database.
 * Extracts article-only content:
 *   - Begin after the heading containing "Table of Contents"
 *   - Skip the TOC block itself (ul/ol/nav just after the TOC heading)
 *   - End before the heading containing "Relevant Posts"
 *   - Include FAQ and everything in between
 * Falls back to previous container extraction if markers are missing.
 */
const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const prisma = new PrismaClient();

const JSON_PATH = path.join(__dirname, '../public/uploads/blogs/blog-articles.json');
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function loadArticles() {
  const raw = fs.readFileSync(JSON_PATH, 'utf-8');
  const data = JSON.parse(raw);
  return data.articles || [];
}

function cleanFragment($, el, { removeImages = true } = {}) {
  const clone = $(el).clone();
  clone.find('nav, header, footer, form, button, script, style, iframe, figure, video, audio, canvas').remove();
  if (removeImages) {
    clone.find('img, picture, source').remove();
  }
  clone.find('.share, .social, .related-posts, .related, .tags').remove();
  clone.find('p, div, span').each((_, node) => {
    const text = $(node).text().trim();
    const hasChild = $(node).children().length > 0;
    if (!text && !hasChild) $(node).remove();
  });
  return clone.html()?.trim() || '';
}

function cleanHtmlString(html) {
  const $ = cheerio.load(html || '');
  return cleanFragment($, $.root());
}

function extractMeta(html) {
  const $ = cheerio.load(html);
  const desc = $('meta[name="description"]').attr('content')?.trim();
  const keywords = $('meta[name="keywords"]').attr('content')?.trim();
  return {
    description: desc ? desc.slice(0, 300) : null,
    keywords: keywords || null,
  };
}

function autoGenerateKeywords(title, categories) {
  const words = (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const cats = Array.isArray(categories) ? categories.map((c) => String(c).toLowerCase()) : [];
  const all = [...words, ...cats];
  const uniq = Array.from(new Set(all)).filter(Boolean);
  return uniq.join(', ');
}

function htmlBetweenHeadings($, root) {
  const toc = $(root)
    .find(':header')
    .filter((_, el) => $(el).text().trim().toLowerCase().includes('table of contents'))
    .first();

  if (!toc.length) return '';

  const end = toc
    .nextAll(':header')
    .filter((_, el) => $(el).text().trim().toLowerCase().includes('relevant posts'))
    .first();

  const segment = end.length ? toc.nextUntil(end) : toc.nextAll();

  // Skip immediate TOC list/nav if present
  const cleanedSegment = segment.filter((_, el) => {
    const tag = el.name?.toLowerCase();
    return !(tag === 'ul' || tag === 'ol' || tag === 'nav');
  });

  const html = cleanedSegment
    .map((_, el) => $.html(el))
    .get()
    .join('\n')
    .trim();
  return html;
}

/**
 * Extract content between TOC and Relevant Posts, skipping the TOC block itself.
 */
function sliceBetweenTocAndRelevant($, root) {
  let seenToc = false;
  let skipNextBlock = false;
  let collecting = false;
  let done = false;
  const parts = [];

  function maybeStartCollecting(node) {
    if (done || collecting || !seenToc) return false;
    const tag = node.type === 'tag' ? node.name?.toLowerCase() : '';
    // skip the immediate TOC block if it's a list/nav
    if (skipNextBlock) {
      if (tag === 'ul' || tag === 'ol' || tag === 'nav') {
        skipNextBlock = false;
        return false;
      }
      // if it wasn't a list/nav, we can start collecting from here
      skipNextBlock = false;
    }
    collecting = true;
    return true;
  }

  function walk(node) {
    if (done) return;
    if (node.type === 'text') {
      if (collecting) parts.push(node.data);
      return;
    }
    if (node.type !== 'tag') return;

    const $node = $(node);
    const tag = node.name?.toLowerCase();
    const text = $node.text().trim().toLowerCase();

    if (tag && /^h[1-6]$/.test(tag)) {
      if (text.includes('table of contents')) {
        seenToc = true;
        skipNextBlock = true; // skip the TOC list right after
        return; // do not collect the TOC heading itself
      }
      if (text.includes('relevant posts') && collecting) {
        done = true;
        return;
      }
      if (maybeStartCollecting(node)) {
        parts.push($.html(node));
        return;
      }
      // not collecting yet, keep looking deeper for markers
      $node.contents().each((_, child) => walk(child));
      return;
    }

    if (!collecting) {
      if (maybeStartCollecting(node)) {
        parts.push($.html(node));
        return;
      }
      $node.contents().each((_, child) => walk(child));
      return;
    }

    // collecting
    parts.push($.html(node));
  }

  walk(root);
  return parts.join('\n').trim();
}

function extractContent(html) {
  const $ = cheerio.load(html);

  const themeWidgets = $('.elementor-widget-theme-post-content').toArray();
  const primary = $('.elementor-widget-wrap.elementor-element-populated').toArray();
  const fallbacks = [
    ...$('article').toArray(),
    ...$('.entry-content, .post-content, .blog-content').toArray(),
    ...$('main').toArray(),
  ];

  const candidates =
    (themeWidgets.length && themeWidgets) ||
    (primary.length && primary) ||
    fallbacks;

// Special handling for elementor post content widget: strip TOC container and relevant/related posts onward
  if (themeWidgets.length) {
    const widget = $(themeWidgets[0]).clone();
    widget.find('#ez-toc-container').remove(); // remove TOC block
    widget
      .find(':header')
      .filter((_, el) => {
        const text = $(el).text().trim().toLowerCase();
        return text.includes('relevant posts') || text.includes('related post');
      })
      .each((_, el) => {
        const h = $(el);
        // Remove everything after this heading
        h.nextAll().remove();
        h.remove();
      });
    const cleaned = cleanFragment($, widget, { removeImages: false });
    if (cleaned && cleaned.length >= 200) {
      return cleaned.trim();
    }
  }

  // Try slicing between TOC and Relevant Posts first
  for (const el of candidates) {
    const sliceHtml =
      htmlBetweenHeadings($, el) ||
      sliceBetweenTocAndRelevant($, el); // keep legacy walker as secondary
    if (sliceHtml) {
      const cleanedSlice = cleanFragment(cheerio.load(sliceHtml), cheerio.load(sliceHtml).root(), {
        removeImages: false,
      });
      if (cleanedSlice && cleanedSlice.length >= 200) {
        return cleanedSlice.trim();
      }
    }
  }

  // Fallback to cleaned full fragments
  for (const el of candidates) {
    const cleaned = cleanFragment($, el, { removeImages: false });
    if (cleaned && cleaned.length >= 200) {
      return cleaned.trim();
    }
  }

  // Last resort: body
  const bodyClean = cleanFragment($, $('body'), { removeImages: false });
  return (bodyClean || '').trim();
}

async function downloadImage(url, destDir) {
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(destDir, { recursive: true });
  const u = new URL(url);
  let base = path.basename(u.pathname.split('?')[0]);
  if (!base || base === '/') base = crypto.randomBytes(6).toString('hex');
  const filename = base.includes('.') ? base : `${base}.jpg`;
  const filePath = path.join(destDir, filename);
  fs.writeFileSync(filePath, buf);
  return filename;
}

async function rewriteImages(html, slug, pageUrl) {
  const $ = cheerio.load(html);
  const imageEls = $('img').toArray();

  if (!imageEls.length) return { html, downloaded: 0 };

  const destDir = path.join(process.cwd(), 'public/uploads/blogs/inline', slug);
  let downloaded = 0;
  const seen = new Set();

  const getSrc = (el) => {
    const $el = $(el);
    const dataSrcset = $el.attr('data-srcset') || $el.attr('srcset') || '';
    const srcsetFirst = dataSrcset.split(',')[0]?.trim().split(' ')[0];
    const candidates = [
      $el.attr('data-src'),
      $el.attr('data-lazy-src'),
      $el.attr('data-original'),
      $el.attr('data-lazyload'),
      srcsetFirst,
      $el.attr('src'),
    ].filter(Boolean);
    const chosen = candidates.find((s) => s && !s.startsWith('data:'));
    return chosen;
  };

  for (const el of imageEls) {
    const src = getSrc(el);
    if (!src) continue;
    const abs = new URL(src, pageUrl).toString();
    if (seen.has(abs)) {
      $(el).attr('src', `/uploads/blogs/inline/${slug}/${path.basename(new URL(abs).pathname.split('?')[0]) || 'image.jpg'}`);
      continue;
    }
    try {
      const filename = await downloadImage(abs, destDir);
      const localPath = `/uploads/blogs/inline/${slug}/${filename}`;
      $(el).attr('src', localPath);
      $(el)
        .removeAttr('data-src')
        .removeAttr('data-lazy-src')
        .removeAttr('data-original')
        .removeAttr('data-lazyload')
        .removeAttr('data-srcset')
        .removeAttr('srcset');
      seen.add(abs);
      downloaded++;
    } catch (err) {
      console.warn(`    ⚠️ Image download failed for ${src}: ${err.message}`);
    }
  }

  return { html: $.html(), downloaded };
}

function stripRelatedSections(html) {
  const $ = cheerio.load(html);
  const headers = $(':header').filter((_, el) => {
    const text = $(el).text().trim().toLowerCase();
    return text.includes('related post') || text.includes('relevant post');
  });
  headers.each((_, el) => {
    const h = $(el);
    h.nextAll().remove();
    h.remove();
  });
  return $.html();
}

function buildExcerptFromContent(contentHtml) {
  const $ = cheerio.load(contentHtml);
  const firstP = $('p')
    .map((_, el) => $(el).text().trim())
    .get()
    .find((t) => t && t.length > 0);
  if (!firstP) return '';
  const maxLen = 200;
  return firstP.length > maxLen ? `${firstP.slice(0, maxLen).trim()}...` : firstP;
}

function estimateReadTime(contentHtml) {
  const text = cheerio.load(contentHtml)('body').text();
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

async function refetch() {
  const articles = loadArticles();
  const filterSlugs = process.env.SLUGS
    ? process.env.SLUGS.split(',').map((s) => s.trim()).filter(Boolean)
    : null;
  const list = filterSlugs
    ? articles.filter((a) => filterSlugs.includes(a.slug))
    : articles;

  if (filterSlugs) {
    console.log(`Filtering to ${list.length} articles via SLUGS env`);
  }
  console.log(`Found ${articles.length} articles in JSON`);

  let success = 0;
  let skipped = 0;
  let failed = 0;
  const failures = [];

  for (const article of list) {
    const { slug, url } = article;
    if (!slug || !url) {
      console.warn(`Skipping entry with missing slug/url:`, article);
      skipped++;
      continue;
    }

    const existing = await prisma.blogPost.findUnique({ where: { slug } });

    console.log(`\n➡️  Fetching ${slug}`);
    let html;
    try {
      const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      html = await res.text();
    } catch (err) {
      console.error(`  ❌ Fetch failed for ${slug}: ${err.message}`);
      failed++;
      failures.push({ slug, reason: `fetch: ${err.message}` });
      continue;
    }

    let content = extractContent(html);
    if (!content || content.length < 200) {
      console.error(`  ❌ Content too short/empty for ${slug} (len=${content.length || 0})`);
      failed++;
      failures.push({ slug, reason: 'empty or too short' });
      continue;
    }

    // Extract meta description/keywords (optional)
    const meta = extractMeta(html);

    content = stripRelatedSections(content);

    // Download inline images and rewrite src to local paths
    try {
      const rewritten = await rewriteImages(content, slug, url);
      content = rewritten.html;
      if (rewritten.downloaded) {
        console.log(`  📸 Images downloaded: ${rewritten.downloaded}`);
      }
    } catch (err) {
      console.warn(`  ⚠️ Image rewrite failed for ${slug}: ${err.message}`);
    }

    if (!content || content.length < 200) {
      console.error(`  ❌ Content too short/empty for ${slug} (len=${content.length || 0})`);
      failed++;
      failures.push({ slug, reason: 'empty or too short' });
      continue;
    }

    const newExcerpt = buildExcerptFromContent(content);
    const data = { content };
    if (meta.description) {
      data.metaDescription = meta.description;
    }
    if (meta.keywords) {
      data.metaKeywords = meta.keywords;
    } else {
      const titleForKeywords = existing ? existing.title : article.title || '';
      const catsForKeywords = existing ? existing.categories || [] : [];
      data.metaKeywords = autoGenerateKeywords(titleForKeywords, catsForKeywords);
    }

    const existingExcerpt = (existing && existing.excerpt ? existing.excerpt : '').trim();
    if (!existingExcerpt || existingExcerpt.length < 50) {
      if (newExcerpt) data.excerpt = newExcerpt;
    }

    try {
      if (existing) {
        await prisma.blogPost.update({
          where: { id: existing.id },
          data,
        });
        console.log(`  ✅ Updated: len=${content.length}${data.excerpt ? ` excerpt set` : ''}`);
      } else {
        const coverImage = article.thumbnail || article.thumbnailOriginal || '';
        const categories = article.categories || [];
        const createdData = {
          slug,
          title: article.title || slug,
          excerpt: data.excerpt || newExcerpt || '',
          content: data.content,
          coverImage,
          author: 'Home Glazer Team',
          readTime: estimateReadTime(content),
          categories,
          published: true,
          publishedAt: new Date(),
          metaDescription: data.metaDescription || article.title || '',
          metaKeywords: data.metaKeywords || '',
        };
        await prisma.blogPost.create({ data: createdData });
        console.log(`  ✅ Created new blog: ${slug}`);
      }
      success++;
    } catch (err) {
      console.error(`  ❌ DB update failed for ${slug}: ${err.message}`);
      failed++;
      failures.push({ slug, reason: `db: ${err.message}` });
    }

    await new Promise((r) => setTimeout(r, 200));
  }

  console.log('\n==== Summary ====');
  console.log(`Updated: ${success}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
  if (failures.length) {
    console.log('Failures:');
    failures.forEach((f) => console.log(`- ${f.slug}: ${f.reason}`));
  }
}

refetch()
  .catch((err) => {
    console.error('Fatal error', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
