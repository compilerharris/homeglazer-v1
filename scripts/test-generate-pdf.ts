import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { generateVisualizerEstimatePdf } from '../src/lib/visualizerEstimatePdf';

(async () => {
  try {
    // Create a simple test PNG (solid background) to simulate a captured preview image
    const imgBuf = await sharp({
      create: {
        width: 800,
        height: 600,
        channels: 3,
        background: { r: 200, g: 220, b: 240 },
      },
    }).png().toBuffer();

    const dataUrl = 'data:image/png;base64,' + imgBuf.toString('base64');

    const pdfBuffer = await generateVisualizerEstimatePdf({
      clientName: 'Test User',
      email: 'test@example.com',
      phone: '0000000000',
      roomType: 'Bedroom',
      roomVariant: 'bedroom1',
      brand: 'TestBrand',
      colorSelections: [
        { wallKey: 'Left', colorHex: '#cfe8ff', colorName: 'Celestial', colorCode: '2951502' },
        { wallKey: 'Front', colorHex: '#0b2b3b', colorName: 'Arctic Night', colorCode: '2951583' }
      ],
      previewImage: dataUrl,
      captureDiagnostic: { generatedBy: 'scripts/test-generate-pdf.ts' },
    });

    const outDir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outPath = path.join(outDir, 'test.pdf');
    fs.writeFileSync(outPath, pdfBuffer);
    console.log('Test PDF written to', outPath, 'size=', pdfBuffer.length);
  } catch (err) {
    console.error('Error generating test PDF:', err);
    process.exit(1);
  }
})();
