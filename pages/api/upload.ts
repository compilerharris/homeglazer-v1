import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/middleware';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure upload directories exist
const ensureUploadDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
ensureUploadDir(path.join(uploadDir, 'brands'));
ensureUploadDir(path.join(uploadDir, 'products'));

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB
      keepExtensions: true,
      uploadDir: uploadDir,
    });

    // Parse form
    const [fields, files] = await form.parse(req);

    const type = Array.isArray(fields.type) ? fields.type[0] : fields.type;
    const uploadedFile = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!type || (type !== 'brand' && type !== 'product')) {
      return res.status(400).json({ error: 'Invalid type. Must be "brand" or "product"' });
    }

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!uploadedFile.mimetype || !allowedMimeTypes.includes(uploadedFile.mimetype)) {
      return res.status(400).json({
        error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.',
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = path.extname(uploadedFile.originalFilename || 'image.jpg');
    const filename = `${timestamp}-${randomString}${extension}`;
    const targetDir = path.join(uploadDir, type === 'brand' ? 'brands' : 'products');
    const targetPath = path.join(targetDir, filename);

    // Move and optimize image
    await sharp(uploadedFile.filepath)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toFile(targetPath.replace(extension, '.webp'));

    // Also save original if needed, or remove temp file
    fs.unlinkSync(uploadedFile.filepath);

    // Return the URL path
    const urlPath = `/uploads/${type === 'brand' ? 'brands' : 'products'}/${filename.replace(extension, '.webp')}`;

    return res.status(200).json({
      success: true,
      url: urlPath,
      filename: filename.replace(extension, '.webp'),
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum 5MB allowed.' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default requireAuth(handler);

