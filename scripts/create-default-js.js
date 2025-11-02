#!/usr/bin/env node
// Create default.js for Prisma client
// This file needs to export PrismaClient from the generated client
// After compilation, it should point to client.js

const fs = require('fs');
const path = require('path');

const defaultJsPath = path.resolve(__dirname, '../node_modules/@prisma/client/.prisma/client/default.js');
const clientJsPath = path.resolve(__dirname, '../node_modules/@prisma/client/.prisma/client/client.js');
const clientTsPath = path.resolve(__dirname, '../node_modules/@prisma/client/.prisma/client/client.ts');

// Ensure directory exists
const defaultJsDir = path.dirname(defaultJsPath);
if (!fs.existsSync(defaultJsDir)) {
  fs.mkdirSync(defaultJsDir, { recursive: true });
}

// Check if compiled client.js exists
const hasCompiledJs = fs.existsSync(clientJsPath);
const hasTypeScript = fs.existsSync(clientTsPath);

// Create default.js that re-exports from client
// Use compiled JavaScript if available, otherwise point to TypeScript (webpack will handle it)
let defaultJsContent;
if (hasCompiledJs) {
  // Use compiled JavaScript file
  defaultJsContent = `// Prisma Client Default Export
// Re-export from the compiled JavaScript client file
module.exports = require('./client.js');
`;
} else if (hasTypeScript) {
  // Fallback to TypeScript - webpack will handle transpilation
  defaultJsContent = `// Prisma Client Default Export
// Re-export from TypeScript client file
// Webpack will transpile this during build
module.exports = require('./client.ts');
`;
} else {
  // Last resort - try client.js, then client.ts
  defaultJsContent = `// Prisma Client Default Export
// Try to require compiled JS, fallback to TS
try {
  module.exports = require('./client.js');
} catch {
  module.exports = require('./client.ts');
}
`;
}

fs.writeFileSync(defaultJsPath, defaultJsContent, 'utf8');
console.log('✅ Created default.js at:', defaultJsPath);
if (hasCompiledJs) {
  console.log('   → Using compiled client.js');
} else {
  console.log('   → Using TypeScript client.ts (webpack will transpile)');
}
