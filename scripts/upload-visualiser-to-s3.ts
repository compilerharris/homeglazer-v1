/**
 * Upload visualiser room images to S3.
 * Run once before deploying to Amplify: npm run upload:visualiser
 * Requires: S3_BUCKET, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY (or .env.local)
 */
import 'dotenv/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const S3_PREFIX = 'visualiser';
const SOURCE_DIR = path.join(process.cwd(), 'public', 'assets', 'images');

// Room folders to upload (exclude brand-logos - small, keep in repo)
const ROOM_FOLDERS = ['bedroom', 'bathroom', 'kitchen', 'livingroom', 'homeoffice', 'kidsroom', 'office', 'outdoor', 'maingate'];

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

  for (const folder of ROOM_FOLDERS) {
    const dir = path.join(SOURCE_DIR, folder);
    if (!fs.existsSync(dir)) {
      console.log(`Skip ${folder} (not found)`);
      continue;
    }
    const files = getAllFiles(dir);
    for (const filePath of files) {
      const rel = path.relative(SOURCE_DIR, filePath);
      const key = `${S3_PREFIX}/assets/images/${rel}`;
      const body = fs.readFileSync(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentType = ext === '.svg' ? 'image/svg+xml' : ext === '.png' ? 'image/png' : 'image/jpeg';
      await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }));
      count++;
      if (count % 20 === 0) console.log(`Uploaded ${count} files...`);
    }
  }
  console.log(`Done. Uploaded ${count} files to s3://${bucket}/${S3_PREFIX}/`);
}

main().catch(console.error);
