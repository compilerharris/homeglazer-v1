#!/usr/bin/env node
/**
 * Generate a secure JWT secret for use in environment variables
 * Usage: node scripts/generate-jwt-secret.js
 */

const crypto = require('crypto');

// Generate a 32-byte (256-bit) random hex string
const jwtSecret = crypto.randomBytes(32).toString('hex');

console.log('\n🔑 Generated JWT Secret:');
console.log('━'.repeat(50));
console.log(jwtSecret);
console.log('━'.repeat(50));
console.log('\n📋 Copy this value and add it to Vercel environment variables as:');
console.log('   Key: JWT_SECRET');
console.log('   Value:', jwtSecret);
console.log('\n⚠️  Keep this secret secure! Do not commit it to Git.\n');

