import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "../reducers/auth.reducers";

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthenticatedUser = createSelector(
  selectAuthFeature,
  state => state.authenticatedUser
)

export const selectToken = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.token
);

export const selectIsLoading = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isLoading
);

export const selectLoginError = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isLoginError
)

export const selectRegisterError = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isRegisterError
)
