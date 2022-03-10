import {Injectable} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {AuthActionTypes} from "../actions/auth.actions"
import { LoginFailure, LoginSuccess} from "../actions/auth.actions";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      map((action: {payload: any}) => action.payload),
      switchMap((payload: any) => {
        const loginData = {
          username: payload.username,
          password: payload.password
        }
        return this.authService.login(loginData)
          .pipe(
            map(response => LoginSuccess(
              {
                token: response.token
              }
            )),
            catchError(error => of(LoginFailure(
              {
                error: error
              })))
          )
      })
    )
  )

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
      tap((response) => {
        console.log(response)
      })
    ),
    {
      dispatch: false
    }
  )

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_FAILURE)
    ),
    {
      dispatch: false
    }
  )
}



