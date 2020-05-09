import { scheduleJob } from "node-schedule";
import { Database, Queue, Search, SearchMessage } from "tagger";
import { SCHEDULER_RULE } from "./config";

/**
 * The Scheduler implementation.
 */
export default class Scheduler {
  /**
   * The queue instance.
   */
  queue: Queue;

  /**
   * The database instance.
   */
  database: Database;

  /**
   * The default constructor.
   *
   * @param queue The queue instance
   * @param database the database instance
   */
  constructor(queue: Queue, database: Database) {
    this.queue = queue;
    this.database = database;
  }

  /**
   * Start the scheduler.
   * Get the searches from database and send it to queue.
   */
  async start() {
    const searches = await this.database.getSearches();

    console.info(`Have [${searches.length}] searches to schedule.`);

    searches.forEach((search) => {
      scheduleJob(
        "scrapers",
        SCHEDULER_RULE,
        this.sendScheduleMessage.bind(this, search)
      );
    });
  }

  /**
   * Send the search message to the queue.
   *
   * @param search the search to be sent to queue
   */
  private async sendScheduleMessage(search: Search) {
    await this.queue.sendMessage(new SearchMessage(search));
    console.info(`${Date.now()} - New message sent to queue.`);
  }
}
