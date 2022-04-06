import {createReducer, on} from "@ngrx/store";
import * as AuthActions from "../actions/auth.actions"

export interface AuthState {
  isAuthenticated: boolean;
  token: string;
  principal: string;

  registration: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
    validation: {
      isLoading: boolean;
      validationMessage: string;
    }
  }

  login: {
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  }
}

export const initialState: AuthState = {
  isAuthenticated: false,
  principal: '',
  token: '',

  registration: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    validation: {
      isLoading: false,
      validationMessage: ''
    }
  },

  login: {
    isLoading: false,
    isError: false,
    errorMessage: ''
  }
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
    token: '',
  })),

  on(AuthActions.login, (state) => ({
    ...state,
    login: {
      ...state.login,
      isLoading: true,
      isError: false,
      errorMessage: ''
    },
    registration: initialState.registration
  })),

  on(AuthActions.loginSuccess, (state, action) => ({
    ...state,
    isAuthenticated: true,
    token: action.token,
    principal: action.principal,
    login: {
      ...state.login,
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  })),

  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    isAuthenticated: false,
    token: '',
    principal: '',
    login: {
      ...state.login,
      isError: true,
      isLoading: false,
      errorMessage: action.error
    }
  })),

  on(AuthActions.validateUsername, (state) => ({
    ...state,
    registration: {
      ...state.registration,
      validation: {
        isLoading: true,
        validationMessage: 'Username availability check...'
      }
    }
  })),

  on(AuthActions.validateUsernameSuccess, (state) => ({
    ...state,
    registration: {
      ...state.registration,
      validation: {
        isLoading: false,
        validationMessage: ''
      }
    }
  })),

  on(AuthActions.validateUsernameFailure, (state, action) => ({
    ...state,
    registration: {
      ...state.registration,
      validation: {
        isLoading: false,
        validationMessage: action.error
      }
    }
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    state: initialState,
    registration: {
      ...state.registration,
      isLoading: true
    },
    login: initialState.login
  })),

  on(AuthActions.registerSuccess, (state, action) => ({
    ...state,
    isAuthenticated: true,
    token: action.token,
    principal: action.principal,
    registration: {
      ...state.registration,
      isLoading: false,
      isError: false,
      errorMessage: ''
    }
  })),

  on(AuthActions.registerFailure, (state, action) => ({
    ...state,
    isAuthenticated: false,
    token: '',
    principal: '',
    registration: {
      ...state.registration,
      isLoading: false,
      isError: true,
      errorMessage: action.error
    }
  })),

  on(AuthActions.setPrincipal, (state, action) => ({
    ...state,
    isAuthenticated: true,
    principal: action.principal
  }))
);

