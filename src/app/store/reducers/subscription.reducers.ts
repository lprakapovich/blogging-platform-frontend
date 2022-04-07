import {createReducer, on} from "@ngrx/store";
import * as SubscriptionActions from '../actions/subscription.actions'

export interface SubscriptionState {
  isLoading: boolean;
  subscriptionError: any;
}

export const initialState: SubscriptionState = {
  isLoading: false,
  subscriptionError: ''
}

export const subscriptionReducer = createReducer(
  initialState,

  on(SubscriptionActions.createSubscription, (state) => ({
    ...state,
    isLoading: true
  })),

  on(SubscriptionActions.createSubscriptionSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(SubscriptionActions.createSubscriptionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    subscriptionError: action.error
  })),

  on(SubscriptionActions.deleteSubscription, (state) => ({
    ...state,
    isLoading: true
  })),

  on(SubscriptionActions.deleteSubscriptionSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(SubscriptionActions.deleteSubscriptionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    subscriptionError: action.error
  }))
)
