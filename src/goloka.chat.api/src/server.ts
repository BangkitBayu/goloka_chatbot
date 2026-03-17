import 'dotenv/config';
import app from './app';
import logger from './infrastructure/logger';
import { getPrismaClient } from './infrastructure/database/prisma/prismaClient';

const PORT = parseInt(process.env.PORT || '3000', 10);
const prisma = getPrismaClient();

async function main(): Promise<void> {
  // Verify database connection
  await prisma.$connect();
  logger.info('Database connected.');

  const server = app.listen(PORT, () => {
    logger.info(`🚀 GOLOKA API running on http://localhost:${PORT}`);
    logger.info(`   Environment: ${process.env.APP_ENV}`);
  });

  // Graceful shutdown
  const shutdown = async (signal: string): Promise<void> => {
    logger.info(`${signal} received. Shutting down gracefully...`);
    server.close(async () => {
      await prisma.$disconnect();
      logger.info('Database disconnected. Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
}

main().catch((err) => {
  logger.error(err, 'Failed to start server');
  process.exit(1);
});
