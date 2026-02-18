import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export interface ColorSelectionItem {
  wallKey: string;
  wallLabel: string;
  colorHex: string;
  colorName: string;
  colorCode: string;
}

export interface VisualiserSummaryPdfInput {
  fullName: string;
  email: string;
  phone: string;
  roomTypeLabel: string;
  roomVariantLabel: string;
  brandName: string;
  colorSelections: ColorSelectionItem[];
  previewImageBase64: string;
  mainImagePath?: string;
}

function readLocalImage(filePath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

function parsePreviewImageBase64(input: string): Buffer {
  const base64 = input.includes('base64,') ? input.split('base64,')[1] : input;
  return Buffer.from(base64, 'base64');
}

const VALID_HEX = /^#?[0-9A-Fa-f]{6}$/;
function toValidHex(value: string | undefined): string {
  if (!value) return '#cccccc';
  const normalized = value.startsWith('#') ? value : `#${value}`;
  return VALID_HEX.test(normalized) ? normalized : '#cccccc';
}

export async function generateVisualiserSummaryPdf(
  data: VisualiserSummaryPdfInput
): Promise<Buffer> {
  return new Promise<Buffer>(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];
      const pageWidth = doc.page.width as number;
      const pageHeight = (doc.page.height as number) || 842;
      const contentWidth = pageWidth - 100;
      const brandPink = '#ED276E';
      const brandBlue = '#299dd7';

      doc.on('data', (chunk) => {
        chunks.push(chunk as Buffer);
      });

      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });

      doc.on('error', (err) => {
        reject(err);
      });

      const {
        fullName,
        email,
        phone,
        roomTypeLabel,
        roomVariantLabel,
        brandName,
        colorSelections,
        previewImageBase64,
        mainImagePath,
      } = data;

      const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'home-glazer-logo-1.png');
      const logoWidth = 180;
      const logoHeight = 75;
      const logoX = (pageWidth - logoWidth) / 2;
      const logoY = 10;
      const logoSectionHeight = 95;

      try {
        const logoBuffer = await readLocalImage(logoPath);
        const pngBuffer = await sharp(logoBuffer)
          .resize(logoWidth, logoHeight, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
            kernel: sharp.kernel.lanczos3,
          })
          .png({ quality: 100, compressionLevel: 0 })
          .toBuffer();
        doc.image(pngBuffer, logoX, logoY, { width: logoWidth, height: logoHeight });
      } catch (logoError) {
        console.error('Error loading logo in PDF:', logoError);
      }

      const ribbonY = logoSectionHeight;
      const ribbonHeight = 45;
      const ribbonMargin = 50;
      const ribbonWidth = pageWidth - ribbonMargin * 2;
      const ribbonX = ribbonMargin;

      doc.rect(ribbonX, ribbonY, ribbonWidth, ribbonHeight).fill(brandBlue);

      doc
        .fillColor('white')
        .fontSize(18)
        .font('Helvetica-Bold')
        .text('Colour Visualiser Summary', ribbonX, ribbonY + 10, {
          width: ribbonWidth,
          align: 'center',
        });

      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('white')
        .text(
          `Generated on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
          ribbonX,
          ribbonY + 30,
          { width: ribbonWidth, align: 'center' }
        );

      doc.y = logoSectionHeight + ribbonHeight + 20;
      doc.fillColor('black');

      // Customer details
      doc
        .fontSize(13)
        .font('Helvetica-Bold')
        .fillColor(brandBlue)
        .text('Customer Details');
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(11).fillColor('black');
      doc.text(`Name: ${fullName}`);
      doc.text(`Email: ${email}`);
      doc.text(`Phone: ${phone}`);
      doc.moveDown(1);

      // Room Preview (immediately below Customer Details)
      const maxPreviewBase64Length = 4 * 1024 * 1024; // 4MB
      const maxEmbedWidth = contentWidth;
      const maxEmbedHeight = Math.min(320, pageHeight * 0.4);

      const embedRoomPreview = async (rawBuffer: Buffer) => {
        const imageBuffer = await sharp(rawBuffer)
          .resize(Math.round(maxEmbedWidth), Math.round(maxEmbedHeight), {
            fit: 'inside',
            withoutEnlargement: true,
          })
          .jpeg({ quality: 85 })
          .toBuffer();
        const meta = await sharp(imageBuffer).metadata();
        const imgW = meta.width ?? maxEmbedWidth;
        const imgH = meta.height ?? maxEmbedHeight;
        const scale = Math.min(maxEmbedWidth / imgW, maxEmbedHeight / imgH, 1);
        const displayW = imgW * scale;
        const displayH = imgH * scale;
        doc
          .fontSize(13)
          .font('Helvetica-Bold')
          .fillColor(brandBlue)
          .text('Room Preview');
        doc.moveDown(0.5);
        doc.image(imageBuffer, 50, doc.y, { width: displayW, height: displayH });
        doc.y += displayH + 15;
      };

      let previewEmbedded = false;
      if (
        previewImageBase64 &&
        previewImageBase64.length > 50 &&
        previewImageBase64.length <= maxPreviewBase64Length
      ) {
        try {
          const rawBuffer = parsePreviewImageBase64(previewImageBase64);
          await embedRoomPreview(rawBuffer);
          previewEmbedded = true;
        } catch (imgErr) {
          console.error('Error embedding preview image in PDF:', imgErr);
        }
      }

      // Fallback: use base room image from public assets when capture is missing
      if (!previewEmbedded && mainImagePath) {
        try {
          const sanitized = mainImagePath.replace(/^\//, '');
          if (!sanitized.includes('..') && sanitized.startsWith('assets/')) {
            const publicPath = path.join(process.cwd(), 'public', sanitized);
            const resolvedPath = path.resolve(publicPath);
            const publicDir = path.resolve(process.cwd(), 'public');
            if (resolvedPath.startsWith(publicDir)) {
              const rawBuffer = await readLocalImage(publicPath);
              await embedRoomPreview(rawBuffer);
            }
          }
        } catch (e) {
          console.error('Fallback room image failed:', e);
        }
      }

      doc.moveDown(1.5);

      // Room details
      doc
        .fontSize(13)
        .font('Helvetica-Bold')
        .fillColor(brandBlue)
        .text('Room Details');
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(11).fillColor('black');
      doc.text(`Room Type: ${roomTypeLabel}`);
      doc.text(`Room Variant: ${roomVariantLabel}`);
      doc.text(`Paint Brand: ${brandName}`);
      doc.moveDown(1.5);

      // Colours Applied: move heading and content together to next page if needed
      const colorRowHeight = 18;
      const headingHeight = 30;
      const spaceNeeded = headingHeight + colorSelections.length * colorRowHeight + 80;
      if (doc.y + spaceNeeded > pageHeight - 50) {
        doc.addPage();
      }

      // Colour application (with small colour box preview per row)
      doc
        .fontSize(13)
        .font('Helvetica-Bold')
        .fillColor(brandBlue)
        .text('Colours Applied');
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(11).fillColor('black');

      const colorBoxSize = 12;
      const lineHeight = 14;
      // Align swatch with text baseline (shift down: rowY - 2 so swatch overlaps text line)
      const swatchOffsetY = 2;
      colorSelections.forEach((sel) => {
        const rowY = doc.y;
        const hex = toValidHex(sel.colorHex);
        doc
          .fillColor(hex)
          .strokeColor('#333')
          .lineWidth(0.5)
          .rect(50, rowY - swatchOffsetY, colorBoxSize, colorBoxSize)
          .fillAndStroke();
        doc
          .fillColor('black')
          .lineWidth(1)
          .text(
            `${sel.wallLabel}: ${sel.colorName} (${sel.colorCode})`,
            50 + colorBoxSize + 10,
            rowY,
            { width: contentWidth - 72 }
          );
        doc.y = Math.max(doc.y, rowY + lineHeight) + 2;
      });

      doc.moveDown(1);

      // Disclaimer
      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('black')
        .text(
          'Colours shown are for reference; actual paint may look different on your walls based on lighting, surface, and surroundings. For final shade matching and expert advice, book a consultation with Home Glazer.',
          { align: 'left' }
        );
      doc.moveDown(1.5);

      // Contact CTA
      doc.fontSize(12).font('Helvetica-Bold').fillColor('white');
      const ctaY = doc.y;
      const ctaHeight = 50;
      doc.rect(50, ctaY - 10, pageWidth - 100, ctaHeight).fill(brandPink);
      doc
        .fillColor('white')
        .text(
          'Ready to get this look? Call +91-9717256514 or email homeglazer@gmail.com to book a site visit.',
          60,
          ctaY - 5,
          { width: pageWidth - 120, align: 'center' }
        );
      doc.moveDown(1.5);

      // Contact details
      doc.fontSize(12).font('Helvetica-Bold').fillColor(brandPink).text('Contact Home Glazer');
      doc.moveDown(0.5);
      doc.fontSize(10).font('Helvetica').fillColor('black');
      doc.text('Address: B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010');
      doc.text('Phone: +91-9717256514');
      doc.text('Email: homeglazer@gmail.com');
      doc.text('Website: www.homeglazer.com');

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
