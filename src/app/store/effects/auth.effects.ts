import {Injectable} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {AuthActionTypes, loginFailure, loginSuccess, registerFailure, registerSuccess} from "../actions/auth.actions"
import {Store} from "@ngrx/store";
import {LoginData} from "../../models/LoginData";
import {RegisterData} from "../../models/RegisterData";
import {setSelectedBlogId} from "../actions/blog.actions";

@Injectable()
export class AuthEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private authService: AuthService) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      debounceTime(500),
      map((action: any) => action.payload),
      switchMap((payload: LoginData) => {
        return this.authService.login(payload)
          .pipe(
            map(response => loginSuccess(
              {
                token: response.token
              }
            )),
            catchError(error => of(loginFailure(
              {
                error
              }
            )))
          )
      })
    )
  )

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
    ),
    {
      dispatch: false
    }
  )

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER),
      debounceTime(500),
      map((action: any) => action.payload),
      switchMap((payload: RegisterData) => {
        return this.authService.register(payload)
          .pipe(
            map(response => {
              this.store.dispatch(setSelectedBlogId({
                blogId: payload.blogUri
              }
              ))
              return registerSuccess(
                {
                  token: response.token,
                }
              )
            }
            ),
            catchError(error => of(registerFailure(
              error
            )))
          )
      })
    )
  )
}



