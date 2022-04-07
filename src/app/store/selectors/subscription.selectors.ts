import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SubscriptionState} from "../reducers/subscription.reducers";
import {BlogId} from "../../models/Blog";

export const selectSubscriptionFeature = createFeatureSelector<SubscriptionState>('subscription')

export const selectUserSubscriptions = createSelector(
  selectSubscriptionFeature,
  state => state.userSubscriptions
)

export const selectIsSubscriber = (subscriptionId: BlogId) => createSelector(
  selectUserSubscriptions,
  (subscriptions) => subscriptions &&
    subscriptions.length > 0 &&
    subscriptions.some(s => s.id.subscription === subscriptionId)
)
