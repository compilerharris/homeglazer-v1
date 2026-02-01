import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export interface WoodPolishingEstimatePdfInput {
  fullName: string;
  email: string;
  phone: string;
  location?: string;
  serviceType?: string;
  inputMethod: string;
  area?: number;
  itemCounts?: {
    doors?: number;
    windows?: number;
    wallPanels?: number;
    furnitureArea?: number;
  };
  selectedWoodFinishType: string;
  selectedWoodFinishBrand: string;
  selectedWoodFinish: {
    name: string;
    value: number;
  };
  grandTotalFormatted: string;
  summaryHtml: string;
}

function htmlToPlainText(html: string): string {
  if (!html) return '';

  // Replace common block-level tags with newlines to preserve structure
  let text = html
    .replace(/<\/(p|div|br|li|h[1-6])>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n');

  // Preserve rupee symbol before stripping tags
  text = text.replace(/₹/g, '\u20B9'); // Ensure rupee symbol is preserved

  // Strip remaining tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode basic HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8377;/g, '\u20B9') // HTML entity for rupee
    .replace(/&rupee;/g, '\u20B9'); // Alternative entity

  // Collapse multiple blank lines
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line, index, arr) => line !== '' || (index > 0 && arr[index - 1] !== ''))
    .join('\n');
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

export async function generateWoodPolishingEstimatePdf(
  data: WoodPolishingEstimatePdfInput
): Promise<Buffer> {
  return new Promise<Buffer>(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];
      const pageWidth = doc.page.width as number;
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
        location,
        serviceType,
        inputMethod,
        area,
        itemCounts,
        selectedWoodFinishType,
        selectedWoodFinishBrand,
        selectedWoodFinish,
        grandTotalFormatted,
        summaryHtml,
      } = data;

      const plainSummary = htmlToPlainText(summaryHtml);

      // Add logo at the top center on white background (above blue ribbon)
      const logoPath = path.join(process.cwd(), 'public', 'assets', 'images', 'home-glazer-logo-1.png');
      const logoWidth = 180; // Increased for better quality
      const logoHeight = 75; // Increased for better quality
      const logoX = (pageWidth - logoWidth) / 2;
      const logoY = 10;
      const logoSectionHeight = 95; // White area for logo (increased)

      try {
        // Read local logo file (already PNG, no conversion needed)
        const logoBuffer = await readLocalImage(logoPath);

        // Resize PNG with sharp at higher quality
        // Keep transparent background for PDF
        const pngBuffer = await sharp(logoBuffer)
          .resize(logoWidth, logoHeight, { 
            fit: 'contain', 
            background: { r: 0, g: 0, b: 0, alpha: 0 },
            kernel: sharp.kernel.lanczos3 // High-quality resize algorithm
          })
          .png({ quality: 100, compressionLevel: 0 }) // Maximum quality
          .toBuffer();

        // Add logo image on white background (above blue ribbon)
        doc.image(pngBuffer, logoX, logoY, {
          width: logoWidth,
          height: logoHeight,
        });
      } catch (logoError: any) {
        console.error('Error loading logo in PDF:', logoError);
        // Continue without logo if it fails to load
      }

      // Blue ribbon for heading (limited width, matching content wrapper)
      const ribbonY = logoSectionHeight;
      const ribbonHeight = 45;
      const ribbonMargin = 50; // Same as content margins
      const ribbonWidth = pageWidth - (ribbonMargin * 2);
      const ribbonX = ribbonMargin;

      doc.rect(ribbonX, ribbonY, ribbonWidth, ribbonHeight).fill(brandBlue);

      // Header text on blue ribbon
      doc
        .fillColor('white')
        .fontSize(18)
        .font('Helvetica-Bold')
        .text('Wood Polishing Estimate', ribbonX, ribbonY + 10, {
          width: ribbonWidth,
          align: 'center',
        });

      // Generated on date (replacing tagline)
      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('white')
        .text(`Generated on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`, ribbonX, ribbonY + 30, {
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

      doc.text(`Name: ${fullName}`);
      doc.text(`Email: ${email}`);
      doc.text(`Phone: ${phone}`);
      if (location) {
        doc.text(`Location: ${location}`);
      }
      if (serviceType) {
        doc.text(`Service Type: ${serviceType}`);
      }

      doc.moveDown(1.5);

      // Wood Polishing details
      doc
        .fontSize(13)
        .font('Helvetica-Bold')
        .fillColor(brandBlue)
        .text('Wood Polishing Details');
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(11).fillColor('black');

      doc.text(`Input Method: ${inputMethod === 'area' ? 'Direct Area' : 'Item Count'}`);

      if (inputMethod === 'area' && area) {
        doc.text(`Total Area: ${area} sq.ft`);
      } else if (itemCounts) {
        if (itemCounts.doors && itemCounts.doors > 0) {
          doc.text(`No. of Doors: ${itemCounts.doors} (${itemCounts.doors * 65} sq.ft)`);
        }
        if (itemCounts.windows && itemCounts.windows > 0) {
          doc.text(`No. of Windows: ${itemCounts.windows} (${itemCounts.windows * 30} sq.ft)`);
        }
        if (itemCounts.wallPanels && itemCounts.wallPanels > 0) {
          doc.text(`No. of Wall Panels & Wardrobes: ${itemCounts.wallPanels} (${itemCounts.wallPanels * 80} sq.ft)`);
        }
        if (itemCounts.furnitureArea && itemCounts.furnitureArea > 0) {
          doc.text(`Furniture Area: ${itemCounts.furnitureArea} sq.ft`);
        }
      }

      doc.text(`Finish: ${selectedWoodFinish.name} (${selectedWoodFinishBrand})`);

      doc.moveDown(1.5);

      // Grand total highlight - use "Rs." as a fallback so it always renders
      doc
        .fontSize(13)
        .font('Helvetica-Bold')
        .fillColor(brandPink)
        .text(`Estimated Total: Rs. ${grandTotalFormatted}`, {
          align: 'left',
        });

      doc.moveDown(1.5);

      // Footer / note
      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('black')
        .text(
          'Note: This is an indicative estimate generated using the Home Glazer Wood Polishing Calculator. ' +
            'Actual costs may vary based on site conditions, surface preparation, and final product selection.',
          {
            align: 'left',
          }
        );

      doc.moveDown(1.5);

      // Strong CTA box to nudge user to contact (moved to top)
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('white');

      const ctaY = doc.y;
      const ctaHeight = 50;
      doc.rect(50, ctaY - 10, pageWidth - 100, ctaHeight).fill(brandPink);

      doc
        .fillColor('white')
        .text(
          'Ready to get started? Call +91-9717256514 or email homeglazer@gmail.com to book a site visit and get a final quotation.',
          60,
          ctaY - 5,
          {
            width: pageWidth - 120,
            align: 'center',
          }
        );

      doc.moveDown(1.5);

      // Contact details & links (moved below CTA, left aligned)
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

      // Social media links with names as clickable hyperlinks (simplified approach)
      doc.moveDown(0.3);

      // Set font size and style once for consistent width calculations
      doc.fontSize(10).font('Helvetica');

      // Build social links using continued text (more reliable than manual positioning)
      // Left-align for reliability (still professional)
      doc.fillColor(brandBlue);
      doc.text('Facebook', { 
        link: 'https://www.facebook.com/homeglazers/', 
        underline: true, 
        continued: true 
      });

      doc.fillColor('black');
      doc.text(' | ', { continued: true });

      doc.fillColor(brandBlue);
      doc.text('LinkedIn', { 
        link: 'https://in.linkedin.com/company/home-glazer', 
        underline: true, 
        continued: true 
      });

      doc.fillColor('black');
      doc.text(' | ', { continued: true });

      doc.fillColor(brandBlue);
      doc.text('Instagram', { 
        link: 'https://www.instagram.com/homeglazer/', 
        underline: true, 
        continued: true 
      });

      doc.fillColor('black');
      doc.text(' | ', { continued: true });

      doc.fillColor(brandBlue);
      doc.text('Quora', { 
        link: 'https://www.quora.com/profile/Home-Glazer', 
        underline: true, 
        continued: true 
      });

      doc.fillColor('black');
      doc.text(' | ', { continued: true });

      doc.fillColor(brandBlue);
      doc.text('Pinterest', { 
        link: 'https://in.pinterest.com/homeglazer/', 
        underline: true, 
        continued: true 
      });

      doc.fillColor('black');
      doc.text(' | ', { continued: true });

      doc.fillColor(brandBlue);
      doc.text('X', { 
        link: 'https://twitter.com/homeglazer', 
        underline: true 
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
