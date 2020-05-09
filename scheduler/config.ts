require("dotenv").config();

export const {
  QUEUE_ADDRESS,
  QUEUE_NAME,
  DB_ADDRESS,
  SCHEDULER_RULE,
} = process.env;
