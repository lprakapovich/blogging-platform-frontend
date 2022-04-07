import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SubscriptionState} from "../reducers/subscription.reducers";

export const selectSubscriptionFeature = createFeatureSelector<SubscriptionState>('subscription')

export const selectSubscriptionError = createSelector(
  selectSubscriptionFeature,
  state => state.subscriptionError
)

export const selectIsSubscriptionLoadign = createSelector(
  selectSubscriptionFeature,
  state => state.isLoading
)
