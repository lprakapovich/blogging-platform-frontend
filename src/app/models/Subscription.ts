import {BlogId} from "./Blog";

export interface Subscription {
  id: SubscriptionId;
}

export interface SubscriptionId {
  subscriber: BlogId;
  subscription: BlogId;
}
