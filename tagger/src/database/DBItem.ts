import { ObjectId } from "mongodb";
import { Item, ItemSpec } from "./../defs";

/**
 * Decorates the database id into the Item.
 */
export class DBItem implements Item {
  id: string;
  images: string[];
  price: number;
  searches: string[];
  siteId: string;
  specs: ItemSpec[];
  title: string;
  url: string;

  constructor(item: any, id: ObjectId) {
    this.id = id.toHexString();
    this.images = item.images;
    this.price = item.price;
    this.searches = item.searches;
    this.siteId = item.siteId;
    this.specs = item.specs;
    this.title = item.title;
    this.url = item.url;
  }
}
