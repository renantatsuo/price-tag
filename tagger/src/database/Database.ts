import { Search } from "../queue";

/**
 * The database specification to handle database operations.
 */
export interface Database {
  /**
   * Get a list o all searches.
   */
  getSearches(): Promise<Search[]>;

  /**
   * Save an object to the database.
   *
   * @param objectToSave the object to be saved.
   * @param table the table to save the object.
   */
  saveObject<T extends Object>(objectToSave: T, table: string): Promise<T>;

  /**
   * Save an array of objects to the database.
   *
   * @param objectsToSave the array of objects to be saved.
   * @param table the table to save the object.
   */
  saveAll<T extends Object>(objectsToSave: T[], table: string): Promise<T[]>;
}
