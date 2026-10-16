/**
 * Centralized logger utility.
 * Wraps console methods and can be extended to send logs to external services.
 */

class Logger {
  static info(message, ...optionalParams) {
    console.info(`[INFO] ${new Date().toISOString()}:`, message, ...optionalParams);
  }

  static warn(message, ...optionalParams) {
    console.warn(`[WARN] ${new Date().toISOString()}:`, message, ...optionalParams);
  }

  static error(message, ...optionalParams) {
    console.error(`[ERROR] ${new Date().toISOString()}:`, message, ...optionalParams);
  }

  static debug(message, ...optionalParams) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${new Date().toISOString()}:`, message, ...optionalParams);
    }
  }
// minor polish
}

/**
 * Global error handling – catches unhandled promise rejections and logs them.
 */
window.addEventListener('unhandledrejection', (event) => {
  Logger.error('Unhandled Promise Rejection:', event.reason);
});

export default Logger;