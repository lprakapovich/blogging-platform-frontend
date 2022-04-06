import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostService} from "../../services/post.service";
import {
  getPostsBySearchCriteriaSuccess,
  getPostsFailure,
  getPostsFromSubscriptionsSuccess,
  getPostsSuccess,
  PostActionTypes
} from "../actions/post.actions";
import {catchError, combineLatestWith, map, of, switchMap} from "rxjs";
import {selectAuthenticatedUserBlogId, selectSelectedBlogId} from "../selectors/blog.selectors";
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
      this.store.select(selectSelectedBlogId)),
    switchMap(([{status, categoryId}, blogId]: any) => {
      return this.postService.getPosts(blogId.id, blogId.username, status, categoryId)
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
      switchMap(([title, {id}, principal]) => {
        return this.postService.getPostsBySearchCriteria(title, id, principal)
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
      switchMap(([__, {id}, principal]) => {
        return this.postService.getPostsFromSubscriptions(id, principal).pipe(
          map(response => getPostsFromSubscriptionsSuccess({posts: response}))
        )
      })
    )
  )
}
