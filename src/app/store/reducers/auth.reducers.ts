import {User} from "../../models/User";
import {createReducer, on} from "@ngrx/store";
import * as AuthActions from "../actions/auth.actions"

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  authenticatedUser: User | null;
  errorMessage: string | null;
  isLoading: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  authenticatedUser: null,
  errorMessage: null,
  token: null,
  isLoading: false
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.Login, (state) => ({
    ...state,
    isLoading: true
  })),

  on(AuthActions.LoginSuccess, (state, action) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    errorMessage: null,
    token: action.token
  })),

  on(AuthActions.LoginFailure, (state, action) => ({
    ...state,
    isAuthenticated: false,
    isLoading: false,
    token: null,
    errorMessage: action.error
  }))
);

