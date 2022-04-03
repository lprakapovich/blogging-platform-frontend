import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BlogService} from "../../services/blog.service";
import {catchError, combineLatestWith, debounceTime, map, of, switchMap, tap} from "rxjs";
import {
  BlogActionTypes,
  createBlogFailure,
  createBlogSuccess,
  getBlogDetailsAndRedirectSuccess,
  getBlogDetailsFailure,
  getBlogsBySearchCriteriaSuccess,
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
    }
  )

  updateBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.UPDATE_BLOG),
      debounceTime(500),
      map((action: any) => action.data),
      combineLatestWith(
        this.store.select(selectPrincipal),
        this.store.select(selectAuthenticatedUserBlogId)),
      switchMap(([updateData, principal, blogId]) => {
        return this.blogService.updateBlog(blogId, principal, updateData)
          .pipe(
            map((updatedBlog) => updateBlogSuccess({updatedBlog})),
            catchError((() => of(updateBlogFailure())))
          )
      }))
  )

  // getBlogDetails$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(BlogActionTypes.GET_BLOG_DETAILS),
  //     switchMap(() => {
  //       return this.blogService.getLastVisitedBlog()
  //         .pipe(
  //           map(response => getBlogDetailsSuccess({payload: response})),
  //           catchError(error => of(getBlogDetailsFailure(
  //             {
  //               error
  //             })
  //           ))
  //         )
  //     })
  //   )
  // )

  getBlogsBySearchCriteria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_BLOGS_BY_SEARCH_CRITERIA),
      map((action: any) => action.payload),
      switchMap((searchCriteria: string) => {
        return this.blogService.getBySearchCriteria(searchCriteria)
          .pipe(
            map(response => {
              return getBlogsBySearchCriteriaSuccess({blogs: response})
            })
          )
      })
    )
  )

  getBlogDetailsAndRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT),
      map((action: any) => action.blogId),
      combineLatestWith(this.store.select(selectPrincipal)),
      switchMap(([blogId, principal]) => {
        return this.blogService.getBlogById(blogId, principal)
          .pipe(
            map((blog) => {
              return getBlogDetailsAndRedirectSuccess({blog, blogId})
            }),
            catchError((() => of(getBlogDetailsFailure)))
          )
      }))
  )

  getBlogDetailsAndRedirectSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT_SUCCESS),
      map((action: any) => action.blogId),
      tap((blogId) => {
        this.router.navigate([`/blog/@${blogId}`])
      })
    ))


  getUserBlogsAndRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_USER_BLOGS_AND_REDIRECT),
      map((action: any) => action.path),
      switchMap((path: string) => {
        return this.blogService.getUserManagedBlogs()
          .pipe(
            map(blogs => {
              return getUserBlogsAndRedirectSuccess({blogs, path})
            })
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
