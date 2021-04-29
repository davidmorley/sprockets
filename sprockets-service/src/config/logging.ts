import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.cli(),
  defaultMeta: { service: "sprockets-service" },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.Console(),
  ],
});

export default logger;
