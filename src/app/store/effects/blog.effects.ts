import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BlogService} from "../../services/blog.service";
import {catchError, map, of, switchMap} from "rxjs";
import {
  BlogActionTypes,
  getBlogDetailsFailure,
  getBlogDetailsSuccess,
  getBlogsBySearchCriteriaSuccess
} from "../actions/blog.actions";

@Injectable()
export class BlogEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private blogService: BlogService) {
  }

  getBlogData$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BlogActionTypes.GET_BLOG_DETAILS),
        switchMap(() => {
          return this.blogService.getLastVisitedBlog()
            .pipe(
              map(response => getBlogDetailsSuccess({payload: response})),
              catchError(error => of(getBlogDetailsFailure({
                error
              })))
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
}
