import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

/**
 * Singleton PrismaClient instance.
 * Prevents multiple connections in dev hot-reload.
 */
export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log:
        process.env.APP_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
    });
  }
  return prisma;
}

export { prisma };
