const fs = require('fs');
const path = require('path');

function inspectPdf(pdfPath) {
  const data = fs.readFileSync(pdfPath);
  const text = data.toString('latin1'); // preserve bytes

  const imageMatches = [];
  const regex = /<<[^>]{0,200}?\/Subtype\s*\/Image[^>]{0,200}>>/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    const start = Math.max(0, m.index - 60);
    const end = Math.min(text.length, m.index + m[0].length + 60);
    imageMatches.push(text.slice(start, end));
  }

  console.log('PDF path:', pdfPath);
  console.log('File size bytes:', data.length);
  console.log('Found /Subtype /Image occurrences:', imageMatches.length);
  imageMatches.slice(0, 5).forEach((snippet, i) => {
    console.log('\n--- Image Snippet', i + 1, '---');
    console.log(snippet.replace(/\r/g, '\\r').replace(/\n/g, '\\n'));
  });

  // Heuristic: search for 'stream' followed by binary and 'endstream'
  const streamCount = (text.match(/endstream/g) || []).length;
  console.log('\nendstream count (heuristic streams):', streamCount);
}

const pdfPath = path.join(process.cwd(), 'tmp', 'test.pdf');
if (!fs.existsSync(pdfPath)) {
  console.error('PDF not found at', pdfPath);
  process.exit(1);
}
inspectPdf(pdfPath);
