import winston from 'winston';

// Configure winston (you can adjust this configuration based on your needs)
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

class CustomError extends Error {
  constructor(message, statusCode = 500, additionalInfo = {}) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode; // HTTP status code
    this.additionalInfo = additionalInfo; // Additional custom properties

    Error.captureStackTrace(this, this.constructor); // Capture stack trace

    // Log the error immediately upon creation
    this.logError();
  }

  logError() {
    logger.error({
      message: this.message,
      statusCode: this.statusCode,
      additionalInfo: this.additionalInfo,
      stack: this.stack,
    });
  }
}

export default CustomError;