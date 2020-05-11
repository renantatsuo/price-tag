/**
 * The Logger interface.
 */
export interface Logger {
  /**
   * Logs at debug level.
   *
   * @param message the log message
   */
  debug(...message: string[]): void;

  /**
   * Logs at error level.
   *
   * @param message the log message
   */
  error(...message: string[]): void;

  /**
   * Logs at info level.
   *
   * @param message the log message
   */
  info(...message: string[]): void;

  /**
   * Logs at trace level.
   *
   * @param message the log message
   */
  trace(...message: string[]): void;

  /**
   * Logs at warn level.
   *
   * @param message the log message
   */
  warn(...message: string[]): void;
}
