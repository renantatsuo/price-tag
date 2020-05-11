import { AbstractLogger } from "./AbstractLogger";

/**
 * The console implementation for Logger.
 */
export class ConsoleLogger extends AbstractLogger {
  constructor(name: string) {
    super(name);
  }

  debug(...message: string[]): void {
    console.debug(this.prefix(), ...message);
  }
  error(...message: string[]): void {
    console.error(this.prefix(), ...message);
  }
  info(...message: string[]): void {
    console.info(this.prefix(), ...message);
  }
  trace(...message: string[]): void {
    console.trace(this.prefix(), ...message);
  }
  warn(...message: string[]): void {
    console.warn(this.prefix(), ...message);
  }
}
