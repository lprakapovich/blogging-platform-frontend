import {Injectable} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, combineLatestWith, debounceTime, map, of, switchMap, tap} from "rxjs";
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
import {LoginData} from "../../models/data/LoginData";
import {RegisterData} from "../../models/data/RegisterData";
import {getUserBlogsIds, setSelectedBlogId} from "../actions/blog.actions";
import {Router} from "@angular/router";
import {selectSelectedBlogId} from "../selectors/blog.selectors";
import {selectIsAuthenticated} from "../selectors/auth.selectors";
import {UserService} from "../../services/user.service";

@Injectable()
export class AuthEffects {

  constructor(
    private store: Store,
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
      tap(() => {
        this.store.dispatch(getUserBlogsIds())
        this.router.navigate(['/feed'])
      })
    ),
    {
      dispatch: false
    }
  )

  validateUsername$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.BEFORE_REGISTER_VALIDATE_USERNAME),
      debounceTime(5000),
      map((action: any) => action.username),
      switchMap((username: string) => {
        return this.userService.validateUsername(username)
          .pipe(
            map((response) => validateUsernameSuccess()),
            catchError(error => of(validateUsernameFailure(
              {
                error
              }
            )))
          )
      })
    )
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

  registerSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REGISTER_SUCCESS),
      combineLatestWith(this.store.select(selectSelectedBlogId)),
      map(([__, blogId]) => blogId),
      tap((blogId) => {
        this.router.navigate([`blog/@${blogId}`])
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
        this.router.navigate(['login'])
      })
    ),
    {
      dispatch: false
    }
  )

  checkAuthenticationAndRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.REDIRECT_AUTHENTICATED),
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



