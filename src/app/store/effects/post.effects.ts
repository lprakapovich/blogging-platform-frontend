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
import {catchError, debounceTime, exhaustMap, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {selectPrincipalActiveBlogId, selectSelectedBlogId} from "../selectors/blog.selectors";
import {Router} from "@angular/router";
import {selectSelectedPost} from "../selectors/post.selectors";
import {selectCurrentPage} from "../selectors/page.selectors";

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
      withLatestFrom(
        this.store.select(selectPrincipalActiveBlogId)),
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
      ofType(PostActionTypes.CREATE_POST_SUCCESS),
      map((action: any) => action.post),
      tap((post) => {
        this.router.navigate([`publication/@${post.blog.id}/${post.id}`])
      })),{
      dispatch: false
    })

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActionTypes.DELETE_POST),
      debounceTime(1000),
      withLatestFrom(
        this.store.select(selectPrincipalActiveBlogId),
        this.store.select(selectSelectedPost)
      ),
      exhaustMap(([__, {id, username}, post]) => {
        if (!post) return of(deletePostFailure({ error: 'No post selected'}))
        return this.postService.deletePost(id, username, post.id)
          .pipe(
            map(() => {
              console.log(`deletePost$ ${Date.now()}`)
              return deletePostSuccess({ postId: post.id })
            }),
            catchError((error) => of(deletePostFailure({ error })))
          )
      })
    ))

  deletePostSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActionTypes.DELETE_POST_SUCCESS),
      withLatestFrom(this.store.select(selectPrincipalActiveBlogId)),
      tap(([__, { id }]) => {
        this.router.navigate([`/blog/@${id}`])
      })
    ),
      {
        dispatch: false
      })

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActionTypes.UPDATE_POST),
      debounceTime(1000),
      withLatestFrom(
        this.store.select(selectPrincipalActiveBlogId)),
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
      ofType(PostActionTypes.UPDATE_POST_SUCCESS),
      map((action: any) => action.post),
      tap((post) => {
        this.router.navigate([`publication/@${post.blog.id}/${post.id}`])
      })),{
    dispatch: false
  })

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActionTypes.GET_POSTS),
      withLatestFrom(
        this.store.select(selectSelectedBlogId),
        this.store.select(selectCurrentPage)),
      switchMap(([{status, categoryId}, blogId, page]) => {
        return this.postService.getPosts(blogId.id, blogId.username, status, categoryId, page)
          .pipe(
            map(posts => {
              let push = !!page;
              return getPostsSuccess({posts, push})
            }),
            catchError(error => of(getPostsFailure({error})))
          )
      })
    ))

  getPostsBySearchCriteria$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActionTypes.GET_POSTS_BY_SEARCH_CRITERIA),
      map((action: any) => action.title),
      withLatestFrom(
        this.store.select(selectPrincipalActiveBlogId)),
      switchMap(([title, {id, username}]) => {
        return this.postService.getPostsBySearchCriteria(title, id, username)
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
      withLatestFrom(
        this.store.select(selectPrincipalActiveBlogId),
        this.store.select(selectCurrentPage)),
      switchMap(([__, {id, username}, page]) => {
        return this.postService.getPostsFromSubscriptions(id, username, page).pipe(
          map(posts => {
            let push = !!page;
            return getPostsFromSubscriptionsSuccess({posts, push});
          }),
          catchError((error) => of(getPostsFromSubscriptionsFailure({error})))
        )
      })
    )
  )

  setEditedPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActionTypes.SET_EDITED_POST),
      withLatestFrom(
        this.store.select(selectPrincipalActiveBlogId),
        this.store.select(selectSelectedPost)),
      exhaustMap(([__, {id, username}, selectedPost]) => {
        if (selectedPost?.blog.id.id === id && selectedPost?.blog.id.username === username) {
          return of(setEditedPostSuccess({post: selectedPost}));
        } else return of(setEditedPostFailure());
      })
    ))
}
