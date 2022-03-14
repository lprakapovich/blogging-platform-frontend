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
  isRegisterError: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  authenticatedUser: null,
  errorMessage: null,
  token: null,
  isLoading: false,
  isLoginError: false,
  isRegisterError: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isLoginError: false,
    isAuthenticated: true,
    errorMessage: null,
    token: action.token,
  })),

  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    isAuthenticated: false,
    isLoginError: true,
    isLoading: false,
    errorMessage: action.error,
    token: null,
  })),

  on(AuthActions.resetLoginFailure, (state) => ({
    ...state,
    isLoginError: false
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.registerSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isAuthenticated: true,
    isRegisterError: false,
    errorMessage: null,
    token: action.token,
  })),

  on(AuthActions.registerFailure, (state, action) => ({
    ...state,
    isLoading: false,
    isAuthenticated: false,
    isRegisterError: true,
    errorMessage: action.error,
    token: null,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: false,
    isAuthenticated: false,
    token: null
  }))
);

