const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://homeglazer.com/painting-and-wood-coating-blog';
const OUTPUT_DIR = path.join(__dirname, '../public/uploads/blogs');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Delay function for rate limiting
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Check if URL is a homeglazer article URL (with or without www)
function isHomeGlazerUrl(url) {
  if (!url) return false;
  return url.startsWith('https://homeglazer.com/') || 
         url.startsWith('https://www.homeglazer.com/') ||
         url.startsWith('http://homeglazer.com/') ||
         url.startsWith('http://www.homeglazer.com/');
}

// Normalize URL to use consistent domain
function normalizeUrl(url) {
  if (!url) return url;
  // Normalize to use https://homeglazer.com (without www)
  return url
    .replace('http://', 'https://')
    .replace('https://www.homeglazer.com/', 'https://homeglazer.com/');
}

// Sanitize filename from URL
function getFilenameFromUrl(url, slug) {
  try {
    const urlObj = new URL(url);
    const ext = path.extname(urlObj.pathname) || '.jpg';
    return `${slug}${ext}`;
  } catch {
    return `${slug}.jpg`;
  }
}

// Get actual image URL from element (handles lazy loading)
function getImageUrl($, imgEl) {
  // Check various attributes for lazy loading
  const attrs = ['data-src', 'data-lazy-src', 'data-original', 'src'];
  
  for (const attr of attrs) {
    const url = imgEl.attr(attr);
    if (url && url.startsWith('http') && !url.startsWith('data:')) {
      return url;
    }
  }
  
  // Check srcset for actual URLs
  const srcset = imgEl.attr('data-srcset') || imgEl.attr('srcset');
  if (srcset) {
    const urls = srcset.split(',').map(s => s.trim().split(' ')[0]);
    for (const url of urls) {
      if (url && url.startsWith('http') && !url.startsWith('data:')) {
        return url;
      }
    }
  }
  
  return null;
}

// Download image and save to disk
async function downloadImage(imageUrl, filename) {
  const filepath = path.join(OUTPUT_DIR, filename);
  
  // Skip if file already exists
  if (fs.existsSync(filepath)) {
    console.log(`  [SKIP] Image already exists: ${filename}`);
    return `/uploads/blogs/${filename}`;
  }
  
  // Skip data URLs
  if (imageUrl.startsWith('data:')) {
    console.log(`  [SKIP] Data URL, cannot download: ${filename}`);
    return null;
  }
  
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    console.log(`  [DOWNLOADED] ${filename}`);
    return `/uploads/blogs/${filename}`;
  } catch (error) {
    console.error(`  [ERROR] Failed to download ${imageUrl}: ${error.message}`);
    return null;
  }
}

// Extract slug from article URL
function getSlugFromUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname.replace(/^\/|\/$/g, '');
  } catch {
    return url.replace(/^https?:\/\/(www\.)?homeglazer\.com\//, '').replace(/\/$/, '');
  }
}

// Scrape a single page
async function scrapePage(pageNum) {
  const url = pageNum === 1 ? BASE_URL : `${BASE_URL}/page/${pageNum}/`;
  console.log(`\nScraping page ${pageNum}: ${url}`);
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`  Page ${pageNum} not found (404). Stopping pagination.`);
        return { articles: [], hasMore: false };
      }
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const articles = [];
    
    // Find all blog post cards - WordPress typically uses article or post class
    // Looking for elements with "Read More" links
    const readMoreLinks = $('a').filter((i, el) => {
      const text = $(el).text().trim().toLowerCase();
      return text === 'read more' || text === 'read more »';
    });
    
    console.log(`  Found ${readMoreLinks.length} "Read More" links on page ${pageNum}`);
    
    for (let i = 0; i < readMoreLinks.length; i++) {
      const link = readMoreLinks.eq(i);
      let articleUrl = link.attr('href');
      
      if (!isHomeGlazerUrl(articleUrl)) {
        console.log(`  [SKIP] Not a homeglazer URL: ${articleUrl}`);
        continue;
      }
      
      // Normalize the URL
      articleUrl = normalizeUrl(articleUrl);
      const slug = getSlugFromUrl(articleUrl);
      
      // Find the parent container that has both the title and image
      // Go up to find the article/post container
      let container = link.parent();
      for (let j = 0; j < 10; j++) {
        if (container.find('img').length > 0 && container.find('h3').length > 0) {
          break;
        }
        container = container.parent();
      }
      
      // Extract title
      const titleEl = container.find('h3').first();
      const title = titleEl.text().trim() || slug;
      
      // Extract thumbnail image
      const imgEl = container.find('img').first();
      let thumbnailUrl = getImageUrl($, imgEl);
      
      let localThumbnail = null;
      if (thumbnailUrl) {
        // Make sure it's an absolute URL
        if (thumbnailUrl.startsWith('//')) {
          thumbnailUrl = 'https:' + thumbnailUrl;
        } else if (thumbnailUrl.startsWith('/')) {
          thumbnailUrl = 'https://homeglazer.com' + thumbnailUrl;
        }
        
        const filename = getFilenameFromUrl(thumbnailUrl, slug);
        localThumbnail = await downloadImage(thumbnailUrl, filename);
      } else {
        console.log(`  [NO IMAGE] Could not find thumbnail for: ${slug}`);
      }
      
      articles.push({
        title,
        url: articleUrl,
        slug,
        thumbnailOriginal: thumbnailUrl || null,
        thumbnail: localThumbnail
      });
    }
    
    // Check if there's a next page
    const hasMore = $('a').filter((i, el) => {
      const text = $(el).text().trim().toLowerCase();
      return text === 'next »' || text === 'next' || text.includes('next');
    }).length > 0;
    
    return { articles, hasMore };
  } catch (error) {
    console.error(`  [ERROR] Failed to scrape page ${pageNum}: ${error.message}`);
    return { articles: [], hasMore: false };
  }
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('HomeGlazer Blog Scraper');
  console.log('='.repeat(60));
  console.log(`Output directory: ${OUTPUT_DIR}`);
  
  const allArticles = [];
  let pageNum = 1;
  let hasMore = true;
  
  while (hasMore && pageNum <= 20) { // Max 20 pages as safety limit
    const { articles, hasMore: more } = await scrapePage(pageNum);
    allArticles.push(...articles);
    hasMore = more && articles.length > 0;
    pageNum++;
    
    // Rate limiting - wait between pages
    if (hasMore) {
      console.log('  Waiting 1 second before next page...');
      await delay(1000);
    }
  }
  
  // Save JSON output
  const output = {
    scrapedAt: new Date().toISOString(),
    totalArticles: allArticles.length,
    articles: allArticles
  };
  
  const jsonPath = path.join(OUTPUT_DIR, 'blog-articles.json');
  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  
  console.log('\n' + '='.repeat(60));
  console.log('Scraping complete!');
  console.log(`Total articles scraped: ${allArticles.length}`);
  console.log(`JSON saved to: ${jsonPath}`);
  console.log('='.repeat(60));
  
  // Print summary of articles
  console.log('\nArticle URLs:');
  allArticles.forEach((article, i) => {
    console.log(`${i + 1}. ${article.url}`);
  });
}

main().catch(console.error);
