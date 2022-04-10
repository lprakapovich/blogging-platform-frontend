import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BlogService} from "../../services/api/blog.service";
import {catchError, combineLatestWith, debounceTime, map, of, switchMap, tap} from "rxjs";
import {
  BlogActionTypes,
  createBlogFailure,
  createBlogSuccess,
  getBlogDetailsAndRedirectFailure,
  getBlogDetailsAndRedirectSuccess,
  getSearchedBlogsFailure,
  getSearchedBlogsSuccess,
  getUserBlogsAndRedirectFailure,
  getUserBlogsAndRedirectSuccess,
  updateBlogFailure,
  updateBlogSuccess
} from "../actions/blog.actions";
import {Router} from "@angular/router";
import {selectPrincipal} from "../selectors/auth.selectors";
import {selectAuthenticatedUserBlogId} from "../selectors/blog.selectors";

@Injectable()
export class BlogEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router,
    private blogService: BlogService) {
  }

  createBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.CREATE_BLOG),
      map((action: any) => action.blogId),
      combineLatestWith(this.store.select(selectPrincipal)),
      switchMap(([blogId, principal]) => {
        return this.blogService.createBlog(blogId)
          .pipe(
            map(() => createBlogSuccess({blogId, principal})),
            catchError(error => of(createBlogFailure({
              error
            })))
          )
      })
    )
  )

  createBlogSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BlogActionTypes.CREATE_BLOG_SUCCESS),
        map((action: any) => action.blogId),
        tap((blogId: string) => {
          this.router.navigate(['/feed'])
        })
      ),
    {
      dispatch: false
    })

  updateBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.UPDATE_BLOG),
      debounceTime(500),
      map((action: any) => action.data),
      combineLatestWith(
        this.store.select(selectPrincipal),
        this.store.select(selectAuthenticatedUserBlogId)),
      switchMap(([updateData, principal, {id}]) => {
        return this.blogService.updateBlog(id, principal, updateData)
          .pipe(
            map((updatedBlog) => updateBlogSuccess({updatedBlog})),
            catchError((() => of(updateBlogFailure())))
          )
      }))
  )

  getSearchedBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_SEARCHED_BLOGS),
      map((action: any) => action.payload),
      switchMap((searchCriteria: string) => {
        return this.blogService.getBySearchCriteria(searchCriteria)
          .pipe(
            map(response => getSearchedBlogsSuccess({blogs: response})),
            catchError((error) => of(getSearchedBlogsFailure({error})))
          )
      })
    )
  )

  getBlogDetailsAndRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT),
      map((action:any) => (action.blogId)),
      combineLatestWith(
        this.store.select(selectPrincipal)),
      switchMap(([{id, username}, principal]) => {
        const isPrincipal = username == principal
        return this.blogService.getBlogDetails(id, username)
          .pipe(
            map((blog) => getBlogDetailsAndRedirectSuccess({blog, blogId: id, isPrincipal})),
            catchError(((error) => of(getBlogDetailsAndRedirectFailure({error}))))
          )
      }))
  )

  getBlogDetailsAndRedirectSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT_SUCCESS),
      tap(({blogId}) => {
        this.router.navigate([`/blog/@${blogId}`])
      })
    ),
    {
      dispatch: false
    })

  getUserBlogsAndRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_USER_BLOGS_AND_REDIRECT),
      map((action: any) => action.path),
      switchMap((path: string) => {
        return this.blogService.getUserManagedBlogs()
          .pipe(
            map(blogs => getUserBlogsAndRedirectSuccess({blogs, path})),
            catchError((error) => of(getUserBlogsAndRedirectFailure({error})))
          )
      })
    ))

  getUserBlogsAndRedirectSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_USER_BLOGS_AND_REDIRECT_SUCCESS),
      map((action: any) => action.path),
      tap((path) => {
        this.router.navigate([`${path}`])
      })
    ), {
    dispatch: false
  })
}
