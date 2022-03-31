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

export const selectPrincipal = createSelector(
  selectAuthFeature,
  authState => authState.principal
)

export const selectLoginIsLoading = createSelector(
  selectAuthFeature,
  state => state.login.isLoading
)

export const selectLoginErrorMessage = createSelector(
  selectAuthFeature,
  state => state.login.errorMessage
)

export const selectLoginIsError = createSelector(
  selectAuthFeature,
  state => state.login.isError
)

export const selectRegisterIsLoading = createSelector(
  selectAuthFeature,
  state => state.registration.isLoading
);

export const selectRegisterIsError = createSelector(
  selectAuthFeature,
  state => state.registration.isError
)

export const selectRegisterErrorMessage = createSelector(
  selectAuthFeature,
  state => state.registration.errorMessage
)

export const selectUsernameValidationIsLoading = createSelector(
  selectAuthFeature,
  state => state.registration.validation.isLoading
)

export const selectValidationMessage = createSelector(
  selectAuthFeature,
  state => state.registration.validation.validationMessage
)
