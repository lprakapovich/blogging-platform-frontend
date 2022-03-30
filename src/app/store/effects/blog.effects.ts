import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BlogService} from "../../services/blog.service";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {
  BlogActionTypes,
  getUserBlogsIdsSuccess,
  getBlogDetailsFailure,
  getBlogDetailsSuccess,
  getBlogsBySearchCriteriaSuccess, createBlogSuccess, createBlogFailure
} from "../actions/blog.actions";
import {Router} from "@angular/router";

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
      switchMap((blogId) => {
        return this.blogService.createBlog(blogId)
          .pipe(
            map(() => createBlogSuccess(blogId)),
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
      tap(() => {
        this.router.navigate(['/feed'])
      })
    ),
    {
      dispatch: false
    }
  )

  getBlogDetails$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BlogActionTypes.GET_BLOG_DETAILS),
        switchMap(() => {
          return this.blogService.getLastVisitedBlog()
            .pipe(
              map(response => getBlogDetailsSuccess({payload: response})),
              catchError(error => of(getBlogDetailsFailure(
                {
                error
              })
              ))
            )
        })
    )
  )

  getBlogsBySearchCriteria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_BLOGS_BY_SEARCH_CRITERIA),
      map((action: any) => action.payload),
      switchMap((searchCriteria: string) => {
        return this.blogService.getBySearchCriteria(searchCriteria)
          .pipe(
            map(response => {
              console.log(response)
              return getBlogsBySearchCriteriaSuccess({blogs: response})
            })
          )
      })
    )
  )

  getUserBlogsIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_USER_BLOGS_IDS),
      switchMap(() => {
        return this.blogService.getAllUserBlogIds()
          .pipe(
            map((response) => getUserBlogsIdsSuccess({
              blogIds: response
            }))
          )
      })
    )
  )
}
