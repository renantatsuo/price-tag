import { Item, Search } from "../defs";

/**
 * The database specification to handle database operations.
 */
export interface Database {
  /**
   * Get a list o all searches.
   */
  getSearches(): Promise<Search[]>;

  /**
   * Save an array of Items to the database.
   *
   * @param itemsToSave the array of Items to be saved.
   * @param table the table to save the object.
   */
  saveItems(itemsToSave: Item[]): Promise<Item[]>;
}
