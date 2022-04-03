import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostService} from "../../services/post.service";
import {
  getPostsBySearchCriteriaSuccess, getPostsFailure,
  getPostsFromSubscriptionsSuccess,
  getPostsSuccess,
  PostActionTypes
} from "../actions/post.actions";
import {catchError, combineLatestWith, map, of, switchMap, tap} from "rxjs";
import {selectAuthenticatedUserBlogId} from "../selectors/blog.selectors";
import {selectPrincipal} from "../selectors/auth.selectors";

@Injectable()
export class PostEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private postService: PostService
  ) {
  }

  getPosts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PostActionTypes.GET_POSTS),
    combineLatestWith(
      this.store.select(selectAuthenticatedUserBlogId),
      this.store.select(selectPrincipal)),
    switchMap(([action, blogId, principal]: any) => {
      return this.postService.getPosts(blogId, principal, action.status)
        .pipe(
          map(posts => getPostsSuccess({posts})),
          catchError(error => of(getPostsFailure({error})))
        )
    })
  ))

  getPostsBySearchCriteria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActionTypes.GET_POSTS_BY_SEARCH_CRITERIA),
      map((action: any) => action.title),
      combineLatestWith(
        this.store.select(selectAuthenticatedUserBlogId),
        this.store.select(selectPrincipal)),
      switchMap(([title, blogId, principal]) => {
        return this.postService.getPostsBySearchCriteria(title, blogId, principal)
          .pipe(
            map(response => getPostsBySearchCriteriaSuccess({posts: response}))
          )
      })
    )
  )

  getPostsFromSubscriptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActionTypes.GET_POSTS_FROM_SUBSCRIPTIONS),
      combineLatestWith(
        this.store.select(selectAuthenticatedUserBlogId),
        this.store.select(selectPrincipal)),
      switchMap(([__, blogId, principal]) => {
        return this.postService.getPostsFromSubscriptions(blogId, principal).pipe(
          map(response => getPostsFromSubscriptionsSuccess({posts: response}))
        )
      })
    )
  )
}
