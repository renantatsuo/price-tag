/**
 * Search options payload specification.
 */
export interface SearchOptions {
  /**
   * The search text.
   */
  searchText: string;

  /**
   * The minimum price.
   */
  minPrice?: number;

  /**
   * The maximum price.
   */
  maxPrice?: number;
}
