import { MongoDatabase, RabbitQueue } from "tagger";
import { DB_ADDRESS, QUEUE_ADDRESS, QUEUE_NAME } from "./config";
import Scheduler from "./Scheduler";

(async function main() {
  const queue = new RabbitQueue(QUEUE_NAME, QUEUE_ADDRESS);

  const database = new MongoDatabase(DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const scheduler = new Scheduler(queue, database);
  await scheduler.start();

  console.info(`Scheduler started.`);
})();
