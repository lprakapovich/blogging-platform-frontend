import {Injectable} from "@angular/core";
import {AuthService} from "../../services/api/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, combineLatestWith, debounceTime, map, of, switchMap, tap, exhaustMap} from "rxjs";
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
import {createBlog, getUserBlogsAndRedirect} from "../actions/blog.actions";
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
      debounceTime(500),
      map((action: any) => action.payload),
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
      switchMap(() =>
        of(getUserBlogsAndRedirect({path: "/feed"}))
      )
    ))

  validateUsername$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.VALIDATE_USERNAME),
      debounceTime(1000),
      map((action: any) => action.principal),
      switchMap((username: string) => {
        return this.userService.validateUsername(username)
          .pipe(
            map(() => validateUsernameSuccess({username})),
            catchError(err =>{
              return of(validateUsernameFailure(
                {
                  error: err.error
                }
              ))
            })
          )
      })
    )
  )

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER),
      debounceTime(1500),
      map((action: any) => action.payload),
      exhaustMap((payload: RegisterData) => {
        return this.authService.register(payload)
          .pipe(
            map(response => {
              return registerSuccess(
                {
                  principal: payload.username,
                  token: response.token,
                  blogId: payload.blogUrl,
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

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER_SUCCESS),
      map((action: any) => action.blogId),
      tap((blogId) => {
        this.store.dispatch(createBlog({blogId}))
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



