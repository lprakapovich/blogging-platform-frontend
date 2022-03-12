import {Injectable} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, debounceTime, map, of, switchMap} from "rxjs";
import {AuthActionTypes, loginFailure, loginSuccess} from "../actions/auth.actions"
import {Store} from "@ngrx/store";
import {LoginData} from "../../models/LoginData";

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
            catchError(error => of(loginFailure({ error }
            )))
          )
      })
    )
  )

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
      debounceTime(1000)
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

  resetLoginFailure$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActionTypes.RESET_LOGIN_FAILURE),
      ),
    {
      dispatch: false
    }
  )
}



