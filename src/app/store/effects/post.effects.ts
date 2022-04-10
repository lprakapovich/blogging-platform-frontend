import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PostService} from "../../services/api/post.service";
import {
  createPostFailure,
  createPostSuccess,
  deletePostFailure,
  deletePostSuccess,
  getPostsBySearchCriteriaFailure,
  getPostsBySearchCriteriaSuccess,
  getPostsFailure,
  getPostsFromSubscriptionsFailure,
  getPostsFromSubscriptionsSuccess,
  getPostsSuccess,
  PostActionTypes,
  updatePostFailure,
  updatePostSuccess
} from "../actions/post.actions";
import {catchError, combineLatestWith, map, of, switchMap} from "rxjs";
import {selectAuthenticatedUserBlogId, selectSelectedBlogId} from "../selectors/blog.selectors";
import {selectPrincipal} from "../selectors/auth.selectors";

@Injectable()
export class PostEffects {

  constructor(
    private store: Store,
    private actions$: Actions,
    private postService: PostService) {
  }

  createPost$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PostActionTypes.CREATE_POST),
    map((action: any) => action.createPostData),
    combineLatestWith(this.store.select(selectAuthenticatedUserBlogId)),
    switchMap(([createPostData, { id, username}]) => {
      return this.postService.createPost(id, username, createPostData)
        .pipe(
          map((createdPost) => createPostSuccess({ createdPost })),
          catchError((error) => of(createPostFailure({ error })))
        )
    })
  ))

  deletePost$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PostActionTypes.DELETE_POST),
    map((action: any) => action.postId),
    combineLatestWith(
      this.store.select(selectAuthenticatedUserBlogId)
    ),
    switchMap(([postId, {id, username}]) => {
      return this.postService.deletePost(id, username, postId)
        .pipe(
          map(() => deletePostSuccess({ postId })),
          catchError((error) => of(deletePostFailure({ error })))
        )
    })
  ))

  updatePost$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PostActionTypes.UPDATE_POST),
    combineLatestWith(
      this.store.select(selectAuthenticatedUserBlogId)
    ),
    switchMap(([{updatePostData, postId}, {id, username}]) => {
      return this.postService.updatePost(id, username, postId, updatePostData)
        .pipe(
          map((updatedPost) => updatePostSuccess({ updatedPost })),
          catchError((error) => of(updatePostFailure({error})))
        )
    })
  ))

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
            map(response => getPostsBySearchCriteriaSuccess({posts: response})),
            catchError((error) => of(getPostsBySearchCriteriaFailure({error})))
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
          map(response => getPostsFromSubscriptionsSuccess({posts: response})),
          catchError((error) => of(getPostsFromSubscriptionsFailure({error})))
        )
      })
    )
  )
}
