import amqplib, { Channel } from "amqplib";
import { Logger } from "./../log";
import { ListenCallback } from "./ListenCallback";
import { Message } from "./Message";
import { Queue } from "./Queue";

const logger = new Logger("RabbitQueue");

/**
 * RabbitMQ Queue implementation.
 */
export class RabbitQueue implements Queue {
  /**
   * The queue name.
   */
  private queue: string;

  /**
   * The rabbit connection string.
   */
  private connectionString: string;

  /**
   * The rabbit channel.
   */
  private channel?: Channel;

  /**
   * Constructor.
   *
   * @param queue The queue name
   * @param connectionString The rabbitmq connection string
   */
  constructor(queue: string, connectionString: string) {
    this.queue = queue;
    this.connectionString = connectionString;
  }

  /**
   * Create the rabbit channel.
   */
  private async getChannel(): Promise<Channel> {
    if (!this.channel) {
      const connection = await amqplib.connect(this.connectionString);
      this.channel = await connection.createChannel();

      this.channel.assertExchange(this.queue, "direct", { durable: true });
      this.channel.assertQueue(this.queue, { durable: true });
      this.channel.bindQueue(this.queue, this.queue, "");

      logger.info("[AMQP] Connected.");

      connection.on("error", logger.error);
      connection.on("close", () => logger.info("[AMQP] Connection closed."));
    }

    return this.channel;
  }

  /**
   * Send a message to a queue.
   *
   * @param message the message to be sent
   * @param queue the queue to send the message, default is the same queue
   */
  async sendMessage(
    message: Message,
    queue: string = this.queue
  ): Promise<Message> {
    const channel = await this.getChannel();

    try {
      channel.publish(this.queue, "", Buffer.from(JSON.stringify(message)));
      return message;
    } catch (e) {
      logger.error(e);
      await channel.close();
      return Promise.reject(e);
    }
  }

  /**
   * Listen to the current queue.
   *
   * @param callback the message handler function
   */
  async listen(callback: ListenCallback): Promise<1> {
    const channel = await this.getChannel();

    try {
      await channel.consume(
        this.queue,
        (message) => message && callback(JSON.parse(message.content.toString()))
      );
      return 1;
    } catch (e) {
      logger.error(e);
      await channel.close();
      return Promise.reject(e);
    }
  }
}
