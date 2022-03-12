import {User} from "../../models/User";
import {createReducer, on} from "@ngrx/store";
import * as AuthActions from "../actions/auth.actions"

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  authenticatedUser: User | null;
  errorMessage: string | null;
  isLoading: boolean;
  isLoginError: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  authenticatedUser: null,
  errorMessage: null,
  token: null,
  isLoading: false,
  isLoginError: false
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    token: action.token,
    isLoginError: false,
    errorMessage: null,
  })),

  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    isAuthenticated: false,
    errorMessage: action.error,
    isLoginError: true,
    isLoading: false,
    token: null,
  })),

  on(AuthActions.resetLoginFailure, (state) => ({
    ...state,
    isLoginError: false
  }))
);

