// logger.mjs
import { createLogger, format, transports } from 'winston';
const { combine,timestamp,errors,json } = format;

function buildLogger(){
  return createLogger({
    format: combine(
    timestamp(), 
    errors({stack:true}),
    json(),
    ),
    defaultMeta:{services: "user-service"},
    transports: [
      new transports.Console(), // You can add more transports (e.g., file transport)
      new transports.File({ filename: 'server-logs.log' }), // Add file transport
    ],
  });
}

export default buildLogger;
