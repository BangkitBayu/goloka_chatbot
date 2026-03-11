import pino from 'pino';

const logger = pino({
  level: process.env.APP_ENV === 'production' ? 'info' : 'debug',
  transport:
    process.env.APP_ENV !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
});

export default logger;
