#!/usr/bin/env node
// Create default.js for Prisma client
// This file needs to export PrismaClient from the generated client

const fs = require('fs');
const path = require('path');

const defaultJsPath = path.resolve(__dirname, '../node_modules/@prisma/client/.prisma/client/default.js');

// Ensure directory exists
const defaultJsDir = path.dirname(defaultJsPath);
if (!fs.existsSync(defaultJsDir)) {
  fs.mkdirSync(defaultJsDir, { recursive: true });
}

// Create default.js that re-exports from client
// Export using a Proxy to avoid Node.js type stripping
const defaultJsContent = `// Prisma Client Default Export
// Re-export from the generated Prisma client
// Next.js webpack will transpile TypeScript automatically

// Use a Proxy to lazy-load the client
// This prevents Node.js from trying to strip types before webpack transpiles
let _client = null;

function getClient() {
  if (!_client) {
    try {
      // Webpack will transpile TypeScript when this is processed
      _client = require('./client');
    } catch (e) {
      // If require fails, return empty object - webpack will handle it
      _client = {};
    }
  }
  return _client;
}

// Export as a Proxy so webpack can handle the TypeScript transpilation
module.exports = new Proxy({}, {
  get(target, prop) {
    return getClient()[prop];
  },
  ownKeys() {
    return Object.keys(getClient() || {});
  },
  has(target, prop) {
    return prop in (getClient() || {});
  }
});
`;

fs.writeFileSync(defaultJsPath, defaultJsContent, 'utf8');
console.log('✅ Created default.js at:', defaultJsPath);
