/**
 * Upload uploads, media assets, and brand logos to S3.
 * Run before deploying to Amplify: npm run upload:media
 * Requires: S3_BUCKET, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY (or .env.local)
 */
import 'dotenv/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const MEDIA_DIR = path.join(process.cwd(), 'public', 'media');
const BRAND_LOGOS_DIR = path.join(process.cwd(), 'public', 'assets', 'images', 'brand-logos');

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
  if (!fs.existsSync(dir)) return files;
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

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.json': 'application/json',
  };
  return map[ext] || 'application/octet-stream';
}

async function uploadDir(
  client: S3Client,
  bucket: string,
  sourceDir: string,
  s3Prefix: string
): Promise<number> {
  let count = 0;
  const files = getAllFiles(sourceDir);
  for (const filePath of files) {
    const rel = path.relative(sourceDir, filePath);
    const key = `${s3Prefix}/${rel}`.replace(/\\/g, '/');
    const body = fs.readFileSync(filePath);
    const contentType = getContentType(filePath);
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }));
    count++;
    if (count % 20 === 0) console.log(`Uploaded ${count} files...`);
  }
  return count;
}

async function main() {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) throw new Error('Set S3_BUCKET');

  const client = getS3Client();
  let total = 0;

  if (fs.existsSync(UPLOADS_DIR)) {
    const n = await uploadDir(client, bucket, UPLOADS_DIR, 'uploads');
    total += n;
    console.log(`Uploaded ${n} files to s3://${bucket}/uploads/`);
  } else {
    console.log('Skip uploads (not found)');
  }

  if (fs.existsSync(MEDIA_DIR)) {
    const n = await uploadDir(client, bucket, MEDIA_DIR, 'media');
    total += n;
    console.log(`Uploaded ${n} files to s3://${bucket}/media/`);
  } else {
    console.log('Skip media (not found)');
  }

  if (fs.existsSync(BRAND_LOGOS_DIR)) {
    const n = await uploadDir(client, bucket, BRAND_LOGOS_DIR, 'assets/images/brand-logos');
    total += n;
    console.log(`Uploaded ${n} files to s3://${bucket}/assets/images/brand-logos/`);
  } else {
    console.log('Skip brand-logos (not found)');
  }

  console.log(`Done. Uploaded ${total} files total.`);
}

main().catch(console.error);
