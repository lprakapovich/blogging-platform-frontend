import {Injectable} from "@angular/core";
import {AuthService} from "../../services/api/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, combineLatestWith, debounceTime, exhaustMap, map, of, switchMap, tap} from "rxjs";
import {
  AuthActionTypes,
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
  validateUsernameFailure,
  validateUsernameSuccess
} from "../actions/auth.actions"
import {Store} from "@ngrx/store";
import {LoginData} from "../../models/data/auth/LoginData";
import {RegisterData} from "../../models/data/auth/RegisterData";
import {createBlog, getPrincipalBlogsAndRedirect} from "../actions/blog.actions";
import {Router} from "@angular/router";
import {selectIsAuthenticated} from "../selectors/auth.selectors";
import {UserService} from "../../services/api/user.service";
import * as fromAuth from '../reducers/auth.reducers';


@Injectable()
export class AuthEffects {

  constructor(
    private store: Store<fromAuth.AuthState>,
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private userService: UserService) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN),
      debounceTime(1000),
      map((action: any) => action.loginData),
      exhaustMap((payload: LoginData) => {
        return this.authService.login(payload)
          .pipe(
            map(response => {
              return loginSuccess({
                principal: payload.username,
                token: response.token
              }
            )}
            ),
            catchError(error => of(loginFailure({ error })))
          )
      })
    )
  )

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGIN_SUCCESS),
      switchMap(() =>
        of(getPrincipalBlogsAndRedirect({path: "/feed"}))
      )
    ))

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER),
      debounceTime(1000),
      map((action: any) => action.registerData),
      exhaustMap((registerData: RegisterData) => {
        return this.authService.register(registerData)
          .pipe(
            map(response => registerSuccess(
                {
                  principal: registerData.username,
                  token: response.token,
                  blogId: registerData.blogUrl,
                }
              )
            ),
            catchError(error => of(registerFailure(error)))
          )
      })
    )
  )

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER_SUCCESS),
      map((action: any) => action.blogId),
      tap((blogId) => {
        this.store.dispatch(createBlog({blogId, redirectTo: '/feed'}))
      })
    ),
    {
      dispatch: false
    }
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.LOGOUT),
      tap(() => {
         this.router.navigate(['/login'])
      })
    ),
    {
      dispatch: false
    }
  )

  validateUsername$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.VALIDATE_USERNAME),
      debounceTime(1000),
      switchMap(({principal}) => {
        return this.userService.validateUsername(principal)
          .pipe(
            map(() => validateUsernameSuccess({principal })),
            catchError(err => of(validateUsernameFailure({error: err.error })))
          )
      })
    )
  )

  checkAuthenticationAndRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REDIRECT_IF_AUTHENTICATED),
      map((action: any) => action.to),
      combineLatestWith(this.store.select(selectIsAuthenticated)),
      tap(([path, isAuth]) => {
        if (isAuth) {
          this.router.navigate([`/${path}`])
        }
      })),
    {
      dispatch: false
    })
}



