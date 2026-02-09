import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function run() {
  try {
    // create a small test image
    const imgBuf = await sharp({
      create: { width: 400, height: 300, channels: 3, background: { r: 220, g: 230, b: 240 } }
    }).png().toBuffer();

    const dataUrl = 'data:image/png;base64,' + imgBuf.toString('base64');

    const payload = {
      clientName: 'API Test',
      email: 'apitest@example.com',
      phone: '000',
      roomType: 'Bedroom',
      roomVariant: 'bedroom1',
      brand: 'Test',
      colorSelections: [],
      previewImage: dataUrl,
      captureDiagnostic: { src: 'scripts/post-test-api.js' }
    };

    const res = await fetch('http://localhost:3000/api/visualizer/send-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log('API response status:', res.status);
    console.log('API response body:', text);
  } catch (err) {
    console.error('Error posting to API:', err);
    process.exit(1);
  }
}

run();
