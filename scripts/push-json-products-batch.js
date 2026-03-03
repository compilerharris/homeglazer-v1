/**
 * Batch push curated JSON products into MongoDB.
 *
 * Usage (from project root, after JSONs are ready in scripts/import-output/):
 *
 *   # Push ALL JSON products
 *   node scripts/push-json-products-batch.js
 *
 * This will:
 * - Find all *.json files under scripts/import-output/
 * - Derive the slug from each filename
 * - Sequentially run: node scripts/push-json-product-to-mongo.js <slug>
 *
 * It uses the same DATABASE_URL loading as the single-product script
 * (from .env or .env.production).
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function runForSlug(slug) {
  return new Promise((resolve) => {
    console.log('\n=== Pushing product from JSON:', slug, '===');
    const child = spawn(
      process.execPath,
      ['scripts/push-json-product-to-mongo.js', slug],
      {
        stdio: 'inherit',
      },
    );

    child.on('close', (code) => {
      if (code === 0) {
        console.log('Done:', slug);
      } else {
        console.error('Failed for slug', slug, 'with exit code', code);
      }
      resolve();
    });
  });
}

async function main() {
  const importOutputDir = path.join(__dirname, 'import-output');

  if (!fs.existsSync(importOutputDir)) {
    console.error(
      'Directory scripts/import-output/ not found. Make sure your curated JSON files are there.',
    );
    process.exit(1);
  }

  const files = fs
    .readdirSync(importOutputDir)
    .filter((f) => f.endsWith('.json'))
    .sort();

  if (files.length === 0) {
    console.error(
      'No JSON files found in scripts/import-output/. Nothing to push.',
    );
    process.exit(1);
  }

  const slugs = files.map((file) => path.basename(file, '.json'));

  console.log('Found JSON products:', slugs.join(', '));
  console.log(
    'Total:',
    slugs.length,
    '- pushing them one by one into MongoDB...',
  );

  for (const slug of slugs) {
    // eslint-disable-next-line no-await-in-loop
    await runForSlug(slug);
  }

  console.log('\nAll JSON products processed.');
}

main().catch((err) => {
  console.error('Unexpected error in batch push script:', err);
  process.exit(1);
});

