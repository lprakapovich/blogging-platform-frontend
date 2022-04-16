import {createAction, props} from "@ngrx/store";
import {LoginData} from "../../models/data/auth/LoginData";
import {RegisterData} from "../../models/data/auth/RegisterData";

export enum AuthActionTypes {

  LOGIN = '[auth] login',
  LOGIN_SUCCESS = '[auth] login success',
  LOGIN_FAILURE = '[auth] login failure',

  REGISTER = '[auth] register',
  REGISTER_SUCCESS = '[auth] register success',
  REGISTER_FAILURE = '[auth] register failure',

  VALIDATE_USERNAME = '[auth] validate username',
  VALIDATE_USERNAME_FAILURE = '[auth] validate username failure',
  VALIDATE_USERNAME_SUCCESS = '[auth] validate username success',

  LOGOUT = '[auth] logout',

  SET_PRINCIPAL = '[auth] set principal',

  REDIRECT_IF_AUTHENTICATED = '[auth] redirect to main if authenticated',
}

export const login = createAction(AuthActionTypes.LOGIN, props<{loginData: LoginData}>());
export const loginSuccess = createAction(AuthActionTypes.LOGIN_SUCCESS, props<{token: string, principal: string}>());
export const loginFailure = createAction(AuthActionTypes.LOGIN_FAILURE, props<{error: any}>());

export const register = createAction(AuthActionTypes.REGISTER, props<{registerData: RegisterData}>());
export const registerSuccess = createAction(AuthActionTypes.REGISTER_SUCCESS, props<{token: string, principal: string, blogId: string}>());
export const registerFailure = createAction(AuthActionTypes.REGISTER_FAILURE, props<{error: any}>());

export const validateUsername = createAction(AuthActionTypes.VALIDATE_USERNAME, props<{principal: string}>());
export const validateUsernameFailure = createAction(AuthActionTypes.VALIDATE_USERNAME_FAILURE, props<{error: string}>());
export const validateUsernameSuccess = createAction(AuthActionTypes.VALIDATE_USERNAME_SUCCESS, props<{principal: string}>());

export const logout = createAction(AuthActionTypes.LOGOUT);

export const setPrincipal = createAction(AuthActionTypes.SET_PRINCIPAL, props<{principal: string}>());

export const redirectIfAuthenticated = createAction(AuthActionTypes.REDIRECT_IF_AUTHENTICATED, props<{to: string}>());
