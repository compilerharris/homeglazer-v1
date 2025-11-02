import { PrismaClient } from '@prisma/client';

// Use globalThis to prevent multiple instances of Prisma Client during development and build
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize Prisma Client with singleton pattern
// This ensures only one instance exists across all serverless functions and build processes
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Always store in globalThis to reuse across builds and serverless invocations
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}
