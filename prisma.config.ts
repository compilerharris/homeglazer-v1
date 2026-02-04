/**
 * Prisma CLI config (replaces deprecated package.json#prisma).
 * See: https://www.prisma.io/docs/orm/reference/prisma-config-reference
 */
export default {
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
};
