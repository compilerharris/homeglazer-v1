import { PrismaClient } from '@prisma/client';

// Use globalThis to prevent multiple instances of Prisma Client during development and build
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize Prisma Client with singleton pattern
// This ensures only one instance exists across all serverless functions and build processes
let prismaInstance: PrismaClient;

try {
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

  // Always store in globalThis to reuse across builds and serverless invocations
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prismaInstance;
  }
} catch (error: any) {
  console.error('Failed to initialize Prisma Client:', error);
  console.error('Error message:', error?.message);
  console.error('Error stack:', error?.stack);
  // Create a minimal Prisma instance that will fail gracefully
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient();
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prismaInstance;
  }
}

export const prisma = prismaInstance;
