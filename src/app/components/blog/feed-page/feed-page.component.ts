import {AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavbarTemplateService} from "../../../services/ui/navbar-template.service";
import {Router} from "@angular/router";
import {BlogPost} from "../../../models/BlogPost";
import {Observable, Subject, takeUntil} from "rxjs";
import {Store} from "@ngrx/store";
import {selectIsPostLoading, selectPostsFromSubscriptions} from "../../../store/selectors/post.selectors";
import {getPostsFromSubscriptions, resetSelectedPost, setSelectedPost} from "../../../store/actions/post.actions";
import {AppMenuModalComponent} from "../../ui-elements/app-menu-modal/app-menu-modal.component";
import {selectPrincipalActiveBlog, selectPrincipalManagedBlogIds} from "../../../store/selectors/blog.selectors";
import {BlogActionTypes, getBlogDetailsAndRedirect} from "../../../store/actions/blog.actions";
import {BlogSettingsModalComponent} from "../blog-settings-modal/blog-settings-modal.component";
import {ModalService} from "../../../services/ui/modal.service";
import {BlogView} from "../../../models/BlogView";
import {BlogId} from "../../../models/Blog";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit, AfterViewInit, OnDestroy {

  unsubscribe$ = new Subject<void>();

  isLoading$: Observable<boolean>;
  posts$: Observable<BlogPost[]>;
  userBlogIds$: Observable<BlogId[]>;
  userBlog$: Observable<BlogView>;

  @ViewChild('appMenuModal')
  appMenuModal: AppMenuModalComponent;

  @ViewChild('appBlogSettingsModal')
  appBlogSettingsModal: BlogSettingsModalComponent;

  showPostPreview: boolean;
  showAppMenuModal: boolean;
  showAppBlogSettingsModal: boolean;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeAllGridItems();
  }

  constructor(private store: Store,
              private actions$: Actions,
              private navbarService: NavbarTemplateService,
              private modalService: ModalService,
              private router: Router) {

    this.showPostPreview = false;
    this.showAppMenuModal = false;
    this.showAppBlogSettingsModal = false;
  }

  ngOnInit(): void {
    this.fetchDataFromStore()
    this.subscribeToStoreChanges();
    this.navbarService.setBlogTemplate()
  }

  ngAfterViewInit(): void {
     this.resizeAllGridItems();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private fetchDataFromStore() {
    this.store.dispatch(getPostsFromSubscriptions());

    this.userBlogIds$ = this.store.select(selectPrincipalManagedBlogIds);
    this.userBlog$ = this.store.select(selectPrincipalActiveBlog);
    this.isLoading$ = this.store.select(selectIsPostLoading);
    this.posts$ = this.store.select(selectPostsFromSubscriptions);

    this.actions$.pipe(
      takeUntil(this.unsubscribe$),
      ofType(BlogActionTypes.GET_PRINCIPAL_BLOGS_AND_REDIRECT_SUCCESS)
    ).subscribe(() => this.store.dispatch(getPostsFromSubscriptions()))
  }

  private subscribeToStoreChanges() {
    this.isLoading$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.resizeAllGridItems());

    this.modalService.getAppMenuModalSubject()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(show => this.showAppMenuModal = show)

    this.modalService.getAppSettingsModalSubject()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(show => this.showAppBlogSettingsModal = show)
  }

  onEnterPressed($event: any) {
    this.router.navigate(['/search'],  { queryParams: { search: $event } })
  }

  resizeGridItem(item: any) {
    const grid = document.getElementsByClassName("feed-grid")[0];
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((item.querySelector('.feed-grid-item-content')
      .getBoundingClientRect().height +rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = "span "+ rowSpan;
  }

   resizeAllGridItems(){
    let gridItems = document.getElementsByClassName("feed-grid-item");
    for (let gridItem of Array.of(gridItems)) {
      this.resizeGridItem(gridItem)
    }
  }

  openPostPreview(post: BlogPost) {
    this.store.dispatch(setSelectedPost({post}))
    if (!this.showPostPreview) {
      this.showPostPreview = true;
    }
  }

  closePostPreview() {
    this.store.dispatch(resetSelectedPost())
    this.showPostPreview = false;
  }

  onUserBlogSelectedEvent(blogId: BlogId) {
    this.showAppMenuModal = false;
    this.store.dispatch(getBlogDetailsAndRedirect({ blogId }))
  }

  onSettingsSelectedEvent() {
    this.modalService.showAppMenuModal(false);
    this.modalService.showAppSettingsModal(true);
  }

  onSettingsModalClosed() {
    this.modalService.showAppSettingsModal(false);
  }
}
