import {Category} from "./Category";
import {BlogId} from "./Blog";

export interface BlogView {
  id: BlogId,
  displayName: string,
  description: string,
  numberOfSubscriptions: number,
  numberOfSubscribers: number
  categories: Category[];
}
