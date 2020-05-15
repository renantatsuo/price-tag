import { ObjectId } from "mongodb";
import { Search } from "./../defs";

/**
 * Decorates the database id into the Search.
 */
export class DBSearch implements Search {
  id: string;
  searchUrl: string;

  constructor(search: any, id: ObjectId) {
    this.id = id.toHexString();
    this.searchUrl = search.searchUrl;
  }
}
