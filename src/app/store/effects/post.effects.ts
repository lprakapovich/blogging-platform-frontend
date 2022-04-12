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
  setEditedPostFailure,
  setEditedPostSuccess,
  updatePostFailure,
  updatePostSuccess
} from "../actions/post.actions";
import {catchError, combineLatestWith, debounceTime, exhaustMap, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {selectAuthenticatedUserBlogId, selectSelectedBlogId} from "../selectors/blog.selectors";
import {selectPrincipal} from "../selectors/auth.selectors";
import {Router} from "@angular/router";
import {selectSelectedPost} from "../selectors/post.selectors";

@Injectable()
export class PostEffects {

  constructor(
    private store: Store,
    private router: Router,
    private actions$: Actions,
    private postService: PostService) {
  }

  createPost$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PostActionTypes.CREATE_POST),
    debounceTime(1000),
    map((action: any) => action.createPostData),
    withLatestFrom(this.store.select(selectAuthenticatedUserBlogId)),
    exhaustMap(([createPostData, { id, username}]) => {
      return this.postService.createPost(id, username, createPostData)
        .pipe(
          map((createdPost) => createPostSuccess({ post: createdPost })),
          catchError((error) => of(createPostFailure({ error })))
        )
    })
  ))

  createPostSuccess$ = createEffect(() =>
  this.actions$.pipe(
    ofType(
      PostActionTypes.CREATE_POST_SUCCESS),
    map((action: any) => action.post),
    tap((post) => {
      this.router.navigate([`publication/@${post.blog.id}/${post.id}`])
    })),{
    dispatch: false
  })

  deletePost$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PostActionTypes.DELETE_POST),
    map((action: any) => action.postId),
    withLatestFrom(
      this.store.select(selectAuthenticatedUserBlogId)
    ),
    exhaustMap(([postId, {id, username}]) => {
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
    debounceTime(1000),
    withLatestFrom(
      this.store.select(selectAuthenticatedUserBlogId)),
    exhaustMap(([{updatePostData, postId}, {id, username}]) => {
      return this.postService.updatePost(id, username, postId, updatePostData)
        .pipe(
          map((updatedPost) => updatePostSuccess({ post: updatedPost })),
          catchError((error) => of(updatePostFailure({error})))
        )
    })
  ))

  updatePostSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PostActionTypes.UPDATE_POST_SUCCESS),
      map((action: any) => action.post),
      tap((post) => {
        this.router.navigate([`publication/@${post.blog.id}/${post.id}`])
      })),{
    dispatch: false
  })

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

  setEditedPost$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PostActionTypes.SET_EDITED_POST),
    withLatestFrom(
      this.store.select(selectAuthenticatedUserBlogId),
      this.store.select(selectSelectedPost)),
    exhaustMap(([__, {id, username}, selectedPost]) => {
      if (selectedPost?.blog.id.id === id && selectedPost?.blog.id.username === username) {
        return of(setEditedPostSuccess({post: selectedPost}));
      } else return of(setEditedPostFailure());
    })
  ))
}
