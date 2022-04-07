import {createAction, props} from "@ngrx/store";
import {BlogId} from "../../models/Blog";
import {Subscription} from "../../models/Subscription";

export enum SubscriptionActionTypes {

  CREATE_SUBSCRIPTION = "[subscription] create subscription",
  CREATE_SUBSCRIPTION_SUCCESS = "[subscription] create subscription success",
  CREATE_SUBSCRIPTION_FAILURE = "[subscription] create subscription failure",

  DELETE_SUBSCRIPTION = "[subscription] delete subscription",
  DELETE_SUBSCRIPTION_SUCCESS = "[subscription] delete subscription success",
  DELETE_SUBSCRIPTION_FAILURE = "[subscription] delete subscription failure",
}

export const createSubscription = createAction(SubscriptionActionTypes.CREATE_SUBSCRIPTION, props<{blogId: BlogId}>())
export const createSubscriptionSuccess = createAction(SubscriptionActionTypes.CREATE_SUBSCRIPTION_SUCCESS, props<{subscription: Subscription}>())
export const createSubscriptionFailure = createAction(SubscriptionActionTypes.CREATE_SUBSCRIPTION_FAILURE, props<{error: any}>())

export const deleteSubscription = createAction(SubscriptionActionTypes.DELETE_SUBSCRIPTION, props<{blogId: BlogId}>())
export const deleteSubscriptionSuccess = createAction(SubscriptionActionTypes.DELETE_SUBSCRIPTION_SUCCESS, props<{unsubscribedBlogId: BlogId}>())
export const deleteSubscriptionFailure = createAction(SubscriptionActionTypes.DELETE_SUBSCRIPTION_FAILURE, props<{error: any}>())
