import { Logger } from "./Logger";

/**
 * Abstract implementation of Logger.
 */
export abstract class AbstractLogger implements Logger {
  /**
   * The logger name
   */
  private name: string;

  /**
   * The default constructor.
   *
   * @param name the logger name
   */
  constructor(name: string) {
    this.name = name;
  }

  protected prefix(): string {
    return `[${new Date().toUTCString()}] [${this.name}]`;
  }

  debug(...message: string[]): void {
    throw new Error("Method not implemented.");
  }

  error(...message: string[]): void {
    throw new Error("Method not implemented.");
  }

  info(...message: string[]): void {
    throw new Error("Method not implemented.");
  }

  trace(...message: string[]): void {
    throw new Error("Method not implemented.");
  }

  warn(...message: string[]): void {
    throw new Error("Method not implemented.");
  }
}
