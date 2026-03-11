/**
 * Upload only visualiser thumbnail images to S3.
 *
 * Usage:
 *   npm run upload:visualiser-thumbnails
 *
 * Requires env (from .env, .env.local, or .env.production):
 *   S3_BUCKET, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY
 */

import dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

// Load default env (.env / .env.local)
dotenv.config();

// Also load .env.production if present, without overriding already-set vars
const prodEnvPath = path.join(process.cwd(), '.env.production');
if (fs.existsSync(prodEnvPath)) {
  dotenv.config({ path: prodEnvPath, override: false });
}

const S3_PREFIX = 'visualiser';
const SOURCE_DIR = path.join(process.cwd(), 'public', 'assets', 'images');
const THUMBNAIL_FOLDER = 'visualizer-thumbnails';

function getS3Client() {
  const region = process.env.S3_REGION || 'us-east-1';
  const accessKeyId = process.env.S3_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
  if (!accessKeyId || !secretAccessKey) {
    throw new Error('Set S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY (or use .env.local)');
  }
  return new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });
}

function getAllFiles(dir: string): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) {
    return files;
  }
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      files.push(...getAllFiles(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) throw new Error('Set S3_BUCKET');

  const client = getS3Client();
  let count = 0;

  const dir = path.join(SOURCE_DIR, THUMBNAIL_FOLDER);
  if (!fs.existsSync(dir)) {
    console.log(`Thumbnail folder not found, nothing to upload: ${dir}`);
    return;
  }

  const files = getAllFiles(dir);
  for (const filePath of files) {
    const rel = path.relative(SOURCE_DIR, filePath);
    const key = `${S3_PREFIX}/assets/images/${rel}`;
    const body = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = ext === '.svg' ? 'image/svg+xml' : ext === '.png' ? 'image/png' : 'image/webp';

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
    count++;
    if (count % 20 === 0) console.log(`Uploaded ${count} thumbnail files...`);
  }

  console.log(`Done. Uploaded ${count} thumbnails to s3://${bucket}/${S3_PREFIX}/assets/images/${THUMBNAIL_FOLDER}/`);
}

main().catch(console.error);

