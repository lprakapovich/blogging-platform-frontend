import {Category} from "./Category";
import {BlogId} from "./Blog";
import {Subscription} from "./Subscription";

export interface BlogView {
  id: BlogId,
  displayName: string,
  description: string,
  categories: Category[];
  subscriptions: Subscription[];
  subscribers: Subscription[];
}
