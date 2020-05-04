import { Message } from "./Message";
import { SearchOptions } from "./SearchOptions";

/**
 * The SearchMessage definition.
 */
export class SearchMessage implements Message {
  /**
   * The message Date.
   */
  date: Date;

  /**
   * The message payload.
   */
  payload: SearchOptions;

  constructor(searchOptions: SearchOptions) {
    this.date = new Date();
    this.payload = searchOptions;
  }
}
