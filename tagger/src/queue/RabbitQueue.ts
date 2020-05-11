import amqplib, { Channel } from "amqplib";
import { ListenCallback } from "./ListenCallback";
import { Message } from "./Message";
import { Queue } from "./Queue";

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

      console.info("[AMQP] Connected.");

      connection.on("error", console.error);
      connection.on("close", () => console.info("[AMQP] Connection closed."));
    }

    return this.channel;
  }

  /**
   * Send a message to a queue.
   *
   * @param message the message to be sent
   * @param queue the queue to send the message, default is the same queue
   */
  async sendMessage(message: Message, queue: string = this.queue) {
    const channel = await this.getChannel();

    try {
      channel.publish(this.queue, "", Buffer.from(JSON.stringify(message)));
    } catch (e) {
      console.error(e);
      await channel.close();
    }
  }

  /**
   * Listen to the current queue.
   *
   * @param callback the message handler function
   */
  async listen(callback: ListenCallback) {
    const channel = await this.getChannel();

    channel.consume(
      this.queue,
      (message) => message && callback(JSON.parse(message.content.toString()))
    );
  }
}
