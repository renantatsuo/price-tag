import { ItemSpec } from "./ItemSpec";

/**
 * The Item specification.
 */
export interface Item {
  /**
   * The item id.
   */
  id: string;

  /**
   * The item images urls
   */
  images: string[];

  /**
   * The item price.
   */
  price: number;

  /**
   * The searches references.
   */
  searches: string[];

  /**
   * The unique identifier in the site.
   */
  siteId: string;

  /**
   * The item specifications.
   * e.g. Color, Size, Model, Serial number, etc.
   */
  specs: ItemSpec[];

  /**
   * The item title.
   */
  title: string;

  /**
   * The item url.
   */
  url: string;
}
