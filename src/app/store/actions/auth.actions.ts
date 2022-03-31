import {createAction, props} from "@ngrx/store";
import {LoginData} from "../../models/data/auth/LoginData";
import {RegisterData} from "../../models/data/auth/RegisterData";

export enum AuthActionTypes {

  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout',
  REGISTER = '[Auth] Register',

  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  RESET_LOGIN_FAILURE = '[Auth] Reset Login Failure',

  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',

  BEFORE_REGISTER_VALIDATE_USERNAME = '[Auth Validation] Validate username before registration',
  BEFORE_REGISTER_VALIDATE_USERNAME_FAILURE = '[Auth Validation] Username validation failure',
  BEFORE_REGISTER_VALIDATE_USERNAME_SUCCESS = '[Auth Validation] Username validation success',

  REDIRECT_AUTHENTICATED = '[Auth] Check authentication and redirect',

  SET_PRINCIPAL = '[Auth] Set principal'
}

export const login = createAction(AuthActionTypes.LOGIN, props<{payload: LoginData}>());
export const loginSuccess = createAction(AuthActionTypes.LOGIN_SUCCESS, props<{token: string, principal: string}>());
export const loginFailure = createAction(AuthActionTypes.LOGIN_FAILURE, props<{error: any}>());
export const resetLoginFailure = createAction(AuthActionTypes.RESET_LOGIN_FAILURE);

export const register = createAction(AuthActionTypes.REGISTER, props<{payload: RegisterData}>());
export const registerSuccess = createAction(AuthActionTypes.REGISTER_SUCCESS, props<{token: string, principal: string}>());
export const registerFailure = createAction(AuthActionTypes.REGISTER_FAILURE, props<{error: any}>());

export const validateUsername = createAction(AuthActionTypes.BEFORE_REGISTER_VALIDATE_USERNAME, props<{username: string}>());
export const validateUsernameFailure = createAction(AuthActionTypes.BEFORE_REGISTER_VALIDATE_USERNAME_FAILURE, props<{error: string}>());
export const validateUsernameSuccess = createAction(AuthActionTypes.BEFORE_REGISTER_VALIDATE_USERNAME_SUCCESS);

export const logout = createAction(AuthActionTypes.LOGOUT);

export const setPrincipal = createAction(AuthActionTypes.SET_PRINCIPAL, props<{username: string}>());

export const checkAuthenticationAndRedirect = createAction(AuthActionTypes.REDIRECT_AUTHENTICATED, props<{to: string}>());
