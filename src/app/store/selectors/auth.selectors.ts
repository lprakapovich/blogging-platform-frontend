import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "../reducers/auth.reducers";

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthFeature,
  state => state.isAuthenticated
);

export const selectToken = createSelector(
  selectAuthFeature,
  state => state.token
);

export const selectIsLoading = createSelector(
  selectAuthFeature,
  state => state.isLoading
);

export const selectLoginError = createSelector(
  selectAuthFeature,
  state => state.isLoginError
)

export const selectRegisterError = createSelector(
  selectAuthFeature,
  state => state.isRegisterError
)

export const selectUsernameValidationIsLoading = createSelector(
  selectAuthFeature,
  state => state.validation.isLoading
)

export const selectValidationMessage = createSelector(
  selectAuthFeature,
  state => state.validation.validationMessage
)

export const selectPrincipal = createSelector(
  selectAuthFeature,
  authState => authState.principal
)
