/**
 * Prisma CLI config (replaces deprecated package.json#prisma).
 * Using .js for Vercel/build environments that cannot parse TypeScript.
 * See: https://www.prisma.io/docs/orm/reference/prisma-config-reference
 */
require('dotenv/config');
const { defineConfig } = require('prisma/config');

module.exports = defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? 'mongodb://localhost:27017/placeholder',
  },
});
