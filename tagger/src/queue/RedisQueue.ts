import RedisSMQ, { ConstructorOptions, QueueMessage } from "rsmq";
import { Message } from "./Message";
import { Queue } from "./Queue";

/**
 * Redis implementation for the queue.
 */
export class RedisQueue implements Queue {
  /**
   * The queue name.
   */
  queue: string;

  /**
   * The redis client.
   */
  redis: RedisSMQ;

  /**
   * Constructor.
   *
   * @param queue The queue name.
   * @param redisConfig The redis configuration.
   */
  constructor(queue: string, redisConfig: ConstructorOptions) {
    this.queue = queue;
    this.redis = new RedisSMQ(redisConfig);
  }

  /**
   * Start the new queue.
   */
  public async startQueue() {
    await this.redis.deleteQueueAsync({ qname: this.queue });
    return this.redis.createQueueAsync({ qname: this.queue });
  }

  /**
   * Send a message to a queue.
   *
   * @param message the message to be sent.
   * @param queue the queue to send the message, default is the same queue.
   */
  async sendMessage(message: Message, queue: string = this.queue) {
    await this.redis.sendMessageAsync({
      qname: queue,
      message: JSON.stringify(message),
    });
  }

  /**
   * Get the last message from the queue.
   */
  async getMessage(): Promise<Message> {
    const { message } = (await this.redis.popMessageAsync({
      qname: this.queue,
    })) as QueueMessage;

    return JSON.parse(message);
  }
}
