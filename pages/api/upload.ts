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

// NOTE:
// We intentionally use a separate "media" base directory so that
// large legacy assets under "public/uploads" (e.g. services, blogs)
// are not pulled into the api/upload serverless function bundle.
const uploadDir = path.join(process.cwd(), 'public', 'media');
ensureUploadDir(path.join(uploadDir, 'brands'));
ensureUploadDir(path.join(uploadDir, 'products'));
ensureUploadDir(path.join(uploadDir, 'documents'));
ensureUploadDir(path.join(uploadDir, 'blogs'));

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

    // Check if it's a PDF
    const isPdf = uploadedFile.mimetype === 'application/pdf';
    
    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (!uploadedFile.mimetype || !allowedMimeTypes.includes(uploadedFile.mimetype)) {
      return res.status(400).json({
        error: 'Invalid file type. Only JPEG, PNG, WebP, and PDF are allowed.',
      });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = path.extname(uploadedFile.originalFilename || (isPdf ? '.pdf' : 'image.jpg'));
    const filename = `${timestamp}-${randomString}${extension}`;
    
    let targetDir: string;
    if (type === 'brand') {
      targetDir = path.join(uploadDir, 'brands');
    } else if (type === 'document') {
      targetDir = path.join(uploadDir, 'documents');
    } else if (type === 'blog') {
      targetDir = path.join(uploadDir, 'blogs');
    } else {
      targetDir = path.join(uploadDir, 'products');
    }
    
    const targetPath = path.join(targetDir, filename);

    // Handle PDF files differently - just move them
    if (isPdf) {
      fs.renameSync(uploadedFile.filepath, targetPath);
      
      const urlPath = `/media/${
        type === 'brand' ? 'brands' : type === 'document' ? 'documents' : type === 'blog' ? 'blogs' : 'products'
      }/${filename}`;
      
      return res.status(200).json({
        success: true,
        url: urlPath,
        filename: filename,
      });
    }

    // Move and optimize image
    await sharp(uploadedFile.filepath)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toFile(targetPath.replace(extension, '.webp'));

    // Remove temp file
    fs.unlinkSync(uploadedFile.filepath);

    // Return the URL path
    const imageFolder =
      type === 'brand' ? 'brands' : type === 'blog' ? 'blogs' : 'products';
    const urlPath = `/media/${imageFolder}/${filename.replace(extension, '.webp')}`;

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

