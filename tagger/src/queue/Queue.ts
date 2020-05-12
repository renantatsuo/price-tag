import { ListenCallback } from "./ListenCallback";
import { Message } from "./Message";

/**
 * Interface to handle queues operations.
 */
export interface Queue {
  /**
   * Send a message to a queue.
   *
   * @param message the message to be published
   * @param queue the queue to send the message
   */
  sendMessage(message: Message, queue?: string): Promise<Message>;

  /**
   * Listen to the messages from the queue.
   *
   * @param callback the messages handler function
   */
  listen(callback: ListenCallback): Promise<1>;
}
