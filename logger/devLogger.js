// logger.mjs
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf,errors } = format;

function devLogger(){
  const logFormat = printf(({ level, message, timestamp,stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${stack ||message}`;
  });
  
  return createLogger({
    format: combine(timestamp({format: "YYYY-MM-DD HH:mm:ss"}), 
    format.colorize(),
    errors({stack:true}),
    logFormat),
    transports: [
      new transports.Console(), // You can add more transports (e.g., file transport)
      new transports.File({ filename: 'server-logs.log' }), // Add file transport
    ],
  });
}

export default devLogger;
