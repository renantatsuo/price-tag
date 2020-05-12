import NodeSchedule, { Job } from "node-schedule";
import { Database, Logger, Queue, Search, SearchMessage } from "tagger";
import { SCHEDULER_RULE } from "./config";

/**
 * The logger instance.
 */
const logger = new Logger("Scheduler");

/**
 * The Scheduler implementation.
 */
export default class Scheduler {
  /**
   * The queue instance.
   */
  private queue: Queue;

  /**
   * The database instance.
   */
  private database: Database;

  /**
   * The list of search jobs.
   */
  private jobs: Map<String, Job> = new Map();

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
  start() {
    logger.info(`Starting...`);

    const EVERY_MINUTE = "*/1 * * * *";

    this.updateJobs() &&
      NodeSchedule.scheduleJob(
        "job-scheduler",
        EVERY_MINUTE,
        this.updateJobs.bind(this)
      );

    logger.info(`Started`);
  }

  private async updateJobs() {
    const searches = await this.database.getSearches();

    for (const search of searches) {
      const base64Search = Buffer.from(search.searchText).toString("base64");
      const jobName = `scraper-${base64Search}`;

      if (!this.jobs.has(jobName)) {
        const job = NodeSchedule.scheduleJob(
          jobName,
          SCHEDULER_RULE,
          this.sendScheduleMessage.bind(this, search)
        );

        this.jobs.set(jobName, job);

        logger.info(`Created new job [${jobName}]`);
      }

      const job = this.jobs.get(jobName);

      logger.info(`Job: [${jobName}]`, `Next Run: [${job.nextInvocation()}]`);
    }
  }

  /**
   * Send the search message to the queue.
   *
   * @param search the search to be sent to queue
   */
  private async sendScheduleMessage(search: Search) {
    const message = new SearchMessage(search);

    await this.queue.sendMessage(message);

    logger.info("New message sent to queue.", JSON.stringify(message));
  }
}
