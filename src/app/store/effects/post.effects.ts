import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostService} from "../../services/post.service";
import {getPostsByTitleSuccess, PostActionTypes} from "../actions/post.actions";
import {map, switchMap} from "rxjs";

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
}
