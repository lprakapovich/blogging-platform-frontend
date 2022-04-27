import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {BlogService} from "../../services/api/blog.service";
import {catchError, debounceTime, exhaustMap, map, of, switchMap, tap, withLatestFrom} from "rxjs";
import {
  BlogActionTypes,
  createBlogFailure,
  createBlogSuccess,
  deleteBlogFailure,
  deleteBlogSuccess,
  getBlogDetailsAndRedirect,
  getBlogDetailsAndRedirectFailure,
  getBlogDetailsAndRedirectSuccess,
  getBlogDetailsFailure,
  getBlogDetailsSuccess,
  getPrincipalBlogsAndRedirectFailure,
  getPrincipalBlogsAndRedirectSuccess,
  getSearchedBlogsFailure,
  getSearchedBlogsSuccess,
  updateBlogFailure,
  updateBlogSuccess
} from "../actions/blog.actions";
import {Router} from "@angular/router";
import {selectPrincipal} from "../selectors/auth.selectors";
import {selectPrincipalActiveBlogId, selectPrincipalManagedBlogIds} from "../selectors/blog.selectors";
import * as fromBlog from '../reducers/blog.reducers'
import {logout} from "../actions/auth.actions";

@Injectable()
export class BlogEffects {

  constructor(
    private store: Store<fromBlog.BlogState>,
    private actions$: Actions,
    private router: Router,
    private blogService: BlogService) {
  }

  createBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.CREATE_BLOG),
      debounceTime(1000),
      withLatestFrom(this.store.select(selectPrincipal)),
      exhaustMap(([{blogId, redirectTo}, principal]) => {
        return this.blogService.createBlog(blogId)
          .pipe(
            map(() => createBlogSuccess({blogId, principal, redirectTo})),
            catchError(error => of(createBlogFailure({ error })))
          )
      })
    )
  )

  createBlogSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BlogActionTypes.CREATE_BLOG_SUCCESS),
        tap(({blogId, redirectTo}) => {
          if (redirectTo) this.router.navigate([redirectTo])
        })
      ),
    {
      dispatch: false
    })

  updateBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.UPDATE_BLOG),
      debounceTime(1000),
      withLatestFrom(this.store.select(selectPrincipalActiveBlogId)),
      exhaustMap(([{ updateBlogData }, {id, username}]) => {
        console.log('blog reducer update')
        return this.blogService.updateBlog(id, username, updateBlogData)
          .pipe(
            map((updatedBlog) => updateBlogSuccess({updatedBlog})),
            catchError(((error) => of(updateBlogFailure({ error }))))
          )
      }))
  )

  deleteBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.DELETE_BLOG),
      debounceTime(1000),
      withLatestFrom(this.store.select(selectPrincipalActiveBlogId)),
      exhaustMap(([__, {id, username}]) => {
        return this.blogService.deleteBlog(id, username)
          .pipe(
            map(() => deleteBlogSuccess({ blogId: { id, username}})),
            catchError((error) => of(deleteBlogFailure({ error })))
          )
      })
    ))

  deleteBlogSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.DELETE_BLOG_SUCCESS),
      withLatestFrom(this.store.select(selectPrincipalManagedBlogIds)),
      exhaustMap(([{ blogId }, blogsIds]) => {
        return (blogsIds.length == 0) ?
          of(logout()) :
          of(getBlogDetailsAndRedirect({ blogId: blogsIds[0] }));
      })
    ))

  getSearchedBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_SEARCHED_BLOGS),
      switchMap(({searchCriteria}) => {
        return this.blogService.getBySearchCriteria(searchCriteria)
          .pipe(
            map(response => getSearchedBlogsSuccess({blogs: response})),
            catchError((error) => of(getSearchedBlogsFailure({error})))
          )
      })
    )
  )

  getBlogDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_BLOG_DETAILS),
      map((action:any) => (action.blogId)),
      withLatestFrom(this.store.select(selectPrincipal)),
      exhaustMap(([{id, username}, principal]) => {
        const isPrincipal = username == principal
        return this.blogService.getBlogDetails(id, username)
          .pipe(
            map((blog) => getBlogDetailsSuccess({blog, blogId: id, isPrincipal})),
            catchError(((error) => of(getBlogDetailsFailure({error}))))
          )
      }))
  )

  getBlogDetailsAndRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT),
      map((action:any) => (action.blogId)),
      withLatestFrom(this.store.select(selectPrincipal)),
      exhaustMap(([{id, username}, principal]) => {
        const isPrincipal = username == principal
        return this.blogService.getBlogDetails(id, username)
          .pipe(
            map((blog) => getBlogDetailsAndRedirectSuccess({blog, blogId: id, isPrincipal})),
            catchError(((error) => of(getBlogDetailsAndRedirectFailure({error}))))
          )
      }))
  )

  getBlogDetailsAndRedirectSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_BLOG_DETAILS_AND_REDIRECT_SUCCESS),
      tap(({blogId}) => {
        this.router.navigate([`/blog/@${blogId}`])
      })
    ),
    {
      dispatch: false
    })

  getPrincipalBlogsAndRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_PRINCIPAL_BLOGS_AND_REDIRECT),
      map((action: any) => action.path),
      switchMap((path: string) => {
        return this.blogService.getUserManagedBlogs()
          .pipe(
            map(blogs => getPrincipalBlogsAndRedirectSuccess({blogs, path})),
            catchError((error) => of(getPrincipalBlogsAndRedirectFailure({error})))
          )
      })
    ))

  getPrincipalBlogsAndRedirectSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.GET_PRINCIPAL_BLOGS_AND_REDIRECT_SUCCESS),
      map((action: any) => action.path),
      tap((path) => {
        this.router.navigate([`${path}`])
      })
    ), {
    dispatch: false
  })
}
