import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export interface ColorSelection {
  wallKey: string;
  colorHex: string;
  colorName: string;
  colorCode: string;
}

export interface VisualizerEstimatePdfInput {
  clientName: string;
  email: string;
  phone: string;
  roomType: string;
  roomVariant: string;
  brand: string;
  colorSelections: ColorSelection[];
  previewImage?: string; // base64 data URL
}

// Helper function to read local image file
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

// Helper function to convert hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '');
  return {
    r: parseInt(cleanHex.substr(0, 2), 16),
    g: parseInt(cleanHex.substr(2, 2), 16),
    b: parseInt(cleanHex.substr(4, 2), 16),
  };
}

// Helper function to format room variant name (e.g., "kidsroom1" -> "Kids Room 1")
function formatRoomVariant(variant: string): string {
  if (!variant) return variant;
  
  // Insert space before capital letters and numbers
  let formatted = variant
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase
    .replace(/([a-zA-Z])(\d)/g, '$1 $2') // letter followed by number
    .replace(/(\d)([a-zA-Z])/g, '$1 $2'); // number followed by letter
  
  // Capitalize first letter of each word
  formatted = formatted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return formatted;
}

export async function generateVisualizerEstimatePdf(
  data: VisualizerEstimatePdfInput
): Promise<Buffer> {
  return new Promise<Buffer>(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];
      const pageWidth = doc.page.width as number;
      const pageHeight = doc.page.height as number;
      const brandPink = '#ED276E';
      const brandBlue = '#299dd7';
      const margin = 50;
      const contentWidth = pageWidth - (margin * 2);

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
        clientName,
        email,
        phone,
        roomType,
        roomVariant,
        brand,
        colorSelections,
        previewImage,
      } = data;

      // ===== PAGE 1: Logo, Header, Preview Image, Selection Summary =====

      // Add logo at the top center on white background
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

        doc.image(pngBuffer, logoX, logoY, {
          width: logoWidth,
          height: logoHeight,
        });
      } catch (logoError: any) {
        console.error('Error loading logo in PDF:', logoError);
      }

      // Blue ribbon for heading
      const ribbonY = logoSectionHeight;
      const ribbonHeight = 45;
      const ribbonMargin = 50;
      const ribbonWidth = pageWidth - (ribbonMargin * 2);
      const ribbonX = ribbonMargin;

      doc.rect(ribbonX, ribbonY, ribbonWidth, ribbonHeight).fill(brandBlue);

      // Header text on blue ribbon
      doc
        .fillColor('white')
        .fontSize(18)
        .font('Helvetica-Bold')
        .text('Colour Visualizer Summary', ribbonX, ribbonY + 10, {
          width: ribbonWidth,
          align: 'center',
        });

      // Generated on date
      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('white')
        .text(`Created on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`, ribbonX, ribbonY + 30, {
          width: ribbonWidth,
          align: 'center',
        });

      // Move to content area below header
      doc.y = logoSectionHeight + ribbonHeight + 20;
      doc.fillColor('black');

      // Customer information
      doc
        .fontSize(13)
        .font('Helvetica-Bold')
        .fillColor(brandBlue)
        .text('Customer Details');
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(11).fillColor('black');

      doc.text(`Name: ${clientName}`);
      doc.text(`Email: ${email}`);
      doc.text(`Phone: ${phone}`);

      doc.moveDown(1);

      // Room Preview Image
      if (previewImage) {
        doc
          .fontSize(13)
          .font('Helvetica-Bold')
          .fillColor(brandBlue)
          .text('Room Preview');
        doc.moveDown(0.5);

        try {
          // Extract base64 data from data URL
          const base64Data = previewImage.replace(/^data:image\/\w+;base64,/, '');
          const imageBuffer = Buffer.from(base64Data, 'base64');

          // Get image metadata to calculate proper dimensions
          const metadata = await sharp(imageBuffer).metadata();
          const originalWidth = metadata.width || 800;
          const originalHeight = metadata.height || 600;
          
          // Calculate aspect ratio
          const aspectRatio = originalWidth / originalHeight;
          
          // Maximum dimensions for the PDF (in points)
          const maxWidth = contentWidth - 20;
          const maxHeight = 180;
          
          // Calculate display dimensions maintaining aspect ratio
          let displayWidth = maxWidth;
          let displayHeight = displayWidth / aspectRatio;
          
          // If height exceeds max, scale down
          if (displayHeight > maxHeight) {
            displayHeight = maxHeight;
            displayWidth = displayHeight * aspectRatio;
          }

          // Process image with sharp - keep high quality, don't downscale aggressively
          const processedImage = await sharp(imageBuffer)
            .png({ 
              quality: 100, 
              compressionLevel: 0 
            })
            .toBuffer();

          const imageY = doc.y;
          const boxHeight = displayHeight + 20; // Add padding
          
          // Center the image horizontally
          const imageX = margin + (contentWidth - displayWidth) / 2;
          
          // Add border around image area
          doc
            .rect(margin, imageY, contentWidth, boxHeight)
            .strokeColor('#e0e0e0')
            .stroke();

          // Add the image - let PDFKit scale it properly
          doc.image(processedImage, imageX, imageY + 10, {
            width: displayWidth,
            height: displayHeight,
          });

          doc.y = imageY + boxHeight + 10;
        } catch (imageError: any) {
          console.error('Error adding preview image to PDF:', imageError);
          doc.fontSize(10).fillColor('gray').text('Preview image could not be loaded');
          doc.moveDown(1);
        }
      }

      doc.moveDown(0.5);

      // Selection Summary
      doc
        .fontSize(13)
        .font('Helvetica-Bold')
        .fillColor(brandBlue)
        .text('Your Selection Summary');
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(11).fillColor('black');

      // Room details
      doc.text(`Room Type: ${roomType}`);
      doc.text(`Room Variant: ${formatRoomVariant(roomVariant)}`);
      doc.text(`Paint Brand: ${brand}`);

      doc.moveDown(1);

      // Colors Applied
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor(brandPink)
        .text(`Colours Applied: ${colorSelections.length} walls`);
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(10).fillColor('black');

      // Color swatches
      const swatchSize = 15;
      const swatchSpacing = 8;
      let currentY = doc.y;

      colorSelections.forEach((color, index) => {
        // Check if we need a new page
        if (currentY + 25 > pageHeight - margin) {
          doc.addPage();
          currentY = margin;
        }

        // Draw color swatch
        const rgb = hexToRgb(color.colorHex);
        doc.rect(margin, currentY, swatchSize, swatchSize).fill([rgb.r, rgb.g, rgb.b]);
        
        // Add border for light colors
        if (color.colorHex.toUpperCase() === '#FFFFFF' || rgb.r + rgb.g + rgb.b > 700) {
          doc.rect(margin, currentY, swatchSize, swatchSize).strokeColor('#cccccc').stroke();
        }

        // Color details
        doc.fillColor('black').text(
          `${color.wallKey}: ${color.colorName} (${color.colorCode})`,
          margin + swatchSize + swatchSpacing,
          currentY + 2
        );

        currentY += swatchSize + 8;
      });

      doc.y = currentY + 10;

      // Check if we have enough space for the rest, otherwise add new page
      if (doc.y + 200 > pageHeight - margin) {
        doc.addPage();
      }

      doc.moveDown(1);

      // CTA Section
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('white');

      const ctaY = doc.y;
      const ctaHeight = 50;
      doc.rect(margin, ctaY - 10, contentWidth, ctaHeight).fill(brandPink);

      doc
        .fillColor('white')
        .text(
          'Ready to get started? Call +91-9717256514 or email homeglazer@gmail.com to bring this look to life!',
          margin + 10,
          ctaY - 5,
          {
            width: contentWidth - 20,
            align: 'center',
          }
        );

      doc.y = ctaY + ctaHeight + 10;
      doc.moveDown(1);

      // Contact Home Glazer section (left aligned)
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor(brandPink)
        .text('Contact Home Glazer', { align: 'left' });

      doc.moveDown(0.5);
      doc.fontSize(10).font('Helvetica').fillColor('black');
      doc.text('Address: B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010', { align: 'left' });
      doc.text('Phone: +91-9717256514', { align: 'left' });
      doc.text('Email: homeglazer@gmail.com', { align: 'left' });
      doc.text('Website: www.homeglazer.com', { align: 'left' });

      doc.moveDown(0.5);
      doc.text('Follow us:', { align: 'left' });

      // Social media links (left-aligned, simplified)
      doc.moveDown(0.3);
      doc.fontSize(10).font('Helvetica');

      doc.fillColor(brandBlue);
      doc.text('Facebook', {
        link: 'https://www.facebook.com/homeglazers/',
        underline: true,
        continued: true,
      });

      doc.fillColor('black');
      doc.text(' | ', { continued: true });

      doc.fillColor(brandBlue);
      doc.text('LinkedIn', {
        link: 'https://in.linkedin.com/company/home-glazer',
        underline: true,
        continued: true,
      });

      doc.fillColor('black');
      doc.text(' | ', { continued: true });

      doc.fillColor(brandBlue);
      doc.text('Instagram', {
        link: 'https://www.instagram.com/homeglazer/',
        underline: true,
        continued: true,
      });

      doc.fillColor('black');
      doc.text(' | ', { continued: true });

      doc.fillColor(brandBlue);
      doc.text('Quora', {
        link: 'https://www.quora.com/profile/Home-Glazer',
        underline: true,
        continued: true,
      });

      doc.fillColor('black');
      doc.text(' | ', { continued: true });

      doc.fillColor(brandBlue);
      doc.text('Pinterest', {
        link: 'https://in.pinterest.com/homeglazer/',
        underline: true,
        continued: true,
      });

      doc.fillColor('black');
      doc.text(' | ', { continued: true });

      doc.fillColor(brandBlue);
      doc.text('X', {
        link: 'https://twitter.com/homeglazer',
        underline: true,
      });

      doc.moveDown(1.5);

      // Disclaimer
      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('gray')
        .text(
          'Disclaimer: Actual colour shades may vary in real conditions due to lighting, surface texture, and other factors. ' +
          'For final shade matching and expert advice, book a consultation with Home Glazer.',
          {
            align: 'left',
          }
        );

      doc.moveDown(1);

      // Footer
      doc
        .fontSize(8)
        .fillColor('gray')
        .text('© 2025 Home Glazer. All Rights Reserved. | Professional Painting & Colour Consultation Services', {
          align: 'center',
        });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
