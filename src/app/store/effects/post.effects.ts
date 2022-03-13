import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostService} from "../../services/post.service";
import {getPostsByTitleSuccess, getPostsFromSubscriptionsSuccess, PostActionTypes} from "../actions/post.actions";
import {combineLatestWith, debounceTime, map, switchMap, timeout} from "rxjs";
import {selectSelectedBlogId} from "../selectors/blog.selectors";

@Injectable()
export class PostEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private postService: PostService
  ) {
  }

  getPostsByTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActionTypes.GET_POSTS_BY_TITLE),
      map((action: any) => action.title),
      switchMap((title: string) => {
        return this.postService.getPostsByTitle(title)
          .pipe(
            map(response => getPostsByTitleSuccess({posts: response}))
          )
      })
    )
  )

  getPostsFromSubscriptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActionTypes.GET_POSTS_FROM_SUBSCRIPTIONS),
      combineLatestWith(this.store.select(selectSelectedBlogId)),
      map(([__, blogId]) => blogId),
      switchMap((blogId) => {
        return this.postService.getPostsFromSubscriptions(blogId).pipe(
          map(response => getPostsFromSubscriptionsSuccess({posts: response}))
        )
      })
    )
  )
}
