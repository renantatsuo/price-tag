import {
  FilterQuery,
  InsertWriteOpResult,
  MongoClient,
  MongoClientOptions,
} from "mongodb";
import { Item, Search } from "../../defs";
import { Database } from "../Database";
import { DBItem } from "./../DBItem";
import { DBSearch } from "./../DBSearch";

const SEARCHES_COLLECTION = "searches";
const ITEMS_COLLECTION = "items";

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
    const searches = await this.find(SEARCHES_COLLECTION);
    return searches.map(({ _id, ...search }) => new DBSearch(search, _id));
  }

  async saveItems(itemsToSave: Item[]): Promise<Item[]> {
    const mongoObjects = itemsToSave.map(({ id, ...rest }) => rest);
    const { insertedIds } = await this.saveAll(mongoObjects, ITEMS_COLLECTION);

    return mongoObjects.map(
      (object, index) => new DBItem(object, insertedIds[index])
    );
  }

  /**
   * Find documents on mongo.
   *
   * @param collection the mongo collection to make the query
   * @param query the query.
   */
  private async find(
    collection: string,
    query?: FilterQuery<any>
  ): Promise<any[]> {
    const connection = await this.getConnection();
    return await connection.db().collection(collection).find(query).toArray();
  }

  /**
   * Save an array of objects into mongo.
   *
   * @param objectsToSave array of objects to save into mongo
   * @param collection the collection to save the documents
   */
  private async saveAll(
    objectsToSave: object[],
    collection: string
  ): Promise<InsertWriteOpResult<any>> {
    const connection = await this.getConnection();

    return await connection
      .db()
      .collection(collection)
      .insertMany(objectsToSave);
  }

  /**
   * Check if mongo is connected and return the connected MongoClient.
   */
  async getConnection(): Promise<MongoClient> {
    return this.mongo.isConnected() ? this.mongo : this.mongo.connect();
  }
}
