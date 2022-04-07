import {createReducer, on} from "@ngrx/store";
import * as SubscriptionActions from '../actions/subscription.actions'
import {Subscription} from "../../models/Subscription";

export interface SubscriptionState {

  userSubscriptions: Subscription[]
  isLoading: boolean;
  subscriptionError: any;
}

export const initialState: SubscriptionState = {
  userSubscriptions: [],
  isLoading: false,
  subscriptionError: ''
}

export const subscriptionReducer = createReducer(
  initialState,

  on(SubscriptionActions.createSubscription, (state) => ({
    ...state,
    isLoading: true
  })),

  on(SubscriptionActions.createSubscriptionSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    userSubscriptions: [...state.userSubscriptions, action.subscription]
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

  on(SubscriptionActions.deleteSubscriptionSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    userSubscriptions: state.userSubscriptions.filter(s => s.id.subscription !== action.blogId)
  })),

  on(SubscriptionActions.deleteSubscriptionFailure, (state, action) => ({
    ...state,
    isLoading: false,
    subscriptionError: action.error
  }))
)
