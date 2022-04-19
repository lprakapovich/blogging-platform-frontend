import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {Router} from "@angular/router";
import {BlogPost} from "../../../models/BlogPost";
import {Observable, Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {selectIsPostGetLoading, selectPostsFromSubscriptions} from "../../../store/selectors/post.selectors";
import {getPostsFromSubscriptions, resetSelectedPost, setSelectedPost} from "../../../store/actions/post.actions";
import {selectPrincipalActiveBlog} from "../../../store/selectors/blog.selectors";
import {BlogActionTypes} from "../../../store/actions/blog.actions";
import {ModalService} from "../../../services/ui/modal.service";
import {BlogView} from "../../../models/BlogView";
import {BlogId} from "../../../models/Blog";
import {Actions, ofType} from "@ngrx/effects";
import {resetPage} from "../../../store/actions/page.actions";
import {PageService} from "../../../services/ui/page.service";

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit, OnDestroy {

  unsubscribe$;

  isGetLoading$: Observable<boolean>;
  posts$: Observable<BlogPost[]>;
  userBlogIds$: Observable<BlogId[]>;
  userBlog$: Observable<BlogView>;

  showPostPreview: boolean;

  constructor(private store: Store,
              private actions$: Actions,
              private navbarService: NavbarTemplateService,
              private modalService: ModalService,
              private pageService: PageService,
              private router: Router) {

    this.showPostPreview = false;
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.fetchDataFromStore()
    this.listenToPageChanged();
    this.navbarService.setBlogTemplate()
  }

  ngOnDestroy() {
    this.store.dispatch(resetPage())
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private fetchDataFromStore() {

    this.fetchPostsFromSubscriptions();

    this.userBlog$ = this.store.select(selectPrincipalActiveBlog);
    this.isGetLoading$ = this.store.select(selectIsPostGetLoading);
    this.posts$ = this.store.select(selectPostsFromSubscriptions);

    this.actions$.pipe(
      takeUntil(this.unsubscribe$),
      ofType(BlogActionTypes.GET_PRINCIPAL_BLOGS_AND_REDIRECT_SUCCESS)
    ).subscribe(() => this.store.dispatch(getPostsFromSubscriptions()))
  }

  private listenToPageChanged() {
    this.pageService.getCurrentPageChanged()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.fetchPostsFromSubscriptions())
  }

  private fetchPostsFromSubscriptions() {
    this.store.dispatch(getPostsFromSubscriptions());
  }

  onSearchBarEnter($event: any) {
    this.router.navigate(['/search'],  { queryParams: { search: $event } })
  }

  onPostPreviewOpen(post: BlogPost) {
    this.store.dispatch(setSelectedPost({post}))
    if (!this.showPostPreview) {
      this.showPostPreview = true;
    }
  }

  onPostPreviewClose() {
    this.store.dispatch(resetSelectedPost())
    this.showPostPreview = false;
  }
}
