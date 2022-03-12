import * as auth from './reducers/auth.reducers';
import {AuthState} from './reducers/auth.reducers';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface AppState {
  authState: auth.AuthState;
}

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuth,
  (state: AuthState) => state.isAuthenticated
);

export const selectToken = createSelector(
  selectAuth,
  (state: AuthState) => state.token
);

export const selectIsLoading = createSelector(
  selectAuth,
  (state: AuthState) => state.isLoading
);

export const selectLoginError = createSelector(
  selectAuth,
  (state: AuthState) => state.isLoginError
)

export const selectRegisterError = createSelector(
  selectAuth,
  (state: AuthState) => state.isRegisterError
)
