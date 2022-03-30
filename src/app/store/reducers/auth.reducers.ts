import {createReducer, on} from "@ngrx/store";
import * as AuthActions from "../actions/auth.actions"

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  principal: string;
  errorMessage: string;
  isLoading: boolean;
  isLoginError: boolean;
  isRegisterError: boolean;
  validation: {
    form: {
      username: string,
      blogUrl: string;
    },
    isLoading: boolean;
    validationMessage: string;
  }
}

export const initialState: AuthState = {
  isAuthenticated: false,
  principal: '',
  errorMessage: '',
  token: '',
  isLoading: false,
  isLoginError: false,
  isRegisterError: false,
  validation: {
    form: {
      username: '',
      blogUrl: ''
    },
    isLoading: false,
    validationMessage: ''
  }
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
    errorMessage: '',
    token: action.token,
    principal: action.principal
  })),

  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    isAuthenticated: false,
    isLoginError: true,
    isLoading: false,
    errorMessage: action.error,
    token: '',
    principal: ''
  })),

  on(AuthActions.resetLoginFailure, (state) => ({
    ...state,
    isLoginError: false
  })),

  on(AuthActions.validateUsername, (state) => ({
    ...state,
    validation: {
      ...state.validation,
      isLoading: true,
      validationMessage: 'Username availability...'
    }
  })),

  on(AuthActions.validateUsernameSuccess, (state) => ({
    ...state,
    validation: {
      ...state.validation,
      isLoading: false,
      validationMessage: ''
    }
  })),

  on(AuthActions.validateUsernameFailure, (state, action) => ({
    ...state,
    validation: {
      ...state.validation,
      isLoading: false,
      validationMessage: action.error
    }
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
    errorMessage: '',
    token: action.token,
  })),

  on(AuthActions.registerFailure, (state, action) => ({
    ...state,
    isLoading: false,
    isAuthenticated: false,
    isRegisterError: true,
    errorMessage: action.error,
    token: '',
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: false,
    isAuthenticated: false,
    token: ''
  })),

  on(AuthActions.setPrincipal, (state, action) => ({
    ...state,
    isAuthenticated: true,
    principal: action.username
  }))
);

