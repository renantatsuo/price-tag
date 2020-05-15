import { Search } from "../defs";
import { Message } from "./Message";

/**
 * The SearchMessage definition.
 */
export class SearchMessage implements Message {
  /**
   * The message date string.
   */
  date: string;

  /**
   * The message payload.
   */
  payload: Search;

  constructor(searchOptions: Search) {
    this.date = new Date().toUTCString();
    this.payload = searchOptions;
  }
}
