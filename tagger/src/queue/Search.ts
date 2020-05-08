/**
 * Search options payload specification.
 */
export interface Search {
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
