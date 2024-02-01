// logger.mjs
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console(), // You can add more transports (e.g., file transport)
    new transports.File({ filename: 'server-logs.log' }), // Add file transport
  ],
});

export default logger;
