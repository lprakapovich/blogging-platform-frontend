import {createAction, props} from "@ngrx/store";

export enum AuthActionTypes {
  LOGOUT = '[Auth] Logout',
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',
}

export const Login = createAction(AuthActionTypes.LOGIN, props<{username: string, password: string}>());
export const LoginSuccess = createAction(AuthActionTypes.LOGIN_SUCCESS, props<{token: string}>());
export const LoginFailure = createAction(AuthActionTypes.LOGIN_FAILURE, props<{error: any}>());

export const Register = createAction(AuthActionTypes.REGISTER);
export const RegisterSuccess = createAction(AuthActionTypes.REGISTER_SUCCESS);
export const RegisterFailure = createAction(AuthActionTypes.REGISTER_FAILURE);

export const Logout = createAction(AuthActionTypes.LOGOUT);
