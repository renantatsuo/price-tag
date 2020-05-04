import { Message } from "./Message";

/**
 * Callback specification for the queue listener.
 */
export interface ListenCallback extends Function {
  (message: Message): void;
}
