const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Slugs to skip (already imported)
const SKIP_SLUGS = [
  'guide-to-wooden-polish-shades-for-veneer',
  'reasons-why-sirca-paints-acquired-oikos-paints',
  '6-amazing-tips-to-maintain-duco-paint-surface',
  '5-asian-paint-stucco-marble-texture-paint-best',
  '5-asian-paint-stucco-marble-texture-paint-best-features',
  'sirca-paints-acquired-oikos-paints',
];

// Category assignment based on title keywords
function assignCategories(title) {
  const lowerTitle = title.toLowerCase();
  const categories = [];

  // Wood-related
  if (lowerTitle.includes('pu polish') || lowerTitle.includes('pu paint') || 
      lowerTitle.includes('polyurethane') || lowerTitle.includes('wood polish') ||
      lowerTitle.includes('melamine') || lowerTitle.includes('polyester polish') ||
      lowerTitle.includes('wood stain') || lowerTitle.includes('furniture polish')) {
    categories.push('Wood Services', 'Wood Polishing');
  }
  
  if (lowerTitle.includes('duco') || lowerTitle.includes('wood coating') || 
      lowerTitle.includes('wooden furniture')) {
    categories.push('Wood Services', 'Wood Coating');
  }
  
  if (lowerTitle.includes('carpent')) {
    categories.push('Wood Services', 'Carpentry');
  }

  // Texture-related
  if (lowerTitle.includes('texture') || lowerTitle.includes('stucco') || 
      lowerTitle.includes('oikos') || lowerTitle.includes('italian')) {
    categories.push('Texture Painting');
  }

  // Wall decor
  if (lowerTitle.includes('graffiti')) {
    categories.push('Wall Decor', 'Graffiti Painting');
  }
  if (lowerTitle.includes('stencil')) {
    categories.push('Wall Decor', 'Stencil Art');
  }
  if (lowerTitle.includes('wallpaper')) {
    categories.push('Wall Decor', 'Wallpaper');
  }

  // Painting types
  if (lowerTitle.includes('exterior')) {
    categories.push('Exterior Painting');
  }
  if (lowerTitle.includes('interior') || lowerTitle.includes('living room') || 
      lowerTitle.includes('bedroom') || lowerTitle.includes('kitchen') ||
      lowerTitle.includes('kids room')) {
    categories.push('Interior Painting');
  }
  if (lowerTitle.includes('commercial') || lowerTitle.includes('office') || 
      lowerTitle.includes('business')) {
    categories.push('Commercial Painting');
  }
  if (lowerTitle.includes('residential') || lowerTitle.includes('house') || 
      lowerTitle.includes('home')) {
    categories.push('Residential Painting');
  }

  // Paint brands
  if (lowerTitle.includes('asian paint')) {
    categories.push('Paint Brands', 'Asian Paints');
  }
  if (lowerTitle.includes('dulux')) {
    categories.push('Paint Brands', 'Dulux');
  }
  if (lowerTitle.includes('berger')) {
    categories.push('Paint Brands', 'Berger');
  }
  if (lowerTitle.includes('indigo')) {
    categories.push('Paint Brands', 'Indigo');
  }
  if (lowerTitle.includes('sirca')) {
    categories.push('Paint Brands', 'Sirca');
  }
  if (lowerTitle.includes('birla') || lowerTitle.includes('opus')) {
    categories.push('Paint Brands', 'Birla');
  }

  // General categories
  if (lowerTitle.includes('tips') || lowerTitle.includes('how to') || 
      lowerTitle.includes('process') || lowerTitle.includes('guide') ||
      lowerTitle.includes('steps')) {
    categories.push('Paint Tips');
  }
  if (lowerTitle.includes('colour') || lowerTitle.includes('color') || 
      lowerTitle.includes('shade')) {
    categories.push('Color Ideas');
  }
  if (lowerTitle.includes('difference') || lowerTitle.includes('vs')) {
    categories.push('Comparisons');
  }

  // Default category if none assigned
  if (categories.length === 0) {
    categories.push('Paint Tips');
  }

  // Remove duplicates
  return [...new Set(categories)];
}

// Estimate read time based on content length
function estimateReadTime(contentLength) {
  const wordsPerMinute = 200;
  const words = contentLength / 5; // Approximate words from characters
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(3, Math.min(15, minutes)).toString(); // Between 3-15 minutes
}

// Fetch article content from URL
async function fetchArticleContent(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    return parseArticleContent(html);
  } catch (error) {
    console.error(`  Failed to fetch ${url}: ${error.message}`);
    return null;
  }
}

// Parse HTML content and extract article
function parseArticleContent(html) {
  // Remove scripts, styles, and comments
  let content = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  
  // Try to find the main article content
  // Look for common content containers
  let articleMatch = content.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
                     content.match(/<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                     content.match(/<div[^>]*class="[^"]*post-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                     content.match(/<div[^>]*class="[^"]*blog-content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  
  if (articleMatch) {
    content = articleMatch[1];
  }
  
  // Clean and format the content
  content = formatContent(content);
  
  return content;
}

// Format content with proper HTML tags
function formatContent(html) {
  // First, preserve existing structure
  let content = html;
  
  // Remove unwanted elements
  content = content
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, '')
    .replace(/<form[^>]*>[\s\S]*?<\/form>/gi, '')
    .replace(/<button[^>]*>[\s\S]*?<\/button>/gi, '')
    .replace(/<img[^>]*>/gi, '') // Remove images (we use cover image)
    .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, '')
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<a[^>]*class="[^"]*share[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  
  // Clean up inline styles and classes
  content = content
    .replace(/ style="[^"]*"/gi, '')
    .replace(/ class="[^"]*"/gi, '')
    .replace(/ id="[^"]*"/gi, '')
    .replace(/ data-[^=]*="[^"]*"/gi, '');
  
  // Convert divs with content to paragraphs where appropriate
  content = content
    .replace(/<div>\s*<p>/gi, '<p>')
    .replace(/<\/p>\s*<\/div>/gi, '</p>')
    .replace(/<div>([^<]*(?:<(?!div)[^>]*>[^<]*)*)<\/div>/gi, '<p>$1</p>');
  
  // Clean up whitespace
  content = content
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/^\s+|\s+$/gm, '')
    .trim();
  
  // Remove empty tags
  content = content
    .replace(/<p>\s*<\/p>/gi, '')
    .replace(/<div>\s*<\/div>/gi, '')
    .replace(/<span>\s*<\/span>/gi, '');
  
  // Ensure proper HTML structure
  // Wrap loose text in paragraphs
  const lines = content.split('\n').filter(line => line.trim());
  const formattedLines = lines.map(line => {
    line = line.trim();
    if (!line) return '';
    
    // Skip if already has block-level tags
    if (/^<(h[1-6]|p|ul|ol|li|blockquote|div|table)/i.test(line)) {
      return line;
    }
    
    // Wrap in paragraph
    return `<p>${line}</p>`;
  });
  
  return formattedLines.join('\n').trim();
}

// Generate dates in descending order
function generateDate(index, totalArticles) {
  const baseDate = new Date('2025-11-01');
  const daysToSubtract = Math.floor((index / totalArticles) * 365 * 2); // Spread over 2 years
  const date = new Date(baseDate);
  date.setDate(date.getDate() - daysToSubtract);
  return date;
}

async function importBatch(articles, startIndex, batchSize) {
  const endIndex = Math.min(startIndex + batchSize, articles.length);
  const batch = articles.slice(startIndex, endIndex);
  
  console.log(`\n📦 Processing batch: articles ${startIndex + 1} to ${endIndex}`);
  console.log('='.repeat(50));
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < batch.length; i++) {
    const article = batch[i];
    const globalIndex = startIndex + i;
    
    // Skip already imported articles
    if (SKIP_SLUGS.includes(article.slug)) {
      console.log(`⏭️  Skipping (already imported): ${article.title.substring(0, 50)}...`);
      skipCount++;
      continue;
    }
    
    // Check if already exists in database
    const existing = await prisma.blogPost.findUnique({
      where: { slug: article.slug }
    });
    
    if (existing) {
      console.log(`⏭️  Skipping (exists in DB): ${article.title.substring(0, 50)}...`);
      skipCount++;
      continue;
    }
    
    console.log(`\n📄 [${globalIndex + 1}/${articles.length}] ${article.title.substring(0, 60)}...`);
    
    // Fetch content from URL
    const content = await fetchArticleContent(article.url);
    
    if (!content || content.length < 100) {
      console.log(`  ❌ Failed to fetch or content too short`);
      errorCount++;
      continue;
    }
    
    // Prepare blog data
    const categories = assignCategories(article.title);
    const readTime = estimateReadTime(content.length);
    const publishedAt = generateDate(globalIndex, articles.length);
    
    // Create excerpt from content (first 200 chars)
    const excerptMatch = content.match(/<p>([^<]{50,300})/i);
    const excerpt = excerptMatch 
      ? excerptMatch[1].replace(/<[^>]*>/g, '').substring(0, 200) + '...'
      : article.title;
    
    try {
      await prisma.blogPost.create({
        data: {
          slug: article.slug,
          title: article.title,
          excerpt: excerpt,
          content: content,
          coverImage: article.thumbnail,
          author: 'Home Glazer Team',
          readTime: readTime,
          categories: categories,
          published: true,
          publishedAt: publishedAt,
        }
      });
      
      console.log(`  ✅ Imported successfully`);
      console.log(`     Categories: ${categories.join(', ')}`);
      console.log(`     Content length: ${content.length} chars`);
      successCount++;
    } catch (error) {
      console.log(`  ❌ Database error: ${error.message}`);
      errorCount++;
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n📊 Batch Summary:`);
  console.log(`   ✅ Imported: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  
  return { success: successCount, skipped: skipCount, errors: errorCount };
}

async function main() {
  // Read the JSON file
  const jsonPath = path.join(__dirname, '../public/uploads/blogs/blog-articles.json');
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const articles = jsonData.articles;
  
  console.log('🚀 Blog Import Script');
  console.log('='.repeat(50));
  console.log(`Total articles in JSON: ${articles.length}`);
  console.log(`Articles to skip: ${SKIP_SLUGS.length}`);
  
  // Get batch parameters from command line
  const args = process.argv.slice(2);
  const startIndex = parseInt(args[0]) || 0;
  const batchSize = parseInt(args[1]) || 25;
  
  console.log(`\nStarting from index: ${startIndex}`);
  console.log(`Batch size: ${batchSize}`);
  
  try {
    const result = await importBatch(articles, startIndex, batchSize);
    
    console.log('\n' + '='.repeat(50));
    console.log('🏁 Import Complete!');
    console.log(`   Next batch starts at index: ${startIndex + batchSize}`);
    console.log(`   Command: node scripts/import-blogs.js ${startIndex + batchSize} ${batchSize}`);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
