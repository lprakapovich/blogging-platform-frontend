import {createAction, props} from "@ngrx/store";
import {LoginData} from "../../models/LoginData";

export enum AuthActionTypes {

  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout',
  REGISTER = '[Auth] Register',

  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  RESET_LOGIN_FAILURE = '[Auth] Reset Login Failure',

  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',
}

export const login = createAction(AuthActionTypes.LOGIN, props<{payload: LoginData}>());
export const loginSuccess = createAction(AuthActionTypes.LOGIN_SUCCESS, props<{token: string}>());
export const loginFailure = createAction(AuthActionTypes.LOGIN_FAILURE, props<{error: any}>());
export const resetLoginFailure = createAction(AuthActionTypes.RESET_LOGIN_FAILURE);

export const register = createAction(AuthActionTypes.REGISTER);
export const registerSuccess = createAction(AuthActionTypes.REGISTER_SUCCESS);
export const registerFailure = createAction(AuthActionTypes.REGISTER_FAILURE);

export const logout = createAction(AuthActionTypes.LOGOUT);
