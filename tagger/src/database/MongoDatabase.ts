import { MongoClient, MongoClientOptions } from "mongodb";
import { Search } from "../queue";
import { Database } from "./Database";

const SEARCHES_COLLECTION = "searches";

/**
 * The MongoDatabase implementation.
 */
export class MongoDatabase implements Database {
  /**
   * The mongo client.
   */
  private mongo: MongoClient;

  constructor(connectionString: string, mongoOptions?: MongoClientOptions) {
    this.mongo = new MongoClient(connectionString, mongoOptions);
  }

  async getSearches(): Promise<Search[]> {
    const connection = await this.getConnection();
    return await connection
      .db()
      .collection(SEARCHES_COLLECTION)
      .find({}, { projection: { _id: 0 } })
      .toArray();
  }

  async saveObject<T extends Object>(
    objectToSave: T,
    table: string
  ): Promise<T> {
    const connection = await this.getConnection();

    await connection.db().collection(table).insertOne(objectToSave);

    return objectToSave;
  }

  async saveAll<T extends Object>(
    objectsToSave: T[],
    table: string
  ): Promise<T[]> {
    const connection = await this.getConnection();

    await connection.db().collection(table).insertMany(objectsToSave);

    return objectsToSave;
  }

  /**
   * Check if mongo is connected and return the connected MongoClient.
   */
  async getConnection(): Promise<MongoClient> {
    return this.mongo.isConnected() ? this.mongo : this.mongo.connect();
  }
}
