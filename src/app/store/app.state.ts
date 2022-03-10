import * as auth from './reducers/auth.reducers';
import {createSelector} from "@ngrx/store";
import {AuthState} from "./reducers/auth.reducers";

export interface AppState {
  authState: auth.AuthState;
}

export const selectAuth = (state: AppState) => state.authState;

export const isAuthenticated = createSelector(
  selectAuth,
  (state: AuthState) => state.isAuthenticated
);

export const token = createSelector(
  selectAuth,
  (state: AuthState) => state.token
);

export const isLoading = createSelector(
  selectAuth,
  (state: AuthState) => state.isLoading
);
