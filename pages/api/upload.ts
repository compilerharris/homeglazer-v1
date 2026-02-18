import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/middleware';
import formidable from 'formidable';
import path from 'path';
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Use S3_ prefix - Amplify blocks env vars starting with AWS_
function getS3Client() {
  const region = process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1';
  const accessKeyId = process.env.S3_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('S3_ACCESS_KEY_ID and S3_SECRET_ACCESS_KEY must be set');
  }

  return new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

function getMediaBaseUrl(): string {
  const bucket = process.env.S3_BUCKET;
  const region = process.env.S3_REGION || process.env.AWS_REGION || 'us-east-1';
  if (!bucket) {
    throw new Error('S3_BUCKET must be set');
  }
  return `https://${bucket}.s3.${region}.amazonaws.com`;
}

async function uploadToS3(
  key: string,
  body: Buffer,
  contentType: string
): Promise<string> {
  const bucket = process.env.S3_BUCKET;
  if (!bucket) {
    throw new Error('S3_BUCKET must be set');
  }

  const client = getS3Client();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })
  );

  const baseUrl = getMediaBaseUrl();
  return `${baseUrl}/${key}`;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);

    const type = Array.isArray(fields.type) ? fields.type[0] : fields.type;
    const uploadedFile = Array.isArray(files.image) ? files.image[0] : files.image;

    if (
      !type ||
      (type !== 'brand' && type !== 'product' && type !== 'document' && type !== 'blog')
    ) {
      return res
        .status(400)
        .json({ error: 'Invalid type. Must be "brand", "product", "blog", or "document"' });
    }

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const isPdf = uploadedFile.mimetype === 'application/pdf';

    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!uploadedFile.mimetype || !allowedMimeTypes.includes(uploadedFile.mimetype)) {
      return res.status(400).json({
        error: 'Invalid file type. Only JPEG, PNG, WebP, and PDF are allowed.',
      });
    }

    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = path.extname(uploadedFile.originalFilename || (isPdf ? '.pdf' : 'image.jpg'));
    const filename = `${timestamp}-${randomString}${extension}`;

    const folder =
      type === 'brand' ? 'brands' : type === 'document' ? 'documents' : type === 'blog' ? 'blogs' : 'products';
    const s3Key = `media/${folder}/${filename}`;

    let url: string;

    if (isPdf) {
      const buffer = fs.readFileSync(uploadedFile.filepath);
      url = await uploadToS3(s3Key, buffer, 'application/pdf');
      fs.unlinkSync(uploadedFile.filepath);

      return res.status(200).json({
        success: true,
        url,
        filename,
      });
    }

    const buffer = await sharp(uploadedFile.filepath)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toBuffer();

    fs.unlinkSync(uploadedFile.filepath);

    const webpFilename = filename.replace(extension, '.webp');
    const webpKey = `media/${folder}/${webpFilename}`;
    url = await uploadToS3(webpKey, buffer, 'image/webp');

    return res.status(200).json({
      success: true,
      url,
      filename: webpFilename,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' });
    }
    if (error.message?.includes('unsupported image format') || error.code === 'ERR_UNSUPPORTED') {
      return res.status(400).json({ error: 'Unsupported image format. Use JPEG, PNG, or WebP.' });
    }
    const msg = process.env.NODE_ENV === 'development' && error?.message
      ? error.message
      : 'Internal server error';
    return res.status(500).json({ error: msg });
  }
}

export default requireAuth(handler);
